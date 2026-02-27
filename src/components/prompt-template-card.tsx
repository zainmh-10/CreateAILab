'use client';

import { useRef, useState } from 'react';

import { trackEvent } from '@/lib/analytics';
import type { PromptTemplate } from '@/lib/prompt-templates';

export function PromptTemplateCard({ prompt }: { prompt: PromptTemplate }) {
  const [copyState, setCopyState] = useState<'idle' | 'success' | 'error'>('idle');
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function fallbackCopy(text: string) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.setAttribute('readonly', '');
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '0';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textArea);
    return ok;
  }

  function showState(state: 'success' | 'error') {
    if (resetTimer.current) {
      clearTimeout(resetTimer.current);
    }
    setCopyState(state);
    resetTimer.current = setTimeout(() => setCopyState('idle'), 1500);
  }

  async function copyPrompt() {
    // Keep copy operation in direct click context for browser compatibility.
    let copiedOk = fallbackCopy(prompt.content);

    if (!copiedOk) {
      try {
        if (!navigator.clipboard?.writeText) {
          showState('error');
          return;
        }
        await navigator.clipboard.writeText(prompt.content);
        copiedOk = true;
      } catch {
        copiedOk = false;
      }
    }

    if (copiedOk) {
      showState('success');
      trackEvent('prompt_download', { title: prompt.title, level: prompt.level, workflow: prompt.workflow });
    } else {
      showState('error');
    }
  }

  return (
    <article className="card-soft flex h-full flex-col gap-3 p-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${prompt.level === 'Basic' ? 'bg-emerald-100 text-emerald-800' : prompt.level === 'Intermediate' ? 'bg-amber-100 text-amber-800' : 'bg-violet-100 text-violet-800'}`}>
          {prompt.level}
        </span>
        {prompt.free ? <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">Free</span> : null}
      </div>

      <h3 className="text-lg font-bold text-slate-900">{prompt.title}</h3>
      <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700">Best workflow: {prompt.workflow}</p>

      <pre className="mt-1 max-h-64 overflow-auto rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-6 text-slate-700">
        {prompt.content}
      </pre>

      <div className="mt-auto flex items-center justify-between gap-3">
        <button type="button" onClick={copyPrompt} className="rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-semibold text-white">
          Copy Prompt
        </button>
        {copyState === 'success' ? (
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600">
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M16.704 5.29a1 1 0 010 1.415l-7.25 7.25a1 1 0 01-1.415 0L3.296 9.21A1 1 0 114.71 7.796l4.037 4.036 6.543-6.542a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Copied
          </span>
        ) : null}
        {copyState === 'error' ? <span className="text-sm font-semibold text-rose-600">Copy failed</span> : null}
      </div>
    </article>
  );
}
