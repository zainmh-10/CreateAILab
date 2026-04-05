'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center">
      <h1 className="text-3xl font-bold text-slate-900">Something went wrong</h1>
      <p className="mt-3 text-slate-600">
        {error.digest
          ? 'An unexpected error occurred. Please try again.'
          : error.message || 'An unexpected error occurred.'}
      </p>
      <button type="button" onClick={reset} className="btn mt-6">
        Try again
      </button>
    </div>
  );
}
