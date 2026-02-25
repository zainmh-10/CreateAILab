'use client';

import { trackEvent } from '@/lib/analytics';

export function AffiliateButton({ href, toolName }: { href: string; toolName: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored noopener"
      className="btn"
      onClick={() => trackEvent('affiliate_click', { toolName, href })}
    >
      Try {toolName}
    </a>
  );
}
