// src/app/share/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getMealById } from '@/lib/meal-data';
import type { Meal } from '@/types/meal';
import { useMealPlan } from '@/context/meal-plan-context';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Flame, Dumbbell, PlusCircle, Share2, Utensils } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function ShareMealPage() {
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
        if (!mealData) throw new Error('Meal not found');
        setMeal(mealData);
      } catch (error) {
        console.error('Error fetching shared meal:', error);
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

  const handleAddToPlan = () => {
    if (meal) {
      addMeal(meal);
      toast({
        title: 'Added to Your Plan!',
        description: `${meal.name} is now in your shopping list.`,
      });
      router.push('/shopping-list');
    }
  };

  const handleShare = async () => {
    if (meal && navigator.share) {
      try {
        await navigator.share({
          title: `proti Recipe: ${meal.name}`,
          text: `Check out this delicious and high-protein recipe I found on proti!`,
          url: window.location.href,
        });
        toast({ title: 'Link copied and ready to share!' });
      } catch (error) {
        // Silently fail if user cancels share dialog
      }
    }
  };

  const isAlreadyInPlan = meal && selectedMeals.some(m => m.id === meal.id);
  const embedUrl = meal?.videoUrl ? meal.videoUrl.replace("watch?v=", "embed/").split('&')[0] : null;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!meal) {
    return null; // Redirect is handled in useEffect
  }

  return (
    <div className="pb-24">
      {/* Header Image and Back Button */}
      <div className="relative h-64 md:h-80 w-full">
        <Image
          src={meal.imageUrl}
          alt={meal.name}
          fill
          objectFit="cover"
          className="brightness-90"
          data-ai-hint={meal.imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 rounded-full bg-black/50 text-white hover:bg-black/70"
          onClick={() => router.push('/explore')}
        >
          <ArrowLeft />
        </Button>
         <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 rounded-full bg-black/50 text-white hover:bg-black/70"
          onClick={handleShare}
        >
          <Share2 />
        </Button>
      </div>

      {/* Main Content Card */}
      <div className="container mx-auto px-4 -mt-16 md:-mt-20 relative z-10">
        <Card className="bg-card/95 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-lg">
          <CardContent className="p-0">
            <h1 className="text-3xl font-bold mb-2">{meal.name}</h1>
            <p className="text-muted-foreground mb-4">{meal.description}</p>
            
            {/* Nutritional Info */}
            <div className="flex items-center justify-around text-center border-t border-b border-border py-4 my-4">
              <div className="flex flex-col items-center gap-1">
                <Flame className="w-6 h-6 text-orange-500" />
                <span className="font-bold">{meal.calories}</span>
                <span className="text-xs text-muted-foreground">Kcal</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Dumbbell className="w-6 h-6 text-primary" />
                <span className="font-bold">{meal.protein}g</span>
                <span className="text-xs text-muted-foreground">Protein</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Utensils className="w-6 h-6 text-primary" />
                <span className="font-bold">{meal.ingredients.length}</span>
                <span className="text-xs text-muted-foreground">Ingredients</span>
              </div>
            </div>

            {/* Video Embed */}
            {embedUrl && (
              <div className="aspect-w-16 aspect-h-9 my-6 rounded-lg overflow-hidden shadow-inner">
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

            {/* Ingredients List */}
            <div>
                <h2 className="text-xl font-semibold mb-3">Main Ingredients</h2>
                <ul className="list-disc pl-5 space-y-2 text-card-foreground">
                  {meal.ingredients.filter(ing => ing.category === 'main').map((ing) => (
                    <li key={ing.id}>{ing.quantity} {ing.name}</li>
                  ))}
                </ul>
            </div>
            
          </CardContent>
        </Card>
      </div>

       {/* Sticky Footer Button */}
       <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t border-border z-20">
         <div className="container mx-auto flex">
            <Button size="lg" className="w-full" onClick={handleAddToPlan} disabled={isAlreadyInPlan}>
                <PlusCircle className="mr-2" />
                {isAlreadyInPlan ? 'Already in Your Plan' : 'Add to My Plan'}
            </Button>
         </div>
       </div>
    </div>
  );
}
