'use client';

import { useState } from 'react';

import { EmailCapture } from '@/components/email-capture';
import { trackEvent } from '@/lib/analytics';

type PromptCardProps = {
  title: string;
  category: string;
  content: string;
  gated: boolean;
};

export function PromptCard({ title, category, content, gated }: PromptCardProps) {
  const [open, setOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  async function onCopy() {
    if (gated && !unlocked) {
      setOpen(true);
      return;
    }

    await navigator.clipboard.writeText(content);
    trackEvent('prompt_download', { title, category });
  }

  return (
    <article className="card space-y-2">
      <p className="text-xs uppercase tracking-wider text-slate-500">{category}</p>
      <h2 className="text-lg font-semibold">{title}</h2>
      <pre className="overflow-auto rounded-md bg-slate-50 p-3 text-xs text-slate-700">
        {gated && !unlocked ? 'Unlock via email to view this prompt.' : content}
      </pre>
      {!gated || unlocked ? (
        <button className="btn-secondary w-full" type="button" onClick={onCopy}>
          Copy Prompt
        </button>
      ) : (
        <button className="btn-secondary w-full" type="button" onClick={() => setOpen(true)}>
          Unlock Prompt
        </button>
      )}
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-4 shadow-xl">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Unlock this prompt</h3>
              <button className="btn-secondary" type="button" onClick={() => setOpen(false)}>
                Close
              </button>
            </div>
            <EmailCapture
              source={`prompt-${title}`}
              title="Enter your email to unlock this prompt"
              description="We will send this prompt and weekly creator workflow updates."
              buttonLabel="Unlock"
              compact
              onSuccess={() => {
                setUnlocked(true);
                setOpen(false);
              }}
            />
          </div>
        </div>
      ) : null}
    </article>
  );
}
