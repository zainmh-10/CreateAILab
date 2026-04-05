import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';

import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata(
  'Admin | CreatorAILab',
  'Administration (database not connected).',
  '/admin'
);

export default async function AdminPage() {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string } | undefined)?.role;

  if (!userId || role !== 'admin') {
    return (
      <div className="card space-y-3">
        <h1 className="text-2xl font-bold">Admin access required</h1>
        <p className="text-slate-700">Sign in with an admin account configured in Clerk metadata.</p>
      </div>
    );
  }

  return (
    <div className="card max-w-2xl space-y-4">
      <h1 className="text-2xl font-bold">Admin</h1>
      <p className="text-slate-700">
        The database connection has been removed from this deployment. Tools, workflows, and comparisons are served from
        static catalogs in the codebase. There is nothing to manage here until a database is configured again.
      </p>
      <p className="text-sm text-slate-600">
        Authentication still uses Clerk. Newsletter sends no longer load recipients from a database; configure Resend
        audiences or another list provider if you need broadcast email.
      </p>
      <Link href="/" className="btn-secondary inline-flex">
        Back to site
      </Link>
    </div>
  );
}
