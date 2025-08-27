

export interface Ingredient {
  id: number;
  meal_id: number;
  name: string;
  quantity: string;
  category: 'main' | 'seasoning';
  shoppingLink: string | null;
}

export interface Meal {
  id: string; // Keep as string for component key consistency
  name: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  videoUrl: string | null;
  calories: number;
  protein: number;
  ingredients: Ingredient[];
  cookingSteps: string[];
  estimatedTime: string;
  estimatedPrice: number;
}
