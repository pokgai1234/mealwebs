
// src/app/page.tsx (New Landing Page)
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, ShoppingCart, Zap, UtensilsCrossed, Package, Car, Flame, Star } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-6 pb-12 md:pb-20">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div className="text-left">
            <div className="inline-flex items-center bg-muted px-3 py-1 rounded-full text-sm font-medium mb-4">
              <Flame className="w-4 h-4 text-primary mr-2" />
              EASY 150G+ PROTEIN 1 DAY
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
              Train harder, eat smarter.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl">
              We handle the groceries and delivery — you handle the gains. Plan high-protein meals, generate your shopping list, and streamline your grocery experience.
            </p>
            <div className="flex items-center gap-4">
              <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105">
                <Link href="/explore">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="hidden md:flex items-center justify-center gap-4">
            <div className="bg-gray-800 p-2 rounded-3xl shadow-2xl transform rotate-[-6deg]">
               <Image src="https://iooutwzkflsjrsnclhap.supabase.co/storage/v1/object/public/image/Screenshot%202025-08-23%20155841.png" alt="App Screenshot 1" width={300} height={600} quality={100} className="rounded-2xl" data-ai-hint="app screenshot"/>
            </div>
             <div className="bg-gray-800 p-2 rounded-3xl shadow-2xl transform rotate-[6deg] translate-y-8">
               <Image src="https://iooutwzkflsjrsnclhap.supabase.co/storage/v1/object/public/image/Screenshot%202025-08-23%20155932.png" alt="App Screenshot 2" width={300} height={600} quality={100} className="rounded-2xl" data-ai-hint="app nutrition"/>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Why proti?
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <div className="p-4 bg-primary/10 rounded-full mb-6">
                <Zap className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Curated Fitness Recipes</h3>
              <p className="text-muted-foreground">
                Browse diverse recipes designed for muscle gain. Detailed nutritional info, cooking times, and estimated prices to fit your lifestyle and goals.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <div className="p-4 bg-primary/10 rounded-full mb-6">
                <CheckCircle className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Effortless Meal Planning</h3>
              <p className="text-muted-foreground">
                Easily add meals to your plan. Our smart system generates a categorized shopping list, combining common seasonings and grouping ingredients by meal.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <div className="p-4 bg-primary/10 rounded-full mb-6">
                <ShoppingCart className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Shopping</h3>
              <p className="text-muted-foreground">
                From plan to plate, faster. Get your ingredients efficiently with our smart shopping list tools and automated Coles list creation.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            
            <div className="flex flex-col text-left p-6 bg-card rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
               <Image src="https://bettercheatmeals.com/wp-content/uploads/2024/05/spicy-chicken-snack-wrap-process-finished-2.jpg" alt="Choose your meal" width={600} height={400} className="rounded-lg mb-4 object-cover w-full h-56" data-ai-hint="meal selection app" />
              <h3 className="text-xl font-semibold mb-3 flex items-center"><UtensilsCrossed className="mr-2 text-primary"/>1. Choose Your Meal</h3>
              <p className="text-muted-foreground text-sm">
                Explore high-protein recipes with easy-to-follow video guides and full nutritional breakdowns.
              </p>
            </div>

            <div className="flex flex-col text-left p-6 bg-card rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
                <Image src="https://assets.bonappetit.com/photos/57f7d3ab47cc80db04653a91/master/pass/ba-basics-dont-have-time-to-cook-ingredients-grocery-shopping.jpg" alt="Ingredients from Woolworths" width={600} height={400} className="rounded-lg mb-4 object-cover w-full h-56" data-ai-hint="online grocery shopping" />
              <h3 className="text-xl font-semibold mb-3 flex items-center"><Package className="mr-2 text-primary"/>2. Instant Ingredients</h3>
              <p className="text-muted-foreground text-sm">
                Every ingredient is automatically added to your smart shopping list, saving you time and effort.
              </p>
            </div>

            <div className="flex flex-col text-left p-6 bg-card rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
                <Image src="https://insidefmcg.com.au/wp-content/uploads/2021/12/Coles-Online-delivery-to-boot-Large.jpg" alt="Direct to Boot pickup" width={600} height={400} className="rounded-lg mb-4 object-cover w-full h-56" data-ai-hint="car boot grocery" />
              <h3 className="text-xl font-semibold mb-3 flex items-center"><Car className="mr-2 text-primary"/>3. Direct to Boot Pickup</h3>
              <p className="text-muted-foreground text-sm">
                Skip the aisles entirely. Your groceries are packed and delivered straight to your car.
              </p>
            </div>

            <div className="flex flex-col text-left p-6 bg-card rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <Image src="https://image-cdn.essentiallysports.com/wp-content/uploads/photo_2022-10-23_14-18-19-e1669812229126.jpg?width=600" alt="Ready to cook" width={600} height={400} className="rounded-lg mb-4 object-cover w-full h-56" data-ai-hint="cooking home meal" />
              <h3 className="text-xl font-semibold mb-3 flex items-center"><Flame className="mr-2 text-primary"/>4. Ready to Cook</h3>
              <p className="text-muted-foreground text-sm">
                With all your ingredients ready, enjoy a fresh, high-protein meal in no time at all.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-20 bg-gradient-to-br from-accent/10 via-background to-primary/10 text-center">
         <div
          aria-hidden="true"
          className="absolute inset-0 w-full h-full"
        >
           <Image
            src="https://www.torrinomedica.it/wp-content/uploads/2024/10/healthy-meal-for-mediterranean-diet.jpg"
            alt="Vibrant food spread"
            layout="fill"
            objectFit="cover"
            quality={30}
            className="opacity-40 brightness-150"
            data-ai-hint="healthy meal mediterranean diet"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            Ready to Transform Your Meal Prep?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join proti today and take the hassle out of healthy eating. Your fitness journey deserves the best fuel.
          </p>
          <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105">
            <Link href="/explore">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
    