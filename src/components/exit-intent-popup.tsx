'use client';

import { useEffect, useState } from 'react';

import { EmailCapture } from '@/components/email-capture';

const STORAGE_KEY = 'creatorailab-exit-intent-shown';

export function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const alreadyShown = window.localStorage.getItem(STORAGE_KEY) === '1';
    if (alreadyShown) {
      return;
    }

    function onMouseLeave(event: MouseEvent) {
      if (event.clientY > 20) {
        return;
      }

      setVisible(true);
      window.localStorage.setItem(STORAGE_KEY, '1');
      document.removeEventListener('mouseleave', onMouseLeave);
    }

    document.addEventListener('mouseleave', onMouseLeave);
    return () => document.removeEventListener('mouseleave', onMouseLeave);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
      <div className="w-full max-w-xl space-y-3 rounded-2xl bg-white p-4 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Before you go</h2>
          <button className="btn-secondary" onClick={() => setVisible(false)} type="button">
            Close
          </button>
        </div>
        <EmailCapture
          source="exit-intent"
          title="Get creator AI playbooks in your inbox"
          description="Join the list for practical prompts and workflows every week."
          buttonLabel="Get Free Playbooks"
          compact
          onSuccess={() => setVisible(false)}
        />
      </div>
    </div>
  );
}
