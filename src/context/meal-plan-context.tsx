
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

interface MealPlanState {
  selectedMeals: Meal[];
  extraShoppingItems: ShoppingListItem[];
  shoppingList: ShoppingListItem[];
  selectedStore: 'coles' | 'woolworths' | 'both' | null;
  deliveryTime: 'today' | 'tomorrow' | null;
  deliveryAddress: string;
  isOrderComplete: boolean;
  activeShoppingRequestId: string | null;
  shoppingTaskResult: OrchestratorResult | null;
}

interface MealPlanContextType extends MealPlanState {
  addMeal: (meal: Meal) => void;
  removeMeal: (mealId: string) => void;
  
  updateShoppingListItemChecked: (originalIndexInShoppingList: number, checked: boolean) => void;
  toggleGroupChecked: (mealId: string) => void;

  addExtraItem: (item: Omit<ShoppingListItem, 'id' | 'mealId' | 'mealName' | 'category' | 'checked' | 'shoppingLink'>) => void;
  removeExtraItem: (itemId: string) => void;

  setSelectedStore: Dispatch<SetStateAction<'coles' | 'woolworths' | 'both' | null>>;
  setDeliveryTime: Dispatch<SetStateAction<'today' | 'tomorrow' | null>>;
  setDeliveryAddress: Dispatch<SetStateAction<string>>;
  completeOrder: () => void;
  resetOrder: () => void;

  setActiveShoppingRequestId: Dispatch<SetStateAction<string | null>>;
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

const defaultState: MealPlanState = {
    selectedMeals: [],
    extraShoppingItems: [],
    shoppingList: [],
    selectedStore: null,
    deliveryTime: null,
    deliveryAddress: '',
    isOrderComplete: false,
    activeShoppingRequestId: null,
    shoppingTaskResult: null,
};

const LOCAL_STORAGE_KEY = 'protiMealPlan';

export const MealPlanProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<MealPlanState>(defaultState);

