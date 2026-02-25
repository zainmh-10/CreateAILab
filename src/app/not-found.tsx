import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="card space-y-3">
      <h1 className="text-2xl font-bold">Page not found</h1>
      <p className="text-slate-700">The page you are looking for does not exist.</p>
      <Link href="/" className="btn w-fit">
        Back home
      </Link>
    </div>
  );
}
