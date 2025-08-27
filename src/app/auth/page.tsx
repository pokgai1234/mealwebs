// src/app/auth/page.tsx
'use client';

import React, { useState, useEffect, type FormEvent } from 'react';
import { Lock, Mail, AlertTriangle, HomeIcon } from 'lucide-react';
import { useAuth } from '@/context/auth-context'; // Use Supabase Auth context
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { 
    signInWithEmail, 
    signUpWithEmail, 
    authError, // From Supabase context
    loading: authLoading, 
    user, 
    session, // From Supabase context
    initialFirebaseError // If Firebase was still used for other things
  } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const effectiveAuthError = authError || initialFirebaseError; // Consolidate errors

  useEffect(() => {
    if (effectiveAuthError && !authLoading && !user) { // Display persistent errors if not logged in
      toast({
        variant: "destructive",
        title: 'Authentication Service Error',
        description: effectiveAuthError,
        duration: 10000
      });
    }
  }, [effectiveAuthError, authLoading, user, toast]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (effectiveAuthError && !user) {
       toast({ variant: "destructive", title: 'Service Unavailable', description: `Cannot log in: ${effectiveAuthError}`, duration: 10000 });
       return;
    }
    setIsSubmitting(true);
    toast({ title: 'Signing in...', description: 'Please wait while we verify your credentials.', duration: 30000 });
    const { user: loggedInUser, error } = await signInWithEmail(email, password); // Supabase signIn
    setIsSubmitting(false);
    if (loggedInUser && !error) {
      toast({ title: 'Signed In Successfully!', description: 'Redirecting...', duration: 10000 });
      setTimeout(() => router.push('/explore'), 10000); // Redirect to meal exploration
    }
  };

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
     if (effectiveAuthError && !user) {
       toast({ variant: "destructive", title: 'Service Unavailable', description: `Cannot sign up: ${effectiveAuthError}`, duration: 10000 });
       return;
    }
    setIsSubmitting(true);
    toast({ title: 'Creating account...', description: 'Please wait while we set things up for you.', duration: 30000 });
    const { user: signedUpUser, error } = await signUpWithEmail(email, password); // Supabase signUp
    setIsSubmitting(false);

    if (error) {
        // Error already toasted by useAuth context's handleAuthOperation
        return;
    }

    if (signedUpUser) {
      if (session && session.user.id === signedUpUser.id) { 
         toast({ title: 'Account Created & Signed In!', description: 'Redirecting...', duration: 10000 });
         setTimeout(() => router.push('/explore'), 10000); // Redirect to meal exploration
      } else { 
         toast({ 
            title: 'Almost there! Confirm Your Email', 
            description: 'Please check your email for a confirmation link to complete your sign-up. This message will stay for 15 seconds.', 
            duration: 15000 
        });
      }
    }
  };


  if (authLoading && !isSubmitting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md shadow-xl rounded-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Loading Authentication...</CardTitle>
          </CardHeader>
           <CardContent className="flex justify-center py-6">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (effectiveAuthError && !isSubmitting && !user) { 
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md shadow-xl rounded-lg">
          <CardHeader className="text-center">
            <AlertTriangle className="mx-auto h-12 w-12 text-destructive mb-4" />
            <CardTitle className="text-2xl">Authentication Service Unavailable</CardTitle>
            <CardDescription className="text-muted-foreground px-4">
              {effectiveAuthError}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
             <p className="text-sm text-muted-foreground mb-4">
              Please ensure the authentication service is configured correctly by your administrator.
            </p>
            <Button asChild variant="outline">
              <Link href="/">Go to Homepage</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
      <Card className="w-full max-w-md shadow-2xl rounded-xl overflow-hidden">
        <CardHeader className="bg-card-foreground text-primary-foreground p-6">
          <CardTitle className="text-3xl text-center font-bold">proti</CardTitle>
          <CardDescription className="text-center text-primary-foreground/80 pt-1">
            Plan your meals, shop smart, eat healthy.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 md:p-8 bg-card">
          <form onSubmit={handleLogin}>
            <div className="mb-4 space-y-1">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" required />
              </div>
            </div>
            <div className="mb-6 space-y-1">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10" required />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button type="submit" className="w-full" disabled={isSubmitting || (!!effectiveAuthError && !user)}>
                {isSubmitting ? 'Processing...' : 'Sign In'}
              </Button>
              <Button type="button" variant="secondary" onClick={handleSignUp} className="w-full" disabled={isSubmitting || (!!effectiveAuthError && !user)}>
                Sign Up
              </Button>
            </div>
             <div className="mt-6 text-center border-t pt-4">
              <p className="text-sm text-muted-foreground">
                Just exploring? 
                <Link href="/" className="ml-1 text-primary hover:underline font-medium flex items-center justify-center">
                  <HomeIcon className="mr-1 h-4 w-4" /> Back to Home
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
