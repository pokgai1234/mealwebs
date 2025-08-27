
'use client';

import type { Meal, Ingredient } from '@/types/meal';
import type { OrchestratorResult } from '@/types/shopping';
import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface ShoppingListItem extends Ingredient {
  id?: string; // Unique ID, especially for 'extra' items & combined seasonings
  mealId: string | 'extra' | 'seasonings_condiments';
  mealName?: string;
  checked?: boolean;
}

interface MealPlanContextType {
  selectedMeals: Meal[];
  addMeal: (meal: Meal) => void;
  removeMeal: (mealId: string) => void; // To remove a whole meal from the plan
  
  shoppingList: ShoppingListItem[]; // This will be the combined list for UI display
  
  updateShoppingListItemChecked: (originalIndexInShoppingList: number, checked: boolean) => void;
  toggleGroupChecked: (mealId: string) => void;

  addExtraItem: (item: Omit<ShoppingListItem, 'id' | 'mealId' | 'mealName' | 'category' | 'checked' | 'shoppingLink'>) => void;
  removeExtraItem: (itemId: string) => void; // Remove extra item by its unique ID

  // Order details state...
  selectedStore: 'coles' | 'woolworths' | 'both' | null;
  setSelectedStore: Dispatch<SetStateAction<'coles' | 'woolworths' | 'both' | null>>;
  deliveryTime: 'today' | 'tomorrow' | null;
  setDeliveryTime: Dispatch<SetStateAction<'today' | 'tomorrow' | null>>;
  deliveryAddress: string;
  setDeliveryAddress: Dispatch<SetStateAction<string>>;
  isOrderComplete: boolean;
  completeOrder: () => void;
  resetOrder: () => void;

  activeShoppingRequestId: string | null;
  setActiveShoppingRequestId: Dispatch<SetStateAction<string | null>>;
  shoppingTaskResult: OrchestratorResult | null;
  setShoppingTaskResult: Dispatch<SetStateAction<OrchestratorResult | null>>;
}

const MealPlanContext = createContext<MealPlanContextType | undefined>(undefined);

const standardizeIngredientName = (name: string): string => {
  let standardized = name.toLowerCase().trim();
  // Add more specific standardization rules if needed
  if (standardized.includes('paprika')) standardized = 'paprika';
  if (standardized.includes('onion powder')) standardized = 'onion powder';
  if (standardized.includes('garlic powder')) standardized = 'garlic powder';
  if (standardized.includes('salt') && !standardized.includes('sea salt flakes')) standardized = 'salt';
  if (standardized.includes('black pepper')) standardized = 'black pepper';
  if (standardized.includes('chilli powder')) standardized = 'chilli powder';
  if (standardized.includes('chilli flakes')) standardized = 'chilli flakes';
  if (standardized.includes('olive oil')) standardized = 'olive oil';
  if (standardized.includes('soy sauce')) standardized = 'soy sauce';
  if (standardized.includes('honey')) standardized = 'honey';
  return standardized;
};

