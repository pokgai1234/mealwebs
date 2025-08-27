// src/context/auth-context.tsx
'use client';

import type { ReactNode } from 'react';
import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase, supabaseInitializationError } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  authError: string | null; // This will hold persistent errors like Supabase init issues
  signUpWithEmail: (email: string, pass: string) => Promise<{ user: User | null; error: AuthError | null }>;
  signInWithEmail: (email: string, pass: string) => Promise<{ user: User | null; error: AuthError | null }>;
  signOutUser: () => Promise<{ error: AuthError | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(supabaseInitializationError);
  const { toast } = useToast();

  useEffect(() => {
    if (supabaseInitializationError) {
      setAuthError(supabaseInitializationError);
      setLoading(false);
      console.error("AuthProvider useEffect: Supabase client not initialized due to:", supabaseInitializationError);
      return;
    }
    if (!supabase) {
        const errMessage = "Supabase client is unexpectedly null in AuthProvider useEffect despite no init error.";
        setAuthError(errMessage);
        setLoading(false);
        console.error(errMessage);
        return;
    }

    console.log("AuthProvider: Setting up onAuthStateChange listener.");
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        console.log('Supabase onAuthStateChange event:', _event, 'Session:', session ? 'exists' : 'null');
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        // Clear runtime authError if Supabase becomes responsive and user signs in,
        // but preserve initial configuration errors.
        if (_event === 'SIGNED_IN' && authError && !supabaseInitializationError) {
            console.log("AuthProvider: Clearing runtime authError on SIGNED_IN.");
            setAuthError(null); 
        }
      }
    );
    
    // Initial session check
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
        console.log("AuthProvider: Initial getSession completed. Session:", initialSession ? 'exists' : 'null');
        if (!session) { // if onAuthStateChange hasn't fired yet or provided a session
          setSession(initialSession);
          setUser(initialSession?.user ?? null);
        }
        setLoading(false);
    }).catch(err => {
        console.error("AuthProvider: Error fetching initial session:", err);
        // Only set authError here if it's not already set by a critical init problem
        if (!authError) {
          setAuthError(`Error fetching initial session: ${err.message}`);
        }
        setLoading(false);
    });


    return () => {
      if (authListener?.unsubscribe) {
        console.log("AuthProvider: Unsubscribing from onAuthStateChange.");
        authListener.unsubscribe();
      }
    };
  }, []); // Ensure this runs only once

  const handleAuthOperation = async <TData extends { user?: User | null; session?: Session | null }>(
    operation: () => Promise<{ data: TData; error: AuthError | null } | { data: null; error: AuthError }>,
    operationName: string
  ): Promise<{ user: User | null; error: AuthError | null; data?: TData }> => {
    if (supabaseInitializationError) {
      const errorMessage = supabaseInitializationError;
      toast({ variant: "destructive", title: "Service Unavailable", description: errorMessage, duration: 10000 });
      console.error(`handleAuthOperation (${operationName}): Supabase client not initialized:`, supabaseInitializationError);
      return { user: null, error: { name: "InitializationError", message: errorMessage } as AuthError };
    }
    if (!supabase) {
      const errorMessage = "Authentication service is not available. Supabase client missing.";
      toast({ variant: "destructive", title: "Service Unavailable", description: errorMessage, duration: 10000 });
      console.error(`handleAuthOperation (${operationName}): Supabase client is null.`);
      return { user: null, error: { name: "ClientMissingError", message: errorMessage } as AuthError };
    }

    try {
      console.log(`Attempting ${operationName}...`);
      const { data, error } = await operation();

      if (error) {
        console.error(`${operationName} operation error:`, error.name, error.message, error.status);
        let description = `Operation failed: ${error.message}`;
        if (error.message.includes('Invalid login credentials')) {
          description = 'Invalid email or password. Please check your credentials and try again.';
        } else if (error.message.includes('User already registered')) {
            description = 'This email is already registered. Please try logging in.';
        } else if (error.message.includes('AuthApiError') && error.message.includes('Email rate limit exceeded')) {
            description = 'Too many attempts. Please try again later.';
        } else if (error.message.includes('To signup, please provide your email and password.')){
            description = 'Please provide both email and password to sign up.';
        }
        // Do NOT set global authError for operation-specific failures here
        toast({ variant: "destructive", title: `${operationName} Failed`, description, duration: 8000 });
        return { user: null, error, data: data || undefined };
      }

      console.log(`${operationName} successful. Data received.`);
      const resultUser = data?.user ?? null;
      
      // If an operation succeeds, clear any non-initialization runtime authError.
      if (authError && !supabaseInitializationError) {
        console.log("handleAuthOperation: Clearing runtime authError on successful operation.");
        setAuthError(null);
      }
      return { user: resultUser, error: null, data: data || undefined };
    } catch (error: any) {
      console.error(`Unexpected error during ${operationName}:`, error);
      // Do NOT set global authError for unexpected operation failures here
      toast({ variant: "destructive", title: `Unexpected ${operationName} Error`, description: error.message || "An unknown error occurred.", duration: 8000 });
      return { user: null, error: error as AuthError };
    }
  };

  const signUpWithEmail = async (email: string, pass: string) => {
    const emailStr = String(email);
    const passStr = String(pass);
    const { user, error, data } = await handleAuthOperation(
      () => supabase!.auth.signUp({ email: emailStr, password: passStr, options: {} }),
      'Sign Up'
    );
    return { user, error };
  };

  const signInWithEmail = async (email: string, pass: string) => {
    const emailStr = String(email);
    const passStr = String(pass);
    return handleAuthOperation(
      () => supabase!.auth.signInWithPassword({ email: emailStr, password: passStr }),
      'Sign In'
    );
  };

  const signOutUser = async () => {
    if (!supabase) {
      console.error("signOutUser: Supabase client not initialized.");
      const errMessage = supabaseInitializationError || "Supabase client is not available for sign out.";
      toast({ variant: "destructive", title: "Sign Out Failed", description: errMessage, duration: 8000});
      return { error: { name: "InitializationError", message: errMessage } as AuthError };
    }
    console.log("Attempting Sign Out...");
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error("Sign Out Failed:", error);
        toast({ variant: "destructive", title: "Sign Out Failed", description: error.message, duration: 8000});
    } else {
        console.log("Sign Out successful. User and session should be cleared by onAuthStateChange.");
        // User and session state will be updated by the onAuthStateChange listener
    }
    return { error };
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, authError, signUpWithEmail, signInWithEmail, signOutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
