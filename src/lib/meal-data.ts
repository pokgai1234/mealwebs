// src/lib/meal-data.ts
import { supabase, supabaseInitializationError } from './supabase';
import type { Meal } from '@/types/meal';

// This file now uses Supabase to fetch meal data.

export async function getAllMeals(): Promise<Meal[]> {
  if (!supabase) {
    console.error("Supabase client is not initialized.", supabaseInitializationError);
    throw new Error(supabaseInitializationError || "Supabase client not available.");
  }
  
  console.log("Fetching all meals from Supabase...");
  const { data, error } = await supabase
    .from('meals')
    .select(`
      id,
      name,
      description,
      image_url,
      image_hint,
      video_url,
      calories,
      protein,
      estimated_time,
      estimated_price,
      ingredients (
        id,
        meal_id,
        name,
        quantity,
        category,
        shopping_link
      )
    `);

  if (error) {
    console.error('Error fetching meals:', error.message);
    throw new Error(`Failed to fetch meals: ${error.message}`);
  }
  
  const meals: Meal[] = data.map((meal: any) => ({
    id: meal.id,
    name: meal.name,
    description: meal.description,
    imageUrl: meal.image_url,
    imageHint: meal.image_hint,
    videoUrl: meal.video_url,
    calories: meal.calories,
    protein: meal.protein,
    estimatedTime: meal.estimated_time,
    estimatedPrice: meal.estimated_price,
    ingredients: meal.ingredients.map((ing: any) => ({
      ...ing,
      shoppingLink: ing.shopping_link,
    })),
    cookingSteps: meal.cookingSteps || []
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
      id,
      name,
      description,
      image_url,
      image_hint,
      video_url,
      calories,
      protein,
      estimated_time,
      estimated_price,
      cooking_steps,
      ingredients (
        id,
        meal_id,
        name,
        quantity,
        category,
        shopping_link
      )
    `)
    .eq('id', id)
    .single(); // .single() returns one object instead of an array

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
    
    const meal: Meal = {
        id: data.id,
        name: data.name,
        description: data.description,
        imageUrl: data.image_url,
        imageHint: data.image_hint,
        videoUrl: data.video_url,
        calories: data.calories,
        protein: data.protein,
        estimatedTime: data.estimated_time,
        estimatedPrice: data.estimated_price,
        cookingSteps: data.cooking_steps || [],
        ingredients: data.ingredients.map((ing: any) => ({
            ...ing,
            shoppingLink: ing.shopping_link
        }))
    };
    return meal;
  }
  
  return null;
}
