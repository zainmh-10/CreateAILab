import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center">
      <p className="text-6xl font-black text-slate-300">404</p>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-2 text-slate-600">The page you are looking for does not exist or has been moved.</p>
      <div className="mt-6 flex items-center justify-center gap-3">
        <Link href="/" className="btn">Back home</Link>
        <Link href="/tools" className="btn-secondary">Browse tools</Link>
      </div>
    </div>
  );
}
