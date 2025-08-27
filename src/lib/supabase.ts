
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabase: ReturnType<typeof createClient<Database>> | null = null;
let supabaseInitializationError: string | null = null;

if (!supabaseUrl) {
  const errorMessage = 'Configuration Error: Supabase URL (NEXT_PUBLIC_SUPABASE_URL) is missing. Please set it in your environment configuration (e.g., .env.local).';
  console.error(errorMessage);
  supabaseInitializationError = errorMessage;
} else if (!supabaseAnonKey) {
  const errorMessage = 'Configuration Error: Supabase anonymous key (NEXT_PUBLIC_SUPABASE_ANON_KEY) is missing. Please set it in your environment configuration.';
  console.error(errorMessage);
  supabaseInitializationError = errorMessage;
} else {
  try {
    supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
    console.log("Supabase client initialized successfully.");
  } catch (error: any) {
    const errorMessage = `Error initializing Supabase client: ${error.message}`;
    console.error(errorMessage);
    supabaseInitializationError = errorMessage;
  }
}

export { supabase, supabaseInitializationError };
