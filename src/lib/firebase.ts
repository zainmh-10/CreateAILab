import { getApp, getApps, initializeApp, type FirebaseApp, type FirebaseOptions } from 'firebase/app';

function getFirebaseOptions(): FirebaseOptions | null {
  const {
    NEXT_PUBLIC_FIREBASE_API_KEY: apiKey,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: authDomain,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: projectId,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: storageBucket,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: messagingSenderId,
    NEXT_PUBLIC_FIREBASE_APP_ID: appId,
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: measurementId
  } = process.env;

  if (!apiKey || !authDomain || !projectId || !storageBucket || !messagingSenderId || !appId) {
    return null;
  }

  const options: FirebaseOptions = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId
  };

  if (measurementId) {
    options.measurementId = measurementId;
  }

  return options;
}

let cachedApp: FirebaseApp | null | undefined;

/**
 * Client-safe Firebase App singleton. Returns null when env is incomplete (e.g. local dev without Firebase).
 * Import only from client components or code that runs in the browser bundle.
 */
export function getFirebaseApp(): FirebaseApp | null {
  if (cachedApp !== undefined) {
    return cachedApp;
  }

  const options = getFirebaseOptions();
  if (!options) {
    cachedApp = null;
    return null;
  }

  cachedApp = getApps().length ? getApp() : initializeApp(options);
  return cachedApp;
}
