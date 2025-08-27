
# proti - Healthy Meal Planning & Grocery Ordering

proti is a web application designed to help users, especially those focused on fitness, plan their meals efficiently. It allows users to explore various recipes tailored for fitness goals (primarily focused on bulking/muscle gain), add them to a personalized plan, generate a shopping list, and simulate a grocery order process. The application uses Supabase for user authentication and Stripe for a simulated service fee payment. It also integrates with an external service to automate Coles shopping list creation.

## Project Aim

The primary goal of proti is to simplify healthy meal planning and grocery shopping by:
- Providing a curated list of fitness-oriented recipes with detailed nutritional information and video guides.
- Allowing users to easily create custom meal plans from a dedicated `/explore` page.
- Automatically generating a shopping list from selected meals, with main ingredients grouped by meal and common seasonings combined into a single list.
- Offering a streamlined (simulated) grocery ordering experience, including an order summary and a service fee payment step.
- **Automated Coles Shopping List**: After order placement, the system attempts to create a shopping list on Coles Online via an external service and provides a link.
- Enabling users to save their preferences and plans through user accounts (via Supabase).
- Featuring an engaging landing page to introduce users to the app's benefits.

## Key Features

- **Engaging Landing Page:**
    - Introduces new users to proti's features and benefits.
    - "Get Started" button directs users to the meal exploration page.
- **Recipe Browsing (`/explore`):**
    - Explore a diverse range of recipes focused on muscle gain.
- **Detailed Meal Information:**
    - View comprehensive details for each meal, including:
        - Name and Description
        - Image (with AI hint for future dynamic generation)
        - YouTube video guide for cooking (where available).
        - Macronutrient information (Calories, Protein)
        - List of main ingredients and seasonings/condiments with quantities (categorized).
        - Step-by-step cooking instructions (with a portion locked for premium users, where available)
        - Estimated cooking time
        - Estimated price
- **Meal Planning:**
    - Add desired meals to a personal meal plan.
    - Remove meals from the plan.
- **Shopping List Management:**
    - Automatically generated shopping list based on selected meals, with main ingredients grouped by meal and common seasonings combined into a single list.
    - Ability to check/uncheck items on the list (unchecked items are styled with a line-through).
    - Add custom "extra" items to the shopping list.
    - Remove items from the shopping list.
    - Quick-add common household items.
- **Simulated Order Process:**
    - **Order Summary Page:** Before payment, users review a summary of all checked items from their shopping list.
    - **Service Fee Payment (Stripe Integration):** A $1.95 AUD service fee is required before proceeding to order details, processed via Stripe Checkout.
    - Select preferred grocery store (Coles, Woolworths, or Both).
    - Choose delivery time (Today ASAP or Tomorrow).
    - Enter delivery address (Google Maps Autocomplete planned).
    - "Place order" functionality leading to an order completion page.
- **Order Completion:**
    - Displays a loading animation while attempting to create an automated Coles shopping list.
    - Provides a link to the generated Coles shopping list if successful.
    - Provides placeholders for a cooking guide.
    - Option to start a new plan (redirects to `/explore`), resetting current selections.
- **User Authentication (Supabase):**
    - Sign up with email and password.
    - Sign in with email and password.
    - Secure user logout.
    - Supabase configuration error handling and display.
- **User Experience:**
    - Responsive design for various screen sizes.
    - Toast notifications for actions and feedback.
    - Clean, modern UI using ShadCN components and Tailwind CSS.
- **Content & Legal:**
    - Static pages for Terms of Service and Privacy Policy.

## Available Recipes

Below is a list of recipes currently available in proti, with detailed information:

