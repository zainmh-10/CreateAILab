'use client';

import { useEffect } from 'react';

import { getFirebaseApp } from '@/lib/firebase';

/**
 * Initializes Firebase Analytics in the browser when Firebase env vars are set.
 * Safe to render even when Firebase is not configured (no-op).
 */
export function FirebaseBootstrap() {
  useEffect(() => {
    const app = getFirebaseApp();
    if (!app) {
      return;
    }

    let cancelled = false;

    void (async () => {
      const { getAnalytics, isSupported } = await import('firebase/analytics');
      if (cancelled) {
        return;
      }
      const supported = await isSupported();
      if (!supported || cancelled) {
        return;
      }
      getAnalytics(app);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
