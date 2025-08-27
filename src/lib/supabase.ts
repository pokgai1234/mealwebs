// src/lib/supabase.ts
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabaseInstance: SupabaseClient | null = null;
let supabaseInitializationError: string | null = null;

if (!supabaseUrl) {
  supabaseInitializationError = "Configuration Error: Supabase URL (NEXT_PUBLIC_SUPABASE_URL) is missing. Please set it in your environment configuration (e.g., .env.local).";
  console.error(supabaseInitializationError);
} else if (!supabaseAnonKey) {
  supabaseInitializationError = "Configuration Error: Supabase Anon Key (NEXT_PUBLIC_SUPABASE_ANON_KEY) is missing. Please set it in your environment configuration (e.g., .env.local).";
  console.error(supabaseInitializationError);
} else {
  try {
    // Attempt to validate the URL structure before passing to createClient
    // This gives more direct feedback if the format is the issue.
    new URL(supabaseUrl); // This will throw a TypeError if supabaseUrl is not a valid URL format

    // If new URL(supabaseUrl) did not throw, proceed to create the client
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
    // console.log("Supabase client initialized successfully."); // Optional: for verifying success
  } catch (error: any) {
    // Catch errors from either new URL(supabaseUrl) or createClient()
    if (error instanceof TypeError && error.message.toLowerCase().includes("invalid url")) {
      // Specific error for URL format issue from new URL() or potentially from createClient()
      supabaseInitializationError = `Configuration Error: The Supabase URL provided ("${supabaseUrl}") is not a valid URL format. It must include a scheme (e.g., "https://") and be correctly structured. Please check NEXT_PUBLIC_SUPABASE_URL in your environment file (e.g., .env.local).`;
    } else {
      // Generic error from createClient or other unexpected issues
      supabaseInitializationError = `Error initializing Supabase client: ${error.message}. Please check your NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment file (e.g., .env.local).`;
    }
    console.error(supabaseInitializationError);
  }
}

export const supabase = supabaseInstance;
export { supabaseInitializationError };
