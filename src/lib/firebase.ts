// src/lib/firebase.ts
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
// import { getAuth, type Auth } from 'firebase/auth'; // Firebase Auth is no longer primary

// Your web app's Firebase configuration is now read from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID, // Optional
};

let app: FirebaseApp | undefined = undefined;
// let auth: Auth | null = null; // Firebase Auth is no longer primary
let firebaseError: string | null = null;

// Check if Firebase is intended to be used for services other than Auth
const essentialFirebaseKeysForOtherServices = [
  firebaseConfig.apiKey,
  firebaseConfig.projectId
].every(Boolean);


if (essentialFirebaseKeysForOtherServices) {
  if (!getApps().length) {
    try {
      app = initializeApp(firebaseConfig);
      // auth = getAuth(app); // Firebase Auth is no longer primary
      console.log("Firebase app initialized for non-auth services (if any). Authentication is handled by Supabase.");
    } catch (error: any) {
      console.error("Error initializing Firebase app for non-auth services:", error);
      firebaseError = `Error initializing Firebase for non-auth services: ${error.message}.`;
      app = undefined;
    }
  } else {
    app = getApps()[0];
    // auth = getAuth(app); // Firebase Auth is no longer primary
  }
} else {
  firebaseError = `Firebase configuration is missing for non-auth services. If Firebase is not used for other services, this is expected. Authentication is handled by Supabase. Missing keys for other services: ${Object.entries(firebaseConfig).filter(([key,value]) => !value && (key === 'apiKey' || key === 'projectId')).map(([key])=> key).join(', ')}`;
  console.warn(firebaseError);
}

// Export auth as null or a non-functional placeholder if other parts of the app expect it
const auth = null;

export { auth, firebaseError, app as firebaseApp };
