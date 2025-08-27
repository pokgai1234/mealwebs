// src/lib/meal-data.ts
import type { Meal, Ingredient } from '@/types/meal';

// This file replaces the direct Supabase calls with a local data source.
// In a real application, this would fetch from a CMS or a backend API.

const mealsData: Meal[] = [
    {
    "id": "1",
    "name": "Korean Fried Rice",
    "description": "This quick Korean fried rice features savory ground beef, fluffy rice, and a medley of colorful vegetables, all tossed in a fiery gochujang sauce. Topped with fresh scallions and a perfectly fried egg, this protein-rich dish is ready in just 20 minutes.",
    "imageUrl": "https://i.ytimg.com/vi/6PeNgiOIADY/maxresdefault.jpg",
    "imageHint": "korean fried rice",
    "videoUrl": "https://www.youtube.com/watch?v=6PeNgiOIADY",
    "calories": 774,
    "protein": 53,
    "estimatedTime": "20 mins",
    "estimatedPrice": 7,
    "ingredients": [
      { "id": 1, "meal_id": 1, "name": "Ground Beef (95/5 lean)", "quantity": "180g", "category": "main", "shoppingLink": null },
      { "id": 2, "meal_id": 1, "name": "Rice", "quantity": "60g", "category": "main", "shoppingLink": null },
      { "id": 3, "meal_id": 1, "name": "Onion", "quantity": "1", "category": "main", "shoppingLink": null },
      { "id": 4, "meal_id": 1, "name": "Red Bell Pepper", "quantity": "1", "category": "main", "shoppingLink": null },
      { "id": 5, "meal_id": 1, "name": "Scallions", "quantity": "2", "category": "main", "shoppingLink": null },
      { "id": 6, "meal_id": 1, "name": "Egg (Optional)", "quantity": "1", "category": "main", "shoppingLink": null },
      { "id": 7, "meal_id": 1, "name": "Garlic", "quantity": "2 cloves", "category": "seasoning", "shoppingLink": null },
      { "id": 8, "meal_id": 1, "name": "Ginger", "quantity": "1 piece", "category": "seasoning", "shoppingLink": null },
      { "id": 9, "meal_id": 1, "name": "Oil", "quantity": "6g", "category": "seasoning", "shoppingLink": null },
      { "id": 10, "meal_id": 1, "name": "Salt", "quantity": "to taste", "category": "seasoning", "shoppingLink": null },
      { "id": 11, "meal_id": 1, "name": "Black Pepper", "quantity": "to taste", "category": "seasoning", "shoppingLink": null },
      { "id": 12, "meal_id": 1, "name": "Soy Sauce", "quantity": "20g", "category": "seasoning", "shoppingLink": null },
      { "id": 13, "meal_id": 1, "name": "Gochujang", "quantity": "20g", "category": "seasoning", "shoppingLink": null },
      { "id": 14, "meal_id": 1, "name": "Light Mayonnaise", "quantity": "20g", "category": "seasoning", "shoppingLink": null },
      { "id": 15, "meal_id": 1, "name": "Rice Vinegar", "quantity": "10g", "category": "seasoning", "shoppingLink": null }
    ],
    "cookingSteps": [
        "Heat oil in a large skillet or wok over medium-high heat. Add ground beef and cook until browned, breaking it apart with a spoon.",
        "Add chopped onion, red bell pepper, garlic, and ginger. Sauté for 3-4 minutes until vegetables are tender-crisp.",
        "Push the beef and vegetables to one side of the skillet. Add the cooked rice to the empty side and stir-fry for 2-3 minutes.",
        "In a small bowl, mix together soy sauce, gochujang, and rice vinegar. Pour the sauce over the rice and beef mixture.",
        "Stir everything together until well combined and heated through. Season with salt and pepper to taste.",
        "In a separate pan, fry an egg to your liking (sunny-side up is classic).",
        "Serve the fried rice in a bowl, topped with the fried egg, fresh scallions, and a drizzle of light mayonnaise."
      ]
  },
  {
    "id": "2",
    "name": "Gordon Ramsay Baked Salmon",
    "description": "This simple yet elegant baked salmon recipe, inspired by Gordon Ramsay, is ideal for fitness lovers and food enthusiasts alike. It’s packed with lean protein, omega-3 fatty acids, and nutrient-rich vegetables — making it a perfect post-gym meal that doesn’t sacrifice flavor.",
    "imageUrl": "https://www.mashed.com/img/gallery/gordon-ramsays-baked-salmon-recipe/l-intro-1627415257.jpg",
    "imageHint": "baked salmon dish",
    "videoUrl": "https://www.youtube.com/watch?v=WkrMRk2qdqo",
    "calories": 475,
    "protein": 48,
    "estimatedTime": "30-35 mins",
    "estimatedPrice": 9,
    "ingredients": [
      { "id": 16, "meal_id": 2, "name": "Salmon Fillets", "quantity": "2 (about 6 oz each)", "category": "main", "shoppingLink": null },
      { "id": 17, "meal_id": 2, "name": "Lemon Slices", "quantity": "for serving", "category": "main", "shoppingLink": null },
      { "id": 18, "meal_id": 2, "name": "Olive Oil", "quantity": "2 tablespoons", "category": "seasoning", "shoppingLink": null },
      { "id": 19, "meal_id": 2, "name": "Unsalted Butter", "quantity": "2 tablespoons", "category": "seasoning", "shoppingLink": null },
      { "id": 20, "meal_id": 2, "name": "Garlic", "quantity": "2 cloves", "category": "seasoning", "shoppingLink": null },
      { "id": 21, "meal_id": 2, "name": "Dijon Mustard", "quantity": "1 teaspoon", "category": "seasoning", "shoppingLink": null },
      { "id": 22, "meal_id": 2, "name": "Honey", "quantity": "1 teaspoon", "category": "seasoning", "shoppingLink": null },
      { "id": 23, "meal_id": 2, "name": "Fresh Lemon Juice", "quantity": "1 tablespoon", "category": "seasoning", "shoppingLink": null },
      { "id": 24, "meal_id": 2, "name": "Lemon Zest", "quantity": "1 teaspoon", "category": "seasoning", "shoppingLink": null },
      { "id": 25, "meal_id": 2, "name": "Salt", "quantity": "½ teaspoon", "category": "seasoning", "shoppingLink": null },
      { "id": 26, "meal_id": 2, "name": "Black Pepper", "quantity": "¼ teaspoon", "category": "seasoning", "shoppingLink": null },
      { "id": 27, "meal_id": 2, "name": "Smoked Paprika", "quantity": "½ teaspoon", "category": "seasoning", "shoppingLink": null },
      { "id": 28, "meal_id": 2, "name": "Fresh Parsley", "quantity": "1 teaspoon", "category": "seasoning", "shoppingLink": null }
    ],
    "cookingSteps": [
        "Preheat your oven to 400°F (200°C). Line a baking sheet with parchment paper.",
        "Pat the salmon fillets dry with a paper towel and season both sides with salt, black pepper, and smoked paprika.",
        "In a small bowl, whisk together the olive oil, melted butter, minced garlic, Dijon mustard, honey, lemon juice, and lemon zest.",
        "Place the salmon fillets on the prepared baking sheet. Pour the honey-mustard mixture evenly over the fillets.",
        "Bake for 12-15 minutes, or until the salmon is cooked through and flakes easily with a fork.",
        "Garnish with fresh parsley and serve immediately with lemon slices on the side."
      ]
  },
  {
    "id": "3",
    "name": "Lemon Chicken with broccoli",
    "description": "This lemon chicken meal prep features zesty, herb-marinated chicken with roasted vegetables and quinoa, creating five balanced, flavorful meals in just 35 minutes—perfect for healthy, efficient weekly planning. Easy to make, high protein.",
    "imageUrl": "https://jamiecooksitup.net/wp-content/uploads/2023/04/Lemon-Chicken-and-Broccoli-Sheet-Pan-Dinner-Jamie-Cooks-It-Up.jpg",
    "imageHint": "lemon chicken broccoli",
    "videoUrl": "https://www.youtube.com/watch?v=4ZdaEdo73cs",
    "calories": 870,
    "protein": 42,
    "estimatedTime": "35 mins",
    "estimatedPrice": 9,
    "ingredients": [
      { "id": 29, "meal_id": 3, "name": "Chicken Thigh, Boneless & Skinless", "quantity": "1kg", "category": "main", "shoppingLink": null },
      { "id": 30, "meal_id": 3, "name": "Broccoli, Large Heads", "quantity": "2", "category": "main", "shoppingLink": null },
      { "id": 31, "meal_id": 3, "name": "Green Beans", "quantity": "250g", "category": "main", "shoppingLink": null },
      { "id": 32, "meal_id": 3, "name": "Basmati Rice", "quantity": "350g", "category": "main", "shoppingLink": null },
      { "id": 33, "meal_id": 3, "name": "Lemons", "quantity": "2", "category": "main", "shoppingLink": null },
      { "id": 34, "meal_id": 3, "name": "Olive Oil", "quantity": "2 1/2 Tbsp", "category": "seasoning", "shoppingLink": null },
      { "id": 35, "meal_id": 3, "name": "Chicken Stock", "quantity": "1/2 Cup", "category": "seasoning", "shoppingLink": null },
      { "id": 36, "meal_id": 3, "name": "Garlic", "quantity": "3 Cloves", "category": "seasoning", "shoppingLink": null },
      { "id": 37, "meal_id": 3, "name": "Honey", "quantity": "1/3 Cup", "category": "seasoning", "shoppingLink": null },
      { "id": 38, "meal_id": 3, "name": "Onion Powder", "quantity": "1 tsp", "category": "seasoning", "shoppingLink": null },
      { "id": 39, "meal_id": 3, "name": "Soy Sauce", "quantity": "1 1/2 Tbsp", "category": "seasoning", "shoppingLink": null },
      { "id": 40, "meal_id": 3, "name": "Sesame Oil", "quantity": "2 tsp", "category": "seasoning", "shoppingLink": null },
      { "id": 41, "meal_id": 3, "name": "Corn Flour", "quantity": "1 1/2 Tbsp", "category": "seasoning", "shoppingLink": null },
      { "id": 42, "meal_id": 3, "name": "Seasoning", "quantity": "To Taste", "category": "seasoning", "shoppingLink": null },
      { "id": 43, "meal_id": 3, "name": "Cold Water", "quantity": "700ml", "category": "seasoning", "shoppingLink": null },
      { "id": 44, "meal_id": 3, "name": "Salt", "quantity": "To Taste", "category": "seasoning", "shoppingLink": null }
    ],
    "cookingSteps": [
        "Cook basmati rice according to package instructions.",
        "Preheat oven to 400°F (200°C). Toss broccoli florets and green beans with 1 tbsp of olive oil, salt, and pepper. Roast for 15-20 minutes until tender-crisp.",
        "While vegetables are roasting, season chicken thighs with onion powder, salt, and your preferred seasoning.",
        "In a large skillet, heat 1.5 tbsp of olive oil over medium-high heat. Cook chicken for 6-8 minutes per side, until golden brown and cooked through.",
        "For the sauce, whisk together chicken stock, juice of 1 lemon, minced garlic, honey, soy sauce, and sesame oil in a small saucepan. Bring to a simmer.",
        "In a small bowl, mix corn flour with a little cold water to create a slurry. Whisk it into the sauce and cook for 1-2 minutes until thickened.",
        "Pour the sauce over the cooked chicken. Serve with roasted vegetables, rice, and slices from the remaining lemon."
      ]
  }
];

export async function getAllMeals(): Promise<Meal[]> {
  // Simulate an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mealsData);
    }, 500); // 500ms delay to simulate network latency
  });
}

export async function getMealById(id: string): Promise<Meal | null> {
  // Simulate an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const meal = mealsData.find(m => m.id === id);
      resolve(meal || null);
    }, 300);
  });
}
