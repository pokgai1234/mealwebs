// src/app/order-summary/page.tsx (Final Shopping List)
'use client';

import { useMemo, useState, useEffect } from 'react';
import { useMealPlan } from '@/context/meal-plan-context';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ListChecks, Blend, PackagePlus, Utensils, ExternalLink, ShoppingCart, Share2, Check } from 'lucide-react';
import Link from 'next/link';
import type { ShoppingListItem } from '@/context/meal-plan-context';
import { useToast } from '@/hooks/use-toast';
import type { Meal } from '@/types/meal';

// Function to convert numbers to mathematical bold
const toBold = (str: string) => {
  const boldNumbers: { [key: string]: string } = {
    '0': '𝟬', '1': '𝟭', '2': '𝟮', '3': '𝟯', '4': '𝟰',
    '5': '𝟱', '6': '𝟲', '7': '𝟳', '8': '𝟴', '9': '𝟵'
  };
  return str.replace(/[0-9]/g, (char) => boldNumbers[char] || char);
};

export default function FinalShoppingListPage() {
  const { shoppingList = [], selectedMeals = [] } = useMealPlan();
  const { toast } = useToast();
  const [clickedItems, setClickedItems] = useState<string[]>([]);
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }
  }, []);

  const checkedItems = useMemo(() => shoppingList.filter(item => item.checked), [shoppingList]);

  const groupedCheckedItems = useMemo(() => {
    return checkedItems.reduce((acc, item) => {
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
      acc[key].push(item);
      return acc;
    }, {} as Record<string, ShoppingListItem[]>);
  }, [checkedItems]);

  const sortedGroupKeys = useMemo(() => {
    const keys = Object.keys(groupedCheckedItems);
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
  }, [groupedCheckedItems]);

  const handleItemClick = (itemId: string) => {
    if (!clickedItems.includes(itemId)) {
      setClickedItems(prev => [...prev, itemId]);
    }
  };

  const handleShare = async () => {
    if (typeof navigator.share === 'undefined' || !origin) {
      toast({
        title: "Sharing Not Supported",
        description: "Your browser does not support the Web Share API.",
        variant: "destructive"
      });
      return;
    }
    
    let shareText = "Check out my high-protein meal plan from proti:\n\n";

    // Create a unique set of meals from the checked items
    const mealsToShare = selectedMeals.filter(meal => 
      checkedItems.some(item => item.mealId === meal.id)
    );

    if (mealsToShare.length === 0) {
       toast({
        title: "No Meals to Share",
        description: "Your selected items don't belong to any specific meal. Share a meal to see it here!",
      });
      return;
    }

    mealsToShare.forEach(meal => {
      const shareUrl = `${origin}/share/${meal.id}`;
      shareText += `- ${meal.name}: ${shareUrl}\n`;
    });

    try {
      await navigator.share({
        title: 'My proti Meal Plan',
        text: shareText,
      });
      toast({ title: "Shared successfully!" });
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        toast({
          title: "Sharing Failed",
          description: "Could not share the plan. Please try again.",
          variant: "destructive"
        });
      }
    }
  };


  if (checkedItems.length === 0) { 
    return (
      <div className="container mx-auto py-8 px-4 max-w-3xl text-center">
        <Card className="p-6">
          <CardTitle>No Items Selected for Purchase</CardTitle>
          <CardContent className="mt-4">
            <p>Your shopping list has no items checked. Please go back and select items you wish to purchase.</p>
            <Button asChild variant="link" className="mt-4">
              <Link href="/shopping-list">Back to Shopping List</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <h1 className="text-3xl font-bold text-primary mb-2">Final Shopping List</h1>
      <p className="text-muted-foreground mb-6">Use the buttons to add items to your online shopping cart. Clicked items will be marked as added.</p>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center"><ListChecks className="mr-2 h-5 w-5 text-primary"/>Your Selected Items</CardTitle>
        </CardHeader>
        <CardContent>
          {sortedGroupKeys.map((groupName, groupIndex) => (
            <div key={groupName} className="mb-6 last:mb-0">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                {groupName === 'Extras' ? <PackagePlus className="mr-2 h-5 w-5 text-muted-foreground" /> :
                 groupName === 'Seasonings & Condiments' ? <Blend className="mr-2 h-5 w-5 text-accent" /> :
                 <Utensils className="mr-2 h-5 w-5 text-primary" />}
                {groupName}
              </h3>
              <ul className="space-y-2">
                {groupedCheckedItems[groupName].map((item, idx) => {
                  const itemId = item.id || `${groupName}-${idx}`;
                  const isClicked = clickedItems.includes(itemId);
                  const searchQuery = encodeURIComponent(toBold(`${item.name} ${item.quantity}`));
                  const shoppingUrl = `https://www.woolworths.com.au/shop/search/products?searchTerm=${searchQuery}`;

                  return (
                    <li key={itemId} className="flex items-center justify-between p-2 rounded-md bg-secondary/30">
                      <Label htmlFor={`summary-item-${itemId}`} className="flex-1">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-sm text-muted-foreground ml-2">({item.quantity})</span>
                      </Label>
                      
                        <Button
                          asChild
                          variant={isClicked ? "secondary" : "outline"}
                          size="sm"
                          onClick={() => handleItemClick(itemId)}
                        >
                          <a href={shoppingUrl} target="_blank" rel="noopener noreferrer">
                            {isClicked ? (
                                <>
                                 <Check className="mr-2 h-4 w-4" /> Added
                                </>
                              ) : (
                                <>
                                 <ShoppingCart className="mr-2 h-4 w-4" />
                                 Add to Cart
                                </>
                            )}
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                    </li>
                  );
                })}
              </ul>
              {groupIndex < sortedGroupKeys.length - 1 && <Separator className="my-4" />}
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <Button variant="outline" asChild>
          <Link href="/shopping-list">Back to Shopping List</Link>
        </Button>
        <Button variant="default" onClick={handleShare}>
           <Share2 className="mr-2 h-4 w-4" />
           Save & Share Plan
        </Button>
      </div>
    </div>
  );
}
