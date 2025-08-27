// src/app/meal/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getMealById } from '@/lib/meal-data';
import type { Meal } from '@/types/meal';
import { useMealPlan } from '@/context/meal-plan-context';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Share2, Flame, Dumbbell, PlusCircle, ShoppingCart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function MealDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addMeal, selectedMeals } = useMealPlan();
  const { toast } = useToast();

  const [meal, setMeal] = useState<Meal | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id || typeof id !== 'string') return;

    const fetchMeal = async () => {
      setIsLoading(true);
      try {
        const mealData = await getMealById(id);
        if (!mealData) {
          throw new Error('Meal not found');
        }
        setMeal(mealData);
      } catch (error) {
        console.error('Error fetching meal:', error);
        toast({
          title: 'Error',
          description: 'Could not find the requested meal.',
          variant: 'destructive',
        });
        router.push('/explore');
      }
      setIsLoading(false);
    };

    fetchMeal();
  }, [id, router, toast]);

  const handleShare = async () => {
    if (meal && navigator.share) {
      try {
        await navigator.share({
          title: meal.name,
          text: `Check out this delicious recipe: ${meal.name}. Find it on proti!`,
          url: window.location.href,
        });
        toast({ title: 'Recipe shared successfully!' });
      } catch (error) {
        console.error('Sharing failed:', error);
        toast({ title: 'Sharing failed', variant: 'destructive' });
      }
    } else {
      toast({ title: 'Web Share API not supported in your browser.', variant: 'destructive' });
    }
  };

  const handleAddToPlan = () => {
    if (meal) {
      addMeal(meal); 
      toast({
        title: 'Added to Plan!',
        description: `${meal.name} is now in your shopping list.`,
      });
    }
  };
  
  const isAlreadyInPlan = meal && selectedMeals.some(m => m.id === meal.id);


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!meal) {
    return <div className="text-center py-10">Meal not found.</div>;
  }
  
  const embedUrl = meal.videoUrl ? meal.videoUrl.replace("watch?v=", "embed/").split('&')[0] : null;


  return (
    <div className="pb-20">
      <div className="relative h-64 md:h-96 w-full">
        <Image
          src={meal.imageUrl}
          alt={meal.name}
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
          data-ai-hint={meal.imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 rounded-full bg-black/50 text-white hover:bg-black/70 hover:text-white"
          onClick={() => router.back()}
        >
          <ArrowLeft />
        </Button>
      </div>

      <div className="container mx-auto px-4 -mt-16 relative">
        <Card className="bg-card/95 backdrop-blur-sm p-6 rounded-xl shadow-lg">
          <CardContent className="p-0">
            <h1 className="text-3xl font-bold mb-4">{meal.name}</h1>
            <p className="text-muted-foreground mb-6">{meal.description}</p>

            <div className="flex items-center justify-around text-center border-t border-b border-border py-4 my-6">
              <div className="flex flex-col items-center">
                <Flame className="w-6 h-6 text-accent mb-1" />
                <span className="font-bold">{meal.calories}</span>
                <span className="text-xs text-muted-foreground">Kcal</span>
              </div>
              <div className="flex flex-col items-center">
                <Dumbbell className="w-6 h-6 text-primary mb-1" />
                <span className="font-bold">{meal.protein}g</span>
                <span className="text-xs text-muted-foreground">Protein</span>
              </div>
              <div className="flex flex-col items-center">
                <Button variant="ghost" size="icon" onClick={handleShare}>
                  <Share2 className="w-6 h-6 text-primary" />
                </Button>
                 <span className="text-xs text-muted-foreground mt-1">Share</span>
              </div>
            </div>

            <Tabs defaultValue="ingredients" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                <TabsTrigger value="steps">Cooking Steps</TabsTrigger>
              </TabsList>
              <TabsContent value="ingredients" className="mt-4">
                <ul className="list-disc pl-5 space-y-2">
                  {meal.ingredients.map((ing) => (
                    <li key={ing.id}>{ing.quantity} {ing.name}</li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="steps" className="mt-4">
                {embedUrl && (
                  <div className="aspect-w-16 aspect-h-9 mb-4 rounded-lg overflow-hidden">
                    <iframe
                        src={embedUrl}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                    ></iframe>
                  </div>
                )}
                <ol className="list-decimal pl-5 space-y-2">
                  {meal.cookingSteps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
                 {!embedUrl && meal.cookingSteps.length === 0 && (
                    <p className="text-muted-foreground">No cooking steps or video available for this meal.</p>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

       <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t border-border z-10">
         <div className="container mx-auto flex gap-4">
            <Button size="lg" className="w-full" onClick={handleAddToPlan} disabled={isAlreadyInPlan}>
                <PlusCircle className="mr-2" />
                {isAlreadyInPlan ? 'Added to Plan' : 'Add to Plan'}
            </Button>
            {isAlreadyInPlan && (
                <Button size="lg" variant="secondary" className="w-full" asChild>
                    <a href="/shopping-list">
                        <ShoppingCart className="mr-2" />
                        View List
                    </a>
                </Button>
            )}
         </div>
       </div>
    </div>
  );
}
