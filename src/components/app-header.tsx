// src/components/app-header.tsx
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useMealPlan } from '@/context/meal-plan-context';
import Image from 'next/image';


export default function AppHeader() {
  const { selectedMeals } = useMealPlan();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="https://iooutwzkflsjrsnclhap.supabase.co/storage/v1/object/public/image/ChatGPT%20Image%20Aug%2027,%202025,%2010_41_18%20PM.png" alt="proti logo" width={80} height={40} data-ai-hint="logo" className="dark:invert" />
        </Link>
        <nav className="flex items-center space-x-2">
           <Button asChild variant="ghost" size="sm">
            <Link href="/explore">
              <Search className="mr-2 h-4 w-4" />
              Explore Meals
            </Link>
          </Button>
          {isClient && selectedMeals.length > 0 && (
            <Button asChild variant="outline" size="sm">
              <Link href="/shopping-list">
                <ShoppingCart className="mr-2 h-4 w-4" />
                My List ({selectedMeals.length})
              </Link>
            </Button>
          )}
           {!isClient && ( 
            <Button variant="outline" size="sm" disabled>
              <ShoppingCart className="mr-2 h-4 w-4" />
              My List...
            </Button>
           )}
        </nav>
      </div>
    </header>
  );
}
