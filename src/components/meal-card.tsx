
'use client';

import type { Meal } from '@/types/meal';
import Image from 'next/image';
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, Dumbbell } from 'lucide-react';

interface MealCardProps {
  meal: Meal;
}

export function MealCard({ meal }: MealCardProps) {
  return (
    <Card className="w-full h-full overflow-hidden shadow-lg rounded-lg flex flex-col transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-[1.02]">
      <CardHeader className="p-0 relative">
        <Image
          src={meal.imageUrl}
          alt={meal.name}
          width={400}
          height={250}
          className="object-cover w-full h-48"
          data-ai-hint={meal.imageHint}
        />
         <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
         <div className="absolute bottom-0 left-0 p-4">
            <CardTitle className="text-xl text-white mb-1">{meal.name}</CardTitle>
        </div>
      </CardHeader>
      <CardFooter className="p-4 border-t mt-auto bg-card">
           <div className="flex justify-between items-center text-sm text-muted-foreground w-full">
             <span className="flex items-center font-semibold">
                <Flame className="w-4 h-4 mr-1.5 text-accent" aria-hidden="true" />
                 {meal.calories} Kcal
              </span>
             <span className="flex items-center font-semibold">
                <Dumbbell className="w-4 h-4 mr-1.5 text-primary" aria-hidden="true" />
                 {meal.protein}g Protein
              </span>
           </div>
      </CardFooter>
    </Card>
  );
}