### Korean Fried Rice
-   **Description:** This quick Korean fried rice features savory ground beef, fluffy rice, and a medley of colorful vegetables, all tossed in a fiery gochujang sauce. Topped with fresh scallions and a perfectly fried egg, this protein-rich dish is ready in just 20 minutes.
-   **Video URL:** [https://www.youtube.com/embed/6PeNgiOIADY](https://www.youtube.com/embed/6PeNgiOIADY)
-   **Calories:** 774 Kcal per meal
-   **Protein:** 53g
-   **Estimated Time:** 20 mins
-   **Estimated Price:** $7.00
-   **Main Ingredients:**
    -   Ground Beef (95/5 lean): 180g
    -   Rice: 60g
    -   Onion: 1
    -   Red Bell Pepper: 1
    -   Scallions: 2
    -   Egg (Optional): 1
-   **Seasonings & Condiments:**
    -   Garlic: 2 cloves
    -   Ginger: 1 piece
    -   Oil: 6g
    -   Salt: to taste
    -   Black Pepper: to taste
    -   Soy Sauce: 20g
    -   Gochujang: 20g
    -   Light Mayonnaise: 20g
    -   Rice Vinegar: 10g
-   **Cooking Steps:** *(No cooking steps provided for this meal in the data)*

### Gordon Ramsay Baked Salmon
-   **Description:** This simple yet elegant baked salmon recipe, inspired by Gordon Ramsay, is ideal for fitness lovers and food enthusiasts alike. It’s packed with lean protein, omega-3 fatty acids, and nutrient-rich vegetables — making it a perfect post-gym meal that doesn’t sacrifice flavor.
-   **Video URL:** [https://www.youtube.com/embed/WkrMRk2qdqo](https://www.youtube.com/embed/WkrMRk2qdqo)
-   **Calories:** 475 Kcal per meal
-   **Protein:** 48g
-   **Estimated Time:** 30-35 mins
-   **Estimated Price:** $9.00
-   **Main Ingredients:**
    -   Salmon Fillets: 2 (about 6 oz each)
    -   Lemon Slices: for serving
-   **Seasonings & Condiments:**
    -   Olive Oil: 2 tablespoons
    -   Unsalted Butter: 2 tablespoons
    -   Garlic: 2 cloves
    -   Dijon Mustard: 1 teaspoon
    -   Honey: 1 teaspoon
    -   Fresh Lemon Juice: 1 tablespoon
    -   Lemon Zest: 1 teaspoon
    -   Salt: ½ teaspoon
    -   Black Pepper: ¼ teaspoon
    -   Smoked Paprika: ½ teaspoon
    -   Fresh Parsley: 1 teaspoon
-   **Cooking Steps:** *(No cooking steps provided for this meal in the data)*

### Lemon Chicken with broccoli
-   **Description:** This lemon chicken meal prep features zesty, herb-marinated chicken with roasted vegetables and quinoa, creating five balanced, flavorful meals in just 35 minutes—perfect for healthy, efficient weekly planning. Easy to make, high protein.
-   **Video URL:** [https://www.youtube.com/embed/4ZdaEdo73cs](https://www.youtube.com/embed/4ZdaEdo73cs)
-   **Calories:** 870 Kcal per meal
-   **Protein:** 42g
-   **Estimated Time:** 35 mins
-   **Estimated Price:** $9.00
-   **Main Ingredients:**
    -   Chicken Thigh, Boneless & Skinless: 1kg
    -   Broccoli, Large Heads: 2
    -   Green Beans: 250g
    -   Basmati Rice: 350g
    -   Lemons: 2
-   **Seasonings & Condiments:**
    -   Olive Oil: 2 1/2 Tbsp
    -   Chicken Stock: 1/2 Cup
    -   Garlic: 3 Cloves
    -   Honey: 1/3 Cup
    -   Onion Powder: 1 tsp
    -   Soy Sauce: 1 1/2 Tbsp
    -   Sesame Oil: 2 tsp
    -   Corn Flour: 1 1/2 Tbsp
    -   Seasoning: To Taste
    -   Cold Water: 700ml
    -   Salt: To Taste
-   **Cooking Steps:** *(No cooking steps provided for this meal in the data)*

### Honey Garlic Salmon
-   **Description:** This honey garlic salmon is really easy to make and creates an amazing tasting meal that can be enjoyed throughout the week or frozen for a later date.
-   **Video URL:** [https://www.youtube.com/embed/-3h4O4on_-4](https://www.youtube.com/embed/-3h4O4on_-4)
-   **Calories:** 650 Kcal per meal
-   **Protein:** 45g
-   **Estimated Time:** 30 mins
-   **Estimated Price:** $11.00
-   **Main Ingredients:**
    -   Salmon Fillets: 700g
    -   Rice: 175g
    -   Broccoli Head: 1
    -   Lemon: 1/4
-   **Seasonings & Condiments:**
    -   Olive Oil: 1 tsp
    -   Garlic Powder: 1 tsp
    -   Paprika: 1 tsp
    -   Butter or Olive Oil: 1 Tbsp
    -   Garlic: 3 cloves
    -   Chicken Stock: 1 Tbsp
    -   Soy Sauce: 1 Tbsp
    -   Honey: 2.5 Tbsp
    -   Peanut Oil: 1/2 Tbsp
-   **Cooking Steps:** *(No cooking steps provided for this meal in the data)*

### Garlic Butter Steak Bites
-   **Description:** Juicy garlic butter steak bites seared to perfection in a hot skillet. Quick, flavorful, and tender, this mouthwatering recipe is perfect for easy dinners, meal prep, or savory appetizers.
-   **Video URL:** [https://www.youtube.com/embed/KhycLcdemls](https://www.youtube.com/embed/KhycLcdemls)
-   **Calories:** 725 Kcal per meal
-   **Protein:** 47.5g
-   **Estimated Time:** 15 mins
-   **Estimated Price:** $7.50
-   **Main Ingredients:**
    -   Ribeye Steak: 2 lbs
-   **Seasonings & Condiments:**
    -   Garlic Powder: 1 tsp
    -   Dried Thyme: 1 tsp
    -   Salt: to taste
    -   Black Pepper: to taste
    -   Olive Oil or Avocado Oil: 2 tbsps
    -   Butter: 4 tbsps
    -   Garlic: 6 cloves
    -   Fresh Parsley: 1 tbsp
-   **Cooking Steps:** *(No cooking steps provided for this meal in the data)*

### Cheesesteak Burrito
-   **Description:** Ideal for busy lifestyles, they’re easy to make, freezer-friendly, and designed to keep you full and energized throughout the day. Whether you’re meal prepping for work or looking for a family-friendly dinner option, these Cheesesteak Burritos are a delicious and budget-friendly choice.
-   **Video URL:** [https://www.youtube.com/embed/g11sYOk2Ku8](https://www.youtube.com/embed/g11sYOk2Ku8)
-   **Calories:** 780 Kcal per meal
-   **Protein:** 55g
-   **Estimated Time:** 35 mins
-   **Estimated Price:** $4.50
-   **Main Ingredients:**
    -   Steak: 800g
    -   Onion: 1
    -   Bell Peppers: 2
    -   Mozzarella Cheese: 200g
    -   Tortillas: 5
-   **Seasonings & Condiments:**
    -   Onion Powder: 1 ½ tsp
    -   Garlic Powder: 1 ½ tsp
    -   Paprika: 1 ½ tsp
    -   Chilli Powder: ¼ tsp
    -   Worcestershire Sauce: 1 ½ Tbsp
-   **Cooking Steps:** *(No cooking steps provided for this meal in the data)*

### Honey Sriracha Chicken
-   **Description:** A flavorful and spicy-sweet chicken dish, perfect with rice and sautéed broccolini for a complete meal. Great for those who enjoy bold flavors and a good protein kick.
-   **Video URL:** [https://www.youtube.com/embed/YXGphEd1yaY](https://www.youtube.com/embed/YXGphEd1yaY)
-   **Calories:** 800 Kcal per meal
-   **Protein:** 65g
-   **Estimated Time:** 40 mins
-   **Estimated Price:** $10.50
-   **Main Ingredients:**
    -   Chicken Thigh: 1.2kg
    -   Jasmine Rice: 300g
    -   Broccolini: 300g
-   **Seasonings & Condiments:**
    -   Sriracha Sauce: 1/2 Cup
    -   Soy Sauce: 3 Tbsp
    -   Apple Cider Vinegar: 1 1/2 Tbsp
    -   Honey: 2 1/2 Tbsp
    -   Fresh Ginger: 15g
    -   Garlic: 4 Cloves
    -   Corn Flour: 2 1/2 tsp
    -   Peanut Oil: 1 Tbsp
    -   Peanut Oil: 3 tsp
    -   Sesame Oil: 2 tsp
-   **Cooking Steps:** *(No cooking steps provided for this meal in the data)*

### Korean Pork Ribs
-   **Description:** How to make the most tender, luxurious & melt in your mouth Korean pork ribs using a few simple everyday ingredients. These pork ribs are slow-baked in the oven & produce juicy, tender meat every time without failure.
-   **Video URL:** [https://www.youtube.com/embed/xmbRnzDvrY8](https://www.youtube.com/embed/xmbRnzDvrY8)
-   **Calories:** 1100 Kcal per meal
-   **Protein:** 65g
-   **Estimated Time:** 2-3 hours
-   **Estimated Price:** $8.75
-   **Main Ingredients:**
    -   Pork Ribs: 1.2kg
-   **Seasonings & Condiments:**
    -   Gochujang (Korean Spice Paste): 150g
    -   Ketchup: 150g
    -   Sriracha Sauce: 50g
    -   Chinese 5 Spice Powder: 1 Tbsp
    -   Onion Powder: 1 tsp
    -   Garlic Powder: 1 tsp
    -   Salt: 1 tsp
-   **Cooking Steps:** *(No cooking steps provided for this meal in the data)*

### Coconut Lime Chicken
-   **Description:** This flavorful dish combines juicy tomatoes, creamy coconut milk, garlic, ginger, and optional chili for a rich, aromatic sauce. Finished with fresh coriander and lime, it’s a comforting meal full of warmth, depth, and vibrant color.
-   **Video URL:** [https://www.youtube.com/embed/ncY0DMnb_Zw](https://www.youtube.com/embed/ncY0DMnb_Zw)
-   **Calories:** 750 Kcal per meal
-   **Protein:** 50g
-   **Estimated Time:** 30-35 mins
-   **Estimated Price:** $8.00
-   **Main Ingredients:**
    -   Chicken Breast: 3 (Butterflied & Halved into 6 Fillets)
    -   Brown Onion: 1
    -   Gourmet or Truss Tomatoes: 4
    -   Long Red Chilli (Optional): 1
-   **Seasonings & Condiments:**
    -   Olive Oil or Rice Bran Oil: 1 Tbsp
    -   Olive Oil or Rice Bran Oil: 1 Tbsp
    -   Onion Powder: 1 tsp
    -   Garlic Powder: 1 tsp
    -   Sweet Paprika: 1 tsp
    -   Salt: to taste
    -   Black Pepper: to taste
    -   Garlic: 6 Cloves
    -   Ginger: 5g
    -   Concentrated Tomato Paste: 1 1/2 Tbsp
    -   Coconut Milk: 1 Can
    -   Fresh Coriander (Cilantro): to serve
    -   Lime Wedge: to serve
-   **Cooking Steps:** *(No cooking steps provided for this meal in the data)*

### Chicken Snack Wraps
-   **Description:** Savor these high-protein crumbed chicken snack wraps—featuring crispy, golden chicken, smooth and creamy mayonnaise, all wrapped in a soft, warm tortilla. Quick, satisfying, and packed with flavor, they're the perfect anytime snack.
-   **Video URL:** [https://www.youtube.com/embed/lmcNC32cO90](https://www.youtube.com/embed/lmcNC32cO90)
-   **Calories:** 393 Kcal per meal
-   **Protein:** 33g
-   **Estimated Time:** 25-30 mins
-   **Estimated Price:** $6.50
-   **Main Ingredients:**
    -   Chicken Tenderloins: 600g
    -   Eggs: 2
    -   Panko Breadcrumbs: 100g
    -   Mayonnaise or Greek Yogurt: 100g
    -   Small Taco Wraps: 5-6
    -   Baby Cos Lettuce: 1 head
    -   Cheddar Cheese: 100g
-   **Seasonings & Condiments:**
    -   Onion Powder: 1 ½ tsp
    -   Garlic Powder: 1 ½ tsp
    -   Smoked Paprika: 1 ½ tsp
    -   Chilli Flakes (Optional): 1 tsp
    -   Salt: to taste
    -   Black Pepper: to taste
    -   Onion Powder: 1 tsp
    -   Garlic Powder: 1 tsp
    -   Smoked Paprika: 1 tsp
    -   Chilli Powder (Optional): ½ tsp
    -   Dijon Mustard: 1 tsp
    -   Dried or Fresh Dill: 1 tsp
-   **Cooking Steps:** *(No cooking steps provided for this meal in the data)*

### High Protein Marry Me Chicken
-   **Description:** Make your week easier—and tastier—with this creamy, high-protein Marry Me Chicken meal prep recipe. Packed with bold flavor and balanced nutrition, it’s perfect for healthy eating, muscle gain, or weight loss goals. Ready in under 30 minutes.
-   **Video URL:** [https://www.youtube.com/embed/sOR9Mwja_Ws](https://www.youtube.com/embed/sOR9Mwja_Ws)
-   **Calories:** 650 Kcal per meal
-   **Protein:** 64g
-   **Estimated Time:** 30 mins
-   **Estimated Price:** $12.00
-   **Main Ingredients:**
    -   Shell Pasta: 500g
    -   Chicken Breast: 800g
    -   High Protein Cottage Cheese: 2 Cups
    -   Parmigiano Reggiano: ½ Cup
    -   Sun-Dried Tomatoes: ½ Cup
    -   Baby Spinach: 200g
-   **Seasonings & Condiments:**
    -   Sun Dried Tomato Oil: 1 Tbsp
    -   Dried Italian Herbs: 1 Tbsp
    -   Chicken Stock: ⅔ Cup
    -   Onion Powder: 1 tsp
    -   Garlic Powder: 1 tsp
    -   Smoked Paprika: 1 tsp
    -   Salt: to taste
    -   Black Pepper: to taste
    -   Parmigiano Reggiano: for garnish
-   **Cooking Steps:** *(No cooking steps provided for this meal in the data)*

### Sweet and Sour Chicken
-   **Description:** Plan your meals for the week ahead with this simple and budget-friendly sweet and sour chicken recipe. It’s easy to make, packed with flavor, and includes full nutritional and macro breakdowns—so you always know exactly what you're eating. For extra tips and details, check out the video below.
-   **Video URL:** [https://www.youtube.com/embed/1N6hbRbyAeQ](https://www.youtube.com/embed/1N6hbRbyAeQ)
-   **Calories:** 719 Kcal per meal
-   **Protein:** 67g
-   **Estimated Time:** 35 mins
-   **Estimated Price:** $11.50
-   **Main Ingredients:**
    -   Chicken Breast or Thigh: 1.4kg
    -   Bell Peppers: 3
    -   Brown Onion: 1
-   **Seasonings & Condiments:**
    -   Grapeseed Oil: 2 ½ Tbsp
    -   Light Soy Sauce: ½ Cup
    -   Pineapple Juice: ⅓ Cup
    -   Honey: 4 Tbsp
    -   Worcestershire Sauce: 2 Tbsp
    -   Apple Cider Vinegar: 2 Tbsp
    -   Ketchup: 2 Tbsp
    -   Corn Flour or Corn Starch: 2 Tbsp
    -   Garlic: 4 Cloves
    -   Ginger: 15g
    -   Seasoning: To Taste
-   **Cooking Steps:** *(No cooking steps provided for this meal in the data)*

### Chicken Caesar Wraps
-   **Description:** Classic Chicken Caesar salad flavors transformed into a convenient and satisfying wrap. Features tender chicken, crisp romaine lettuce, Parmesan cheese, and a creamy Caesar-style dressing, all bundled in a soft tortilla. A high-protein meal perfect for lunch or a quick dinner.
-   **Video URL:** [https://www.youtube.com/embed/gmFAyi4yCJs](https://www.youtube.com/embed/gmFAyi4yCJs)
-   **Calories:** 530 Kcal per meal
-   **Protein:** 53g
-   **Estimated Time:** 20-25 mins
-   **Estimated Price:** $9.00
-   **Main Ingredients:**
    -   Chicken Breast: 600g
    -   Large Tortillas: 4
    -   Deli Turkey Breast: 200g
    -   Parmesan Cheese: 40g
    -   Romaine Lettuce: 2 heads
-   **Seasonings & Condiments:**
    -   Olive Oil: 15g
    -   Garlic Powder: 1tsp
    -   Cayenne Pepper: 1tsp
    -   Salt: to taste
    -   Black Pepper: to taste
    -   Light Mayonnaise: 40g
    -   Mustard: 20g
    -   Lemon: 1/2
    -   Garlic: 1 clove
    -   Greek Yogurt: 100g
-   **Cooking Steps:** *(No cooking steps provided for this meal in the data)*

### High Protein Beef patty melt
-   **Description:** A patty melt is a grilled sandwich featuring a seasoned ground beef patty, melted cheese (often Swiss), and caramelized onions, all pressed between two slices of griddled bread, typically rye. It's a savory and comforting diner classic.
-   **Video URL:** [https://www.youtube.com/embed/qwu_e_vkasQ](https://www.youtube.com/embed/qwu_e_vkasQ)
-   **Calories:** 418 Kcal per meal
-   **Protein:** 34g
-   **Estimated Time:** 20-25 mins
-   **Estimated Price:** $2.50
-   **Main Ingredients:**
    -   Sandwich Bread: 8 slices
    -   Ground Beef (95/5 lean): 400g
    -   Yellow Onions: 4 small
    -   American Cheese Slices: 8
-   **Seasonings & Condiments:**
    -   Olive Oil: 16g
    -   Salt: to taste
    -   Black Pepper: to taste
-   **Cooking Steps:** *(No cooking steps provided for this meal in the data)*

### Hot Honey Beef Bowl
-   **Description:** This dish offers a flavorful mix of seasoned ground beef and tender sweet potato, elevated by a rich gochujang and soy sauce blend. Toppings of creamy avocado and cottage cheese are brightened by a drizzle of hot honey.
-   **Video URL:** [https://www.youtube.com/embed/TC03ZukbX3g](https://www.youtube.com/embed/TC03ZukbX3g)
-   **Calories:** 775 Kcal per meal
-   **Protein:** 57g
-   **Estimated Time:** 25 mins
-   **Estimated Price:** $6.50
-   **Main Ingredients:**
    -   Ground Beef (95/5 lean): 180g
    -   Sweet Potatoes: 250g
    -   Avocado: 1/2
    -   Cottage Cheese: 100g
-   **Seasonings & Condiments:**
    -   Gochujang: 10g
    -   Soy Sauce: 25g
    -   Olive Oil: 7g
    -   Salt: to taste
    -   Black Pepper: to taste
    -   Paprika: 1/2 tsp
    -   Honey: 15g
    -   Sriracha: 15g
-   **Cooking Steps:** *(No cooking steps provided for this meal in the data)*

### Honey Peanut Butter Noodles
-   **Description:** This vibrant bowl offers a delightful combination of chewy udon noodles, succulent chicken, and colorful vegetables, all coated in a rich and flavorful honey peanut butter sauce. It's a speedy and satisfying high-protein option.
-   **Video URL:** [https://www.youtube.com/embed/RiJdwnXJQa8](https://www.youtube.com/embed/RiJdwnXJQa8)
-   **Calories:** 760 Kcal per meal
-   **Protein:** 52g
-   **Estimated Time:** 20-25 mins
-   **Estimated Price:** $7.00
-   **Main Ingredients:**
    -   Chicken Breast: 160g
    -   Udon Noodles: 200g
    -   Red Bell Pepper: 1
    -   Onion: 1
-   **Seasonings & Condiments:**
    -   Salt: to taste
    -   Black Pepper: to taste
    -   Garlic Powder: to taste
    -   Oil: 6g
    -   Peanut Butter: 20g
    -   Soy Sauce: 20g
    -   Lime: 1/2
    -   Honey: 15g
-   **Cooking Steps:** *(No cooking steps provided for this meal in the data)*

### High Protein Egg Fried Rice
-   **Description:** This high-protein fried rice recipe transforms leftover rice into a satisfying meal. It's packed with protein from eggs and your choice of meat or tofu, mixed with colorful vegetables like carrots, peas, and corn, all brought together with savory soy sauce and seasonings for a quick and flavorful dish.
-   **Video URL:** [https://www.youtube.com/embed/7vD0C4oR7RI](https://www.youtube.com/embed/7vD0C4oR7RI)
-   **Calories:** 627 Kcal per meal
-   **Protein:** 57g
-   **Estimated Time:** 20-25 mins
-   **Estimated Price:** $6.00
-   **Main Ingredients:**
    -   Jasmine Rice: 50g
    -   Chicken Breast: 180g
    -   Onion: 1
    -   Red Bell Pepper: 1
    -   Carrot: 1
    -   Frozen Peas: 50g
    -   Egg: 1
-   **Seasonings & Condiments:**
    -   Soy Sauce: 20g
    -   Garlic Paste: 1 tsp
    -   Ginger Paste: 1 tsp
    -   MSG: to taste
    -   Salt: to taste
-   **Cooking Steps:** *(No cooking steps provided for this meal in the data)*

## Getting Started

To get started with proti:
1. Ensure you have Node.js and npm/yarn installed.
2. Clone the repository.
3. Install dependencies: `npm install` or `yarn install`.
4. Set up Environment Variables:
   - Create a `.env.local` file in the root of your project.
   - This file will store your API keys and other sensitive configuration.
   - **Important:** Add `.env.local` to your `.gitignore` file to prevent committing your secret keys to version control.
   - Populate `.env.local` with the following variables, replacing the placeholder values with your actual keys:

     ```env
     # Supabase Configuration
     NEXT_PUBLIC_SUPABASE_URL="YOUR_SUPABASE_URL"
     NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
     SUPABASE_SERVICE_KEY="YOUR_SUPABASE_SERVICE_KEY" # For server-side operations (if needed)

     # Stripe Configuration
     NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="YOUR_STRIPE_PUBLISHABLE_KEY"
     STRIPE_SECRET_KEY="YOUR_STRIPE_SECRET_KEY" # For server-side operations
     STRIPE_WEBHOOK_SECRET="YOUR_STRIPE_WEBHOOK_SECRET" # For webhook verification (optional for this prototype)
     
     # Google Maps API Key (if integrating Google Maps Autocomplete)
     # NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="YOUR_GOOGLE_MAPS_API_KEY"

     # Firebase Configuration (Only if using OTHER Firebase services like Firestore, Storage, etc. Auth is handled by Supabase)
     NEXT_PUBLIC_FIREBASE_API_KEY="YOUR_FIREBASE_API_KEY"
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="YOUR_FIREBASE_AUTH_DOMAIN"
     NEXT_PUBLIC_FIREBASE_PROJECT_ID="YOUR_FIREBASE_PROJECT_ID"
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="YOUR_FIREBASE_STORAGE_BUCKET.appspot.com"
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="YOUR_FIREBASE_MESSAGING_SENDER_ID"
     NEXT_PUBLIC_FIREBASE_APP_ID="YOUR_FIREBASE_APP_ID"
     NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="YOUR_FIREBASE_MEASUREMENT_ID" # Optional

     # Google Generative AI (if you use Genkit with Google AI)
     GOOGLE_GENAI_API_KEY="YOUR_GOOGLE_GENAI_API_KEY_IF_NEEDED"
     
     # Application URL (used for constructing callback URLs for external services)
     NEXT_PUBLIC_APP_URL="http://localhost:9002" # Change if your local dev port is different
     ```
   - The application will display an error message if Supabase configuration is missing or incomplete.
5. Supabase Setup:
   - Ensure you have a Supabase project at [https://app.supabase.com/](https://app.supabase.com/).
   - In your Supabase project, navigate to "Authentication" -> "Providers" and ensure "Email" is enabled. You can configure other providers like Google here as well if you decide to add them later.
   - Set your Site URL and additional redirect URLs under "Authentication" -> "URL Configuration" in Supabase settings (e.g., `http://localhost:9002` for local dev).
   - The application reads Supabase configuration from the environment variables specified above.
6. Stripe Setup:
   - Ensure you have a Stripe account at [https://dashboard.stripe.com/](https://dashboard.stripe.com/).
   - Obtain your Publishable Key and Secret Key from the Stripe dashboard (Developers -> API keys).
   - Add these keys to your `.env.local` file as `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` and `STRIPE_SECRET_KEY`.
7. Run the development server: `npm run dev` or `yarn dev`.
8. Open `http://localhost:9002` (or the specified port) in your browser to see the landing page. Navigate to `/explore` to see the meal plans.

## Technology Stack
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- ShadCN UI Components
- Lucide Icons
- Supabase (Authentication)
- Stripe (Payment Processing)
- Genkit (for potential future GenAI features)
- `react-hook-form` (for forms)
- `use-toast` (for notifications)
- `uuid` (for generating unique IDs)

---

This README provides an overview of the proti application, its features, and how to get started. For more specific details on components or logic, please refer to the source code.
#   m e a l w e b  
 