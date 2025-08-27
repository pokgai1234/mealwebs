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
          <Image src="https://sdmntprnortheu.oaiusercontent.com/files/00000000-4100-61f4-9d90-73af96a1c27d/raw?se=2025-08-27T10%3A52%3A19Z&sp=r&sv=2024-08-04&sr=b&scid=c4f7f100-2bf3-5615-aed0-e9cfc8cdf561&skoid=0b778285-7b0b-4cdc-ac3b-fb93e8c3686f&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-08-27T00%3A00%3A03Z&ske=2025-08-28T00%3A00%3A03Z&sks=b&skv=2024-08-04&sig=mHZNgS5xWfpHm5bUM3mXQbo6EFTruaJyMicShFPZ6ug%3D" alt="proti logo" width={80} height={40} />
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
