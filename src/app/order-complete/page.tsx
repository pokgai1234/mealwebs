
// src/app/order-complete/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { CheckCircle2, Loader2, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useMealPlan } from '@/context/meal-plan-context';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { OrchestratorResult } from '@/types/shopping';
import { useToast } from '@/hooks/use-toast';

const POLLING_INTERVAL = 5000; // 5 seconds
const MAX_POLLING_ATTEMPTS = 36; // 5s * 36 = 3 minutes

export default function OrderCompletePage() {
   const { 
     resetOrder, 
     isOrderComplete, 
     activeShoppingRequestId, 
     shoppingTaskResult, 
     setShoppingTaskResult,
     shoppingList, 
     selectedMeals 
    } = useMealPlan();
   const router = useRouter();
   const { toast } = useToast();
   const [isLoadingAutomation, setIsLoadingAutomation] = useState(true);
   const [automationStatusMessage, setAutomationStatusMessage] = useState("Initializing shopping task...");
   const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
   const attemptsRef = useRef(0);

   useEffect(() => {
    if (!isOrderComplete && !activeShoppingRequestId) {
      router.replace('/explore'); // Redirect to meal exploration if no order context
      return;
    }

    if (activeShoppingRequestId && !shoppingTaskResult) {
      setIsLoadingAutomation(true);
      attemptsRef.current = 0; 

      const pollForResult = async () => {
        if (attemptsRef.current >= MAX_POLLING_ATTEMPTS) {
          setAutomationStatusMessage("Shopping list creation is taking longer than expected. Please check back later or contact support.");
          setIsLoadingAutomation(false); 
          if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
          toast({
            title: "Shopping List Delayed",
            description: "Could not retrieve the automated shopping list in time. You can try refreshing or view your items in the shopping list page.",
            variant: "destructive",
            duration: 10000,
          });
          return;
        }

        try {
          setAutomationStatusMessage(`Checking shopping list status (attempt ${attemptsRef.current + 1})...`);
          const response = await fetch(`/api/shopping/get-task-result?requestId=${activeShoppingRequestId}`);
          attemptsRef.current++;
          
          if (response.ok) {
            const data: OrchestratorResult | { status: string } = await response.json();
            if ('success' in data) { 
              setShoppingTaskResult(data);
              setIsLoadingAutomation(false);
              if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
              if (data.success) {
                setAutomationStatusMessage("Automated shopping list created successfully!");
                 toast({ title: "Success!", description: "Your automated shopping list is ready."});
              } else {
                setAutomationStatusMessage(`Shopping list creation failed: ${data.message || data.error_details || 'Unknown error'}`);
                toast({ title: "Shopping List Error", description: data.message || data.error_details || "Failed to create automated shopping list.", variant: "destructive"});
              }
            } else if (data.status === 'pending') {
              setAutomationStatusMessage("Your shopping list is being prepared...");
            } else {
                setAutomationStatusMessage("Received an unexpected status for your shopping list.");
                setIsLoadingAutomation(false);
                if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
            }
          } else {
            setAutomationStatusMessage("Error checking shopping list status. Will retry.");
          }
        } catch (error) {
          console.error("Polling error:", error);
          setAutomationStatusMessage("Error connecting to update service. Will retry.");
        }
      };

      pollForResult(); 
      pollingIntervalRef.current = setInterval(pollForResult, POLLING_INTERVAL);
    } else if (shoppingTaskResult) {
      setIsLoadingAutomation(false);
      setAutomationStatusMessage(shoppingTaskResult.success ? "Automated shopping list ready." : `Shopping list creation failed: ${shoppingTaskResult.message}`);
    } else {
        setIsLoadingAutomation(false);
        setAutomationStatusMessage("Order details recorded. Automated list not initiated or result not available.");
    }

    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
   }, [activeShoppingRequestId, isOrderComplete, router, setShoppingTaskResult, shoppingTaskResult, toast]);


    if (!isOrderComplete && !activeShoppingRequestId) {
        return <div className="container mx-auto py-16 px-4 flex flex-col items-center justify-center text-center"><Loader2 className="w-12 h-12 animate-spin text-primary" /></div>;
    }

  return (
    <div className="container mx-auto py-16 px-4 flex flex-col items-center justify-center text-center">
      <CheckCircle2 className="w-24 h-24 text-primary mb-4" />
      <h1 className="text-3xl font-bold mb-2">Order Placed!</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Your healthy meals are planned. We're preparing your automated shopping list.
      </p>

      <Card className="w-full max-w-md mb-8 text-left shadow-lg rounded-lg">
         <CardHeader>
            <CardTitle className="text-xl text-primary">Shopping Resources</CardTitle>
         </CardHeader>
         <CardContent className="space-y-4">
            {isLoadingAutomation && (
              <div className="flex items-center space-x-2">
                <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                <p className="text-sm text-muted-foreground">{automationStatusMessage}</p>
              </div>
            )}
            {!isLoadingAutomation && shoppingTaskResult && shoppingTaskResult.success && shoppingTaskResult.final_list_url && (
              <div>
                <h3 className="font-semibold mb-1">Automated Coles Shopping List</h3>
                <Link href={shoppingTaskResult.final_list_url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline break-all flex items-center">
                  View Your Coles List <ExternalLink className="ml-1 h-4 w-4"/>
                </Link>
                {shoppingTaskResult.calculated_total_price && (
                    <p className="text-xs text-muted-foreground mt-1">
                        Estimated Price: ${shoppingTaskResult.calculated_total_price}
                    </p>
                )}
                <p className="text-xs text-muted-foreground mt-1">{shoppingTaskResult.message}</p>
              </div>
            )}
            {!isLoadingAutomation && shoppingTaskResult && !shoppingTaskResult.success && (
              <div>
                <h3 className="font-semibold mb-1 text-destructive">Shopping List Error</h3>
                <p className="text-sm text-destructive">{shoppingTaskResult.message || shoppingTaskResult.error_details || "Failed to generate automated shopping list."}</p>
                <p className="text-xs text-muted-foreground mt-1">You can still view your items on our <Link href="/shopping-list" className="text-primary hover:underline">manual shopping list page</Link>.</p>
              </div>
            )}
             {!isLoadingAutomation && !shoppingTaskResult && ( 
                <div>
                    <h3 className="font-semibold mb-1">Shopping List</h3>
                    <p className="text-sm text-muted-foreground">{automationStatusMessage}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                        Your selected items are on the <Link href="/shopping-list" className="text-primary hover:underline">manual shopping list page</Link>.
                         Number of meal ingredients: {shoppingList.filter(item => item.mealId !== 'extra').length}. Extras: {shoppingList.filter(item => item.mealId === 'extra').length}.
                    </p>
                </div>
            )}
            <Separator />
             <div>
                <h3 className="font-semibold mb-1">Cooking Guide</h3>
                <Link href="#" className="text-accent hover:underline break-all">
                     [Placeholder: Link to your personalized cooking guide]
                </Link>
                 <p className="text-xs text-muted-foreground mt-1">
                    Step-by-step instructions for preparing your selected meals.
                </p>
            </div>
         </CardContent>
      </Card>

      <Button asChild size="lg" onClick={resetOrder} variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">
        <Link href="/explore"> {/* Updated to point to /explore */}
          Start a New Plan
        </Link>
      </Button>
    </div>
  );
}