  // Load state from localStorage on initial mount
  useEffect(() => {
    try {
      const storedState = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedState) {
        const parsedState = JSON.parse(storedState);
        // Basic validation to ensure we don't load corrupted data
        if (parsedState && typeof parsedState === 'object' && 'selectedMeals' in parsedState) {
            setState(parsedState);
        }
      }
    } catch (error) {
        console.error("Failed to load state from localStorage", error);
        // If loading fails, we proceed with the default empty state
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error("Failed to save state to localStorage", error);
    }
  }, [state]);


  const regenerateShoppingList = useCallback((selectedMeals: Meal[], extraShoppingItems: ShoppingListItem[], oldShoppingList: ShoppingListItem[]) => {
      const newMainIngredients: ShoppingListItem[] = [];
      const uniqueSeasoningsMap = new Map<string, ShoppingListItem>();

      selectedMeals.forEach(meal => {
        meal.ingredients.forEach(ingredient => {
          const existingItemInOldList = oldShoppingList.find(
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
          const existingExtra = oldShoppingList.find(sli => sli.id === extraItem.id && sli.mealId === 'extra');
          return existingExtra ? { ...extraItem, checked: existingExtra.checked ?? false } : {...extraItem, checked: false};
      });

      return [...newMainIngredients, ...newSeasoningsList, ...updatedExtraShoppingItems];
  }, []);

  const addMeal = (meal: Meal) => {
    setState(prevState => {
      if (!prevState.selectedMeals.some(m => m.id === meal.id)) {
        const newSelectedMeals = [...prevState.selectedMeals, meal];
        const newShoppingList = regenerateShoppingList(newSelectedMeals, prevState.extraShoppingItems, prevState.shoppingList);
        return { ...prevState, selectedMeals: newSelectedMeals, shoppingList: newShoppingList };
      }
      return prevState;
    });
  };

  const removeMeal = (mealIdToRemove: string) => {
    setState(prevState => {
        const newSelectedMeals = prevState.selectedMeals.filter(meal => meal.id !== mealIdToRemove);
        const newShoppingList = regenerateShoppingList(newSelectedMeals, prevState.extraShoppingItems, prevState.shoppingList);
        return { ...prevState, selectedMeals: newSelectedMeals, shoppingList: newShoppingList };
    });
  };

  const updateShoppingListItemChecked = (originalIndexInShoppingList: number, checked: boolean) => {
    setState(prevState => {
      const newList = [...prevState.shoppingList];
      if (newList[originalIndexInShoppingList]) {
        newList[originalIndexInShoppingList] = { ...newList[originalIndexInShoppingList], checked };
      }
      return { ...prevState, shoppingList: newList };
    });
  };

  const toggleGroupChecked = (mealIdToToggle: string) => {
    setState(prevState => {
        const { shoppingList } = prevState;
        const shouldCheckAll = shoppingList.some(item => item.mealId === mealIdToToggle && !item.checked);
        const newShoppingList = shoppingList.map(item => {
            if (item.mealId === mealIdToToggle) {
                return { ...item, checked: shouldCheckAll };
            }
            return item;
        });
        return { ...prevState, shoppingList: newShoppingList };
    });
  };

  const addExtraItem = (item: Omit<ShoppingListItem, 'id' | 'mealId' | 'mealName' | 'category' | 'checked' | 'shoppingLink'>) => {
    setState(prevState => {
        const standardizedName = standardizeIngredientName(item.name);
        if (!prevState.extraShoppingItems.some(existing => standardizeIngredientName(existing.name) === standardizedName)) {
            const newItem: ShoppingListItem = {
                id: uuidv4(),
                ...item,
                category: 'seasoning',
                mealId: 'extra',
                mealName: 'Extras',
                checked: true,
                shoppingLink: `https://www.woolworths.com.au/shop/search/products?searchTerm=${encodeURIComponent(item.name)}`
            };
            const newExtraItems = [...prevState.extraShoppingItems, newItem];
            const newShoppingList = regenerateShoppingList(prevState.selectedMeals, newExtraItems, prevState.shoppingList);
            return { ...prevState, extraShoppingItems: newExtraItems, shoppingList: newShoppingList };
        }
        return prevState;
    });
  };
  
  const removeExtraItem = (itemIdToRemove: string) => {
    setState(prevState => {
        const newExtraItems = prevState.extraShoppingItems.filter(item => item.id !== itemIdToRemove);
        const newShoppingList = regenerateShoppingList(prevState.selectedMeals, newExtraItems, prevState.shoppingList);
        return { ...prevState, extraShoppingItems: newExtraItems, shoppingList: newShoppingList };
    });
  };

  const completeOrder = () => {
    setState(prevState => ({ ...prevState, isOrderComplete: true }));
  };

  const resetOrder = () => {
    setState(defaultState);
     try {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
     } catch (error) {
        console.error("Failed to clear state from localStorage", error);
     }
  };

  const setDeliveryAddress: Dispatch<SetStateAction<string>> = (value) => {
      setState(prevState => ({...prevState, deliveryAddress: typeof value === 'function' ? value(prevState.deliveryAddress) : value}));
  };
  const setDeliveryTime: Dispatch<SetStateAction<'today' | 'tomorrow' | null>> = (value) => {
      setState(prevState => ({...prevState, deliveryTime: typeof value === 'function' ? value(prevState.deliveryTime) : value}));
  };
  const setSelectedStore: Dispatch<SetStateAction<'coles' | 'woolworths' | 'both' | null>> = (value) => {
      setState(prevState => ({...prevState, selectedStore: typeof value === 'function' ? value(prevState.selectedStore) : value}));
  };
  const setActiveShoppingRequestId: Dispatch<SetStateAction<string | null>> = (value) => {
      setState(prevState => ({...prevState, activeShoppingRequestId: typeof value === 'function' ? value(prevState.activeShoppingRequestId) : value}));
  };
  const setShoppingTaskResult: Dispatch<SetStateAction<OrchestratorResult | null>> = (value) => {
      setState(prevState => ({...prevState, shoppingTaskResult: typeof value === 'function' ? value(prevState.shoppingTaskResult) : value}));
  };


  return (
    <MealPlanContext.Provider value={{
      ...state,
      addMeal,
      removeMeal,
      updateShoppingListItemChecked,
      toggleGroupChecked,
      addExtraItem,
      removeExtraItem,
      setSelectedStore,
      setDeliveryTime,
      setDeliveryAddress,
      completeOrder,
      resetOrder,
      setActiveShoppingRequestId,
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
