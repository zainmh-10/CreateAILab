'use client';

import { useState } from 'react';

type CopyablePromptProps = {
  content: string;
};

export function CopyablePrompt({ content }: CopyablePromptProps) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = content;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="relative">
      <pre className="overflow-auto rounded-lg border border-slate-200 bg-slate-50 p-4 pr-24 text-sm leading-relaxed text-slate-700">
        {content}
      </pre>
      <button
        type="button"
        onClick={onCopy}
        className="absolute right-3 top-3 rounded-md bg-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-300"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
}
