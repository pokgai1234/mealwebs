
# proti - Healthy Meal Planning & Grocery Ordering

proti is a web application designed to help users, especially those focused on fitness, plan their meals efficiently. It allows users to explore various recipes tailored for fitness goals (primarily focused on bulking/muscle gain), add them to a personalized plan, generate a shopping list, and simulate a grocery order process. The application uses a local data store for recipes and Stripe for a simulated service fee payment. It also integrates with an external service to automate Coles shopping list creation.

## Project Aim

The primary goal of proti is to simplify healthy meal planning and grocery shopping by:
- Providing a curated list of fitness-oriented recipes with detailed nutritional information and video guides.
- Allowing users to easily create custom meal plans from a dedicated `/explore` page.
- Automatically generating a shopping list from selected meals, with main ingredients grouped by meal and common seasonings combined into a single list.
- Offering a streamlined (simulated) grocery ordering experience, including an order summary and a service fee payment step.
- **Automated Coles Shopping List**: After order placement, the system attempts to create a shopping list on Coles Online via an external service and provides a link.
- Featuring an engaging landing page to introduce users to the app's benefits.

## Key Features

- **Engaging Landing Page:**
    - Introduces new users to proti's features and benefits.
    - "Get Started" button directs users to the meal exploration page.
- **Recipe Browsing (`/explore`):**
    - Explore a diverse range of recipes focused on muscle gain from local app data.
- **Detailed Meal Information:**
    - View comprehensive details for each meal, including:
        - Name and Description
        - Image (with AI hint for future dynamic generation)
        - YouTube video guide for cooking (where available).
        - Macronutrient information (Calories, Protein)
        - List of main ingredients and seasonings/condiments with quantities (categorized).
        - Step-by-step cooking instructions.
        - Estimated cooking time
        - Estimated price
- **Meal Planning:**
    - Add desired meals to a personal meal plan.
    - Remove meals from the plan.
- **Shopping List Management:**
    - Automatically generated shopping list based on selected meals, with main ingredients grouped by meal and common seasonings combined into a single list.
    - Ability to check/uncheck items on the list.
    - Add custom "extra" items to the shopping list.
    - Remove items from the shopping list.
    - Quick-add common household items.
- **Simulated Order Process:**
    - **Order Summary Page:** Before payment, users review a summary of all checked items from their shopping list.
    - **Service Fee Payment (Stripe Integration):** A $1.95 AUD service fee is required before proceeding to order details, processed via Stripe Checkout.
    - Select preferred grocery store (Coles, Woolworths, or Both).
    - Choose delivery time (Today ASAP or Tomorrow).
    - Enter delivery address.
    - "Place order" functionality leading to an order completion page.
- **Order Completion:**
    - Displays a loading animation while attempting to create an automated Coles shopping list.
    - Provides a link to the generated Coles shopping list if successful.
    - Provides placeholders for a cooking guide.
    - Option to start a new plan (redirects to `/explore`), resetting current selections.
- **User Experience:**
    - Responsive design for various screen sizes.
    - Toast notifications for actions and feedback.
    - Clean, modern UI using ShadCN components and Tailwind CSS.
- **Content & Legal:**
    - Static pages for Terms of Service and Privacy Policy.

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
     # Stripe Configuration
     NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="YOUR_STRIPE_PUBLISHABLE_KEY"
     STRIPE_SECRET_KEY="YOUR_STRIPE_SECRET_KEY" # For server-side operations
     STRIPE_WEBHOOK_SECRET="YOUR_STRIPE_WEBHOOK_SECRET" # For webhook verification (optional for this prototype)
     
     # Google Generative AI (if you use Genkit with Google AI)
     GOOGLE_GENAI_API_KEY="YOUR_GOOGLE_GENAI_API_KEY_IF_NEEDED"
     
     # Application URL (used for constructing callback URLs for external services)
     NEXT_PUBLIC_APP_URL="http://localhost:9002" # Change if your local dev port is different
     ```
5. Stripe Setup:
   - Ensure you have a Stripe account at [https://dashboard.stripe.com/](https://dashboard.stripe.com/).
   - Obtain your Publishable Key and Secret Key from the Stripe dashboard (Developers -> API keys).
   - Add these keys to your `.env.local` file as `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` and `STRIPE_SECRET_KEY`.
6. Run the development server: `npm run dev` or `yarn dev`.
7. Open `http://localhost:9002` (or the specified port) in your browser to see the landing page. Navigate to `/explore` to see the meal plans.

## Technology Stack
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- ShadCN UI Components
- Lucide Icons
- Stripe (Payment Processing)
- Genkit (for potential future GenAI features)
- `react-hook-form` (for forms)
- `use-toast` (for notifications)
- `uuid` (for generating unique IDs)

---

This README provides an overview of the proti application, its features, and how to get started. For more specific details on components or logic, please refer to the source code.
