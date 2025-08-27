
'use client';

import { useMemo } from 'react';
import { useMealPlan } from '@/context/meal-plan-context';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ListChecks, Blend, PackagePlus, Utensils, CheckSquare } from 'lucide-react';
import type { ShoppingListItem } from '@/context/meal-plan-context';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';


export default function ShoppingListPage() {
  const {
    shoppingList = [],
    updateShoppingListItemChecked,
    selectedMeals = [],
    extraShoppingItems = [],
    toggleGroupChecked,
  } = useMealPlan();
  const { toast } = useToast();
  const router = useRouter();


  const groupedList = useMemo(() => {
    return (shoppingList || []).reduce((acc, item, index) => { // Ensure shoppingList is an array
      let key: string;
      if (item.mealId === 'extra') {
        key = 'Extras';
      } else if (item.mealId === 'seasonings_condiments') {
        key = 'Seasonings & Condiments';
      } else {
        key = item.mealName || 'Unknown Meal';
      }

      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push({ ...item, originalIndexInShoppingList: index });
      return acc;
    }, {} as Record<string, (ShoppingListItem & { originalIndexInShoppingList: number })[]>);
  }, [shoppingList]);


  const sortedGroupKeys = useMemo(() => {
    const keys = Object.keys(groupedList);
    const mealKeys = keys
      .filter(key => key !== 'Seasonings & Condiments' && key !== 'Extras')
      .sort();

    const specialKeys = [];
    if (keys.includes('Seasonings & Condiments')) {
      specialKeys.push('Seasonings & Condiments');
    }
    if (keys.includes('Extras')) {
      specialKeys.push('Extras');
    }
    return [...mealKeys, ...specialKeys];
  }, [groupedList]);


  const noItemsToShow = selectedMeals.length === 0 && extraShoppingItems.length === 0;

  const handleProceedToFinalList = () => {
    const hasCheckedItems = (shoppingList || []).some(item => item.checked); // Ensure shoppingList is an array
    if (!hasCheckedItems) {
        toast({
            title: "No Items Selected",
            description: "Please check at least one item to proceed.",
            variant: "destructive",
            duration: 5000
        });
        return;
    }
    router.push('/order-summary');
  };

  const getMealIdForGroupName = (groupName: string): string => {
    if (groupName === 'Extras') return 'extra';
    if (groupName === 'Seasonings & Condiments') return 'seasonings_condiments';
    // For meal groups, find the first item in that group and return its mealId
    const firstItem = groupedList[groupName]?.[0];
    return firstItem?.mealId || '';
  };


  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <h1 className="text-3xl font-bold text-primary mb-2">Your Shopping List</h1>
      <p className="text-muted-foreground mb-6">Check the items you want to purchase. Only checked items will appear on your final list.</p>


       {noItemsToShow ? (
         <Card className="text-center p-6">
            <CardTitle>Your Shopping List is Empty</CardTitle>
            <CardContent className="mt-4">
                <p>Go back and select some meals to add ingredients.</p>
                 <Button variant="link" className="mt-2" onClick={() => router.push('/explore')}>
                  Back to Meals
                </Button>
            </CardContent>
         </Card>
       ) : (
        <>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center"><ListChecks className="mr-2 h-5 w-5 text-primary"/>Confirm Your Items</CardTitle>
            </CardHeader>
            <CardContent>
              {sortedGroupKeys.map((groupName, groupIndex) => (
                  <div key={groupName} className="mb-6 last:mb-0">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-lg font-semibold flex items-center">
                           {groupName === 'Extras' ? <PackagePlus className="mr-2 h-5 w-5 text-muted-foreground" /> :
                            groupName === 'Seasonings & Condiments' ? <Blend className="mr-2 h-5 w-5 text-accent" /> :
                            <Utensils className="mr-2 h-5 w-5 text-primary" />}
                           {groupName}
                        </h3>
                        <Button variant="outline" size="sm" onClick={() => toggleGroupChecked(getMealIdForGroupName(groupName))}>
                            <CheckSquare className="mr-2 h-4 w-4" />
                            Select All
                        </Button>
                    </div>
                    <ul className="space-y-3">
                      {groupedList[groupName].map((item) => (
                        <li key={item.id || item.originalIndexInShoppingList} className="flex items-center justify-between space-x-3 p-2 rounded-md hover:bg-secondary/50 transition-colors">
                           <div className="flex items-center space-x-3 flex-1 min-w-0">
                            <Checkbox
                              id={`item-${item.id || item.originalIndexInShoppingList}`}
                              checked={!!item.checked}
                              onCheckedChange={(checked) => updateShoppingListItemChecked(item.originalIndexInShoppingList, !!checked)}
                              aria-label={`Select ${item.name}`}
                            />
                            <Label
                              htmlFor={`item-${item.id || item.originalIndexInShoppingList}`}
                              className={`flex-1 truncate ${!item.checked ? 'text-muted-foreground' : '' }`}
                            >
                              <span className="font-medium">{item.name}</span>
                              <span className="text-sm text-muted-foreground ml-2">({item.quantity})</span>
                            </Label>
                          </div>
                        </li>
                      ))}
                    </ul>
                    {groupIndex < sortedGroupKeys.length - 1 && <Separator className="my-4" />}
                  </div>
                ))}
            </CardContent>
          </Card>

          <div className="text-center">
             <Button size="lg" variant="default" onClick={handleProceedToFinalList} disabled={noItemsToShow}>
               Proceed to Final List
             </Button>
           </div>
         </>
       )}
    </div>
  );
}
