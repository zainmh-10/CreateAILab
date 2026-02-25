'use client';

import { FormEvent, useState } from 'react';

import { trackEvent } from '@/lib/analytics';

export function EmailCapture({
  source = 'global',
  title = 'Get weekly creator AI workflows',
  description = 'Actionable guides, prompts, and tool picks for solopreneurs.',
  buttonLabel = 'Subscribe',
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
      setMessage('You are in. Check your inbox for welcome details.');
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
      {message ? <p className="text-sm text-slate-700">{message}</p> : null}
    </form>
  );
}
