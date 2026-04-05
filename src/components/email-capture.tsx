'use client';

import { FormEvent, useState } from 'react';

import { trackEvent } from '@/lib/analytics';

export function EmailCapture({
  source = 'global',
  title = 'Get the weekly AI news breakdown',
  description = 'Every Sunday at 8pm GMT, get the week in AI, the best tool to use right now, and a short tutorial to apply it.',
  buttonLabel = 'Join Free',
  compact = false,
  onSuccess
}: {
  source?: string;
  title?: string;
  description?: string;
  buttonLabel?: string;
  compact?: boolean;
  onSuccess?: () => void;
}) {
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [startedAt] = useState(() => Date.now());
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source, website, formStartedAt: startedAt })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? 'Unable to subscribe.');
      }

      setStatus('success');
      setMessage('You are in. Your weekly AI briefing will arrive every Sunday at 8pm GMT.');
      trackEvent('email_signup', { source });
      onSuccess?.();
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Request failed.');
    }
  }

  return (
    <form onSubmit={onSubmit} className={compact ? 'space-y-3' : 'card space-y-3'}>
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="text-sm text-slate-600">{description}</p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-accent focus:ring-2"
        />
        <button type="submit" className="btn" disabled={status === 'loading'}>
          {status === 'loading' ? 'Submitting...' : buttonLabel}
        </button>
      </div>
      <input
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={website}
        onChange={(event) => setWebsite(event.target.value)}
        className="hidden"
        name="website"
      />
      {message ? (
        <p
          className={`text-sm ${status === 'error' ? 'text-rose-600' : status === 'success' ? 'text-emerald-700' : 'text-slate-700'}`}
          role={status === 'error' ? 'alert' : 'status'}
          aria-live="polite"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
