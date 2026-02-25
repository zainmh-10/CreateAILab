'use client';

import { useFormStatus } from 'react-dom';

export function FormSubmitButton({
  idleLabel,
  pendingLabel,
  className
}: {
  idleLabel: string;
  pendingLabel?: string;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className={className ?? 'btn'} disabled={pending}>
      {pending ? pendingLabel ?? 'Saving...' : idleLabel}
    </button>
  );
}
