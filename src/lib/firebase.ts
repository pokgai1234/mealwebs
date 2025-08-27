// src/lib/firebase.ts
// This file is being kept for potential future use with other Firebase services,
// but it is not actively used for authentication or core data fetching.
// Supabase is handling the primary database operations.

import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp | undefined = undefined;
let firebaseError: string | null = null;

const essentialFirebaseKeys = [
  firebaseConfig.apiKey,
  firebaseConfig.projectId
].every(Boolean);

if (essentialFirebaseKeys) {
  if (!getApps().length) {
    try {
      app = initializeApp(firebaseConfig);
      console.log("Firebase app initialized for non-auth services (if any).");
    } catch (error: any) {
      console.error("Error initializing Firebase app:", error);
      firebaseError = `Error initializing Firebase: ${error.message}.`;
      app = undefined;
    }
  } else {
    app = getApps()[0];
  }
} else {
  const message = "Firebase configuration is incomplete. Firebase services other than Auth may not work.";
  console.warn(message);
  // We don't set a blocking error here, as the primary data source is Supabase.
  // firebaseError = message; 
}

// Export auth as null since it's handled by Supabase now.
const auth = null;

export { auth, firebaseError, app as firebaseApp };
