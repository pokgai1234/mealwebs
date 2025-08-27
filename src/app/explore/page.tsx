
// src/app/explore/page.tsx
'use client';

import { MealCard } from '@/components/meal-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ShoppingCart, Loader2 } from 'lucide-react';
import { useMealPlan } from '@/context/meal-plan-context';
import { useEffect, useState } from 'react';
import type { Meal } from '@/types/meal';
import { getAllMeals } from '@/lib/meal-data';
import { useToast } from '@/hooks/use-toast';

export default function ExplorePage() {
  const { selectedMeals } = useMealPlan();
  const [isClient, setIsClient] = useState(false);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();


  useEffect(() => {
    setIsClient(true);
    
    const fetchMeals = async () => {
      setIsLoading(true);
      try {
        const mealsData = await getAllMeals();
        setMeals(mealsData);
      } catch (error) {
         console.error('Error fetching meals:', error);
         toast({
          title: 'Error Fetching Meals',
          description: 'Could not load recipes. Please try again later.',
          variant: 'destructive'
        });
        setMeals([]);
      }
      setIsLoading(false);
    };

    fetchMeals();
  }, [toast]);


  return (
    <div className="container mx-auto py-12 px-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10 pb-6 border-b border-border">
        <h1 className="text-4xl font-bold text-primary mb-4 sm:mb-0">
          Explore Meal Plans
        </h1>
        <div className="flex items-center gap-4">
          {isClient && selectedMeals.length > 0 && (
            <Button asChild variant="default" className="shadow-md hover:shadow-lg transition-shadow">
              <Link href="/shopping-list">
                <ShoppingCart className="mr-2 h-5 w-5" />
                My List ({selectedMeals.length})
              </Link>
            </Button>
          )}
        </div>
      </div>
      {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="ml-4 text-lg text-muted-foreground">Loading Meals...</p>
          </div>
        ) : meals.length > 0 ? (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {meals.map((meal) => (
            <Link key={meal.id} href={`/meal/${meal.id}`} className="block h-full">
                <MealCard meal={meal} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">No meals found.</p>
        </div>
      )}
     
        {isClient && selectedMeals.length > 0 && (
         <div className="mt-16 text-center">
           <Button asChild size="lg" variant="default" className="shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105">
              <Link href="/shopping-list">
                 <ShoppingCart className="mr-2 h-5 w-5" />
                 Proceed to Shopping List
               </Link>
           </Button>
          </div>
        )}
    </div>
  );
}
