'use client';

import { useEffect } from 'react';

import { trackEvent } from '@/lib/analytics';

export function ToolPageView({ slug }: { slug: string }) {
  useEffect(() => {
    trackEvent('tool_page_view', { slug });
  }, [slug]);

  return null;
}
