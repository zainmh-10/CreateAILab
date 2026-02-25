'use client';

import { useFormStatus } from 'react-dom';

export function ConfirmSubmitButton({
  idleLabel,
  pendingLabel,
  confirmText,
  className
}: {
  idleLabel: string;
  pendingLabel?: string;
  confirmText: string;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={className ?? 'btn-secondary'}
      disabled={pending}
      onClick={(event) => {
        if (!window.confirm(confirmText)) {
          event.preventDefault();
        }
      }}
    >
      {pending ? pendingLabel ?? 'Working...' : idleLabel}
    </button>
  );
}
