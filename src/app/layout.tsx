
import type {Metadata} from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { MealPlanProvider } from '@/context/meal-plan-context';
import { Toaster } from "@/components/ui/toaster";
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import type { ReactNode } from 'react';
import AppHeader from '@/components/app-header';
import Script from 'next/script';


const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'proti',
  description: 'Healthy meal plans and grocery ordering',
};


export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
       <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-5L5VK0643K"></Script>
        <Script id="google-tag-manager">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-5L5VK0643K');
          `}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans dark`}>
        <MealPlanProvider>
          <div className="flex flex-col min-h-screen">
            <AppHeader />
            <main className="flex-1">{children}</main>
            <footer className="mt-auto bg-secondary text-secondary-foreground">
              <Separator />
              <div className="container py-6 flex flex-col md:flex-row justify-between items-center text-sm">
                <p>&copy; {new Date().getFullYear()} proti. All rights reserved.</p>
                <nav className="flex gap-4 mt-4 md:mt-0">
                  <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
                  <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                </nav>
              </div>
            </footer>
            <Toaster />
          </div>
        </MealPlanProvider>
      </body>
    </html>
  );
}
