'use client';

import { useEffect } from 'react';

export function AnalyticsBootstrap() {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;

  useEffect(() => {
    if (!key) {
      return;
    }
    const posthogKey = key;

    let disposed = false;

    async function init() {
      const posthog = (await import('posthog-js')).default;
      if (disposed) {
        return;
      }

      posthog.init(posthogKey, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com',
        capture_pageview: true,
        capture_pageleave: true
      });

      (window as unknown as { posthog?: typeof posthog }).posthog = posthog;
    }

    init();

    return () => {
      disposed = true;
    };
  }, [key]);

  return null;
}
