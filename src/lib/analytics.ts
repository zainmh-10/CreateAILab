export type AnalyticsEvent =
  | 'affiliate_click'
  | 'email_signup'
  | 'prompt_download'
  | 'quiz_completed'
  | 'tool_page_view';

type CaptureFn = (event: string, props?: Record<string, unknown>) => void;
type GtagFn = (command: 'event', event: string, params?: Record<string, unknown>) => void;

export function trackEvent(event: AnalyticsEvent, props: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') {
    return;
  }

  const posthog = (window as unknown as { posthog?: { capture: CaptureFn } }).posthog;
  if (posthog?.capture) {
    posthog.capture(event, props);
  }

  const gtag = (window as unknown as { gtag?: GtagFn }).gtag;
  if (typeof gtag === 'function') {
    gtag('event', event, props);
  }
}