export const MealPlanProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedMeals, setSelectedMeals] = useState<Meal[]>([]);
  const [extraShoppingItems, setExtraShoppingItems] = useState<ShoppingListItem[]>([]);
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]); // Final list for UI

  const [selectedStore, setSelectedStore] = useState<'coles' | 'woolworths' | 'both' | null>(null);
  const [deliveryTime, setDeliveryTime] = useState<'today' | 'tomorrow' | null>(null);
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [isOrderComplete, setIsOrderComplete] = useState<boolean>(false);
  const [activeShoppingRequestId, setActiveShoppingRequestId] = useState<string | null>(null);
  const [shoppingTaskResult, setShoppingTaskResult] = useState<OrchestratorResult | null>(null);

  // Effect to regenerate the shoppingList whenever selectedMeals or extraShoppingItems change
  useEffect(() => {
    if (isOrderComplete) {
      if (selectedMeals.length === 0 && extraShoppingItems.length === 0) {
        setShoppingList([]);
      }
      return;
    }

    const newMainIngredients: ShoppingListItem[] = [];
    const uniqueSeasoningsMap = new Map<string, ShoppingListItem>();

    selectedMeals.forEach(meal => {
      meal.ingredients.forEach(ingredient => {
        const existingItemInOldList = shoppingList.find(
          (oldItem) => 
            oldItem.name === ingredient.name && 
            ( (ingredient.category === 'main' && oldItem.mealId === meal.id) ||
              (ingredient.category === 'seasoning' && oldItem.mealId === 'seasonings_condiments' && standardizeIngredientName(oldItem.name) === standardizeIngredientName(ingredient.name))
            )
        );
        const checkedStatus = existingItemInOldList ? existingItemInOldList.checked : false;


        if (ingredient.category === 'main') {
          newMainIngredients.push({
            ...ingredient,
            mealId: meal.id,
            mealName: meal.name,
            checked: checkedStatus,
          });
        } else { // 'seasoning'
          const standardizedName = standardizeIngredientName(ingredient.name);
          if (!uniqueSeasoningsMap.has(standardizedName)) {
            uniqueSeasoningsMap.set(standardizedName, {
              ...ingredient,
              id: `seasoning-${standardizedName}`,
              name: ingredient.name,
              mealId: 'seasonings_condiments',
              mealName: 'Seasonings & Condiments',
              checked: checkedStatus,
            });
          } else {
            const currentSeasoning = uniqueSeasoningsMap.get(standardizedName)!;
            if (checkedStatus) {
                currentSeasoning.checked = true;
            }
             uniqueSeasoningsMap.set(standardizedName, currentSeasoning);
          }
        }
      });
    });

    const newSeasoningsList = Array.from(uniqueSeasoningsMap.values());
    
    const updatedExtraShoppingItems = extraShoppingItems.map(extraItem => {
        const existingExtra = shoppingList.find(sli => sli.id === extraItem.id && sli.mealId === 'extra');
        return existingExtra ? { ...extraItem, checked: existingExtra.checked ?? false } : {...extraItem, checked: false};
    });

    setShoppingList([...newMainIngredients, ...newSeasoningsList, ...updatedExtraShoppingItems]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMeals, extraShoppingItems, isOrderComplete]); 

  const addMeal = (meal: Meal) => {
    if (!selectedMeals.some(m => m.id === meal.id)) {
      setSelectedMeals(prevMeals => [...prevMeals, meal]);
    }
  };

  const removeMeal = (mealIdToRemove: string) => {
    setSelectedMeals(prevMeals => prevMeals.filter(meal => meal.id !== mealIdToRemove));
  };

  const updateShoppingListItemChecked = (originalIndexInShoppingList: number, checked: boolean) => {
    setShoppingList(prevList => {
      const newList = [...prevList];
      if (newList[originalIndexInShoppingList]) {
        newList[originalIndexInShoppingList] = { ...newList[originalIndexInShoppingList], checked };
      }
      return newList;
    });
  };

  const toggleGroupChecked = (mealIdToToggle: string) => {
    setShoppingList(prevList => {
        // Find if any item in the group is unchecked. If so, we'll check all. Otherwise, we'll uncheck all.
        const shouldCheckAll = prevList.some(item => item.mealId === mealIdToToggle && !item.checked);
        
        return prevList.map(item => {
            if (item.mealId === mealIdToToggle) {
                return { ...item, checked: shouldCheckAll };
            }
            return item;
        });
    });
  };

  const addExtraItem = (item: Omit<ShoppingListItem, 'id' | 'mealId' | 'mealName' | 'category' | 'checked' | 'shoppingLink'>) => {
    const standardizedName = standardizeIngredientName(item.name);
    if (!extraShoppingItems.some(existing => standardizeIngredientName(existing.name) === standardizedName)) {
      const newItem: ShoppingListItem = {
        id: uuidv4(),
        ...item,
        category: 'seasoning', // Default category for extras, can be anything
        mealId: 'extra',
        mealName: 'Extras',
        checked: true, // Add extra items as checked by default
        shoppingLink: `https://www.woolworths.com.au/shop/search/products?searchTerm=${encodeURIComponent(item.name)}`
      };
      setExtraShoppingItems(prevExtras => [...prevExtras, newItem]);
    }
  };
  
  const removeExtraItem = (itemIdToRemove: string) => {
    setExtraShoppingItems(prevExtras => prevExtras.filter(item => item.id !== itemIdToRemove));
  };

  const completeOrder = () => {
    setIsOrderComplete(true);
  };

  const resetOrder = () => {
    setSelectedMeals([]);
    setExtraShoppingItems([]);
    setSelectedStore(null);
    setDeliveryTime(null);
    setDeliveryAddress('');
    setIsOrderComplete(false);
    setActiveShoppingRequestId(null);
    setShoppingTaskResult(null);
  };

  return (
    <MealPlanContext.Provider value={{
      selectedMeals,
      addMeal,
      removeMeal,
      shoppingList,
      updateShoppingListItemChecked,
      toggleGroupChecked,
      addExtraItem,
      removeExtraItem,
      selectedStore,
      setSelectedStore,
      deliveryTime,
      setDeliveryTime,
      deliveryAddress,
      setDeliveryAddress,
      isOrderComplete,
      completeOrder,
      resetOrder,
      activeShoppingRequestId,
      setActiveShoppingRequestId,
      shoppingTaskResult,
      setShoppingTaskResult,
    }}>
      {children}
    </MealPlanContext.Provider>
  );
};

export const useMealPlan = (): MealPlanContextType => {
  const context = useContext(MealPlanContext);
  if (context === undefined) {
    throw new Error('useMealPlan must be used within a MealPlanProvider');
  }
  return context;
};
