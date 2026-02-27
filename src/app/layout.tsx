import Script from 'next/script';
import type { Metadata } from 'next';

import './globals.css';

import { AnalyticsBootstrap } from '@/components/analytics-bootstrap';
import { ExitIntentPopup } from '@/components/exit-intent-popup';
import { Nav } from '@/components/nav';
import { SiteFooter } from '@/components/site-footer';

export const metadata: Metadata = {
  title: 'CreatorAILab',
  description: 'AI tools discovery and workflow platform for creators.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <body>
        {gaId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');`}
            </Script>
          </>
        ) : null}
        <AnalyticsBootstrap />
        <ExitIntentPopup />
        <Nav />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
