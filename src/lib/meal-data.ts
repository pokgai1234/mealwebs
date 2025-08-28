// src/lib/meal-data.ts
import { supabase, supabaseInitializationError } from './supabase';
import type { Meal } from '@/types/meal';
import { Database } from '@/types/supabase';

// This file now uses Supabase to fetch meal data.

type MealFromDB = Database['public']['Tables']['meals']['Row'];
type IngredientFromDB = Database['public']['Tables']['ingredients']['Row'];
type MealWithIngredients = MealFromDB & { ingredients: IngredientFromDB[] };


export async function getAllMeals(): Promise<Meal[]> {
  if (!supabase) {
    console.error("Supabase client is not initialized.", supabaseInitializationError);
    throw new Error(supabaseInitializationError || "Supabase client not available.");
  }
  
  console.log("Fetching all meals from Supabase...");
  const { data, error } = await supabase
    .from('meals')
    .select(`
      *,
      ingredients (
        *
      )
    `);

  if (error) {
    console.error('Error fetching meals:', error.message);
    throw new Error(`Failed to fetch meals: ${error.message}`);
  }
  
  const meals: Meal[] = (data as MealWithIngredients[]).map((meal) => ({
    id: String(meal.id),
    name: meal.name,
    description: meal.description ?? '',
    imageUrl: meal.image_url ?? '',
    imageHint: meal.image_hint ?? '',
    videoUrl: meal.video_url ?? null,
    calories: meal.calories ?? 0,
    protein: meal.protein ?? 0,
    estimatedTime: meal.estimated_time ?? 'N/A',
    estimatedPrice: meal.estimated_price ?? 0,
    ingredients: meal.ingredients.map((ing) => ({
      ...ing,
      category: ing.category as 'main' | 'seasoning' ?? 'main',
      shoppingLink: ing.shopping_link,
      meal_id: ing.meal_id ?? 0,
      quantity: ing.quantity ?? '',
    })),
    cookingSteps: [] // No cooking_steps column
  }));

  console.log(`Successfully fetched ${meals.length} meals.`);
  return meals;
}

export async function getMealById(id: string): Promise<Meal | null> {
  if (!supabase) {
     console.error("Supabase client is not initialized.", supabaseInitializationError);
    throw new Error(supabaseInitializationError || "Supabase client not available.");
  }

  console.log(`Fetching meal by ID: ${id}...`);
  const { data, error } = await supabase
    .from('meals')
    .select(`
      *,
      ingredients (
        *
      )
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching meal with id ${id}:`, error.message);
    if (error.code === 'PGRST116') { // PostgREST error for "exact one row not found"
        console.warn(`Meal with ID ${id} not found.`);
        return null;
    }
    throw new Error(`Failed to fetch meal: ${error.message}`);
  }
  
  if (data) {
    console.log(`Successfully fetched meal: ${data.name}`);
    const mealWithIngredients = data as MealWithIngredients;
    
    const meal: Meal = {
        id: String(mealWithIngredients.id),
        name: mealWithIngredients.name,
        description: mealWithIngredients.description ?? '',
        imageUrl: mealWithIngredients.image_url ?? '',
        imageHint: mealWithIngredients.image_hint ?? '',
        videoUrl: mealWithIngredients.video_url ?? null,
        calories: mealWithIngredients.calories ?? 0,
        protein: mealWithIngredients.protein ?? 0,
        estimatedTime: mealWithIngredients.estimated_time ?? 'N/A',
        estimatedPrice: mealWithIngredients.estimated_price ?? 0,
        ingredients: mealWithIngredients.ingredients.map((ing) => ({
            ...ing,
            category: ing.category as 'main' | 'seasoning' ?? 'main',
            shoppingLink: ing.shopping_link,
            meal_id: ing.meal_id ?? 0,
            quantity: ing.quantity ?? ''
        })),
        cookingSteps: [] // No cooking_steps column
    };
    return meal;
  }
  
  return null;
}