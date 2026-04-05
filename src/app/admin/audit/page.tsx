import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';

import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata(
  'Admin Audit | CreatorAILab',
  'Admin audit (database not connected).',
  '/admin/audit'
);

export default async function AdminAuditPage() {
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
      <h1 className="text-2xl font-bold">Audit log</h1>
      <p className="text-slate-700">
        Audit logging previously used a database table. With no database attached, admin actions are not persisted here.
      </p>
      <Link href="/admin" className="btn-secondary inline-flex">
        Back to admin
      </Link>
    </div>
  );
}
