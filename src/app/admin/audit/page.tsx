import Link from 'next/link';

import { auth } from '@clerk/nextjs/server';

import { createMetadata } from '@/lib/metadata';
import { prisma } from '@/lib/prisma';

export const metadata = createMetadata('Admin Audit | CreatorAILab', 'Review admin write audit logs.', '/admin/audit');

type AuditSearchParams = {
  userId?: string;
  entity?: string;
  action?: string;
  status?: string;
  limit?: string;
  cursor?: string;
};

function safeString(value?: string) {
  return String(value ?? '').trim();
}

function parseLimit(value?: string) {
  const n = Number(value);
  if (Number.isFinite(n) && n > 0 && n <= 200) {
    return Math.floor(n);
  }
  return 50;
}

export default async function AdminAuditPage({ searchParams }: { searchParams?: AuditSearchParams }) {
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

  const filters = {
    userId: safeString(searchParams?.userId),
    entity: safeString(searchParams?.entity),
    action: safeString(searchParams?.action),
    status: safeString(searchParams?.status),
    limit: parseLimit(searchParams?.limit),
    cursor: searchParams?.cursor ?? undefined
  };

  const where = {
    ...(filters.userId && { userId: filters.userId }),
    ...(filters.entity && { entity: filters.entity }),
    ...(filters.action && { action: filters.action }),
    ...(filters.status && { status: filters.status })
  };

  let logs: Awaited<ReturnType<typeof prisma.adminAuditLog.findMany>> = [];
  let tableMissing = false;
  let nextCursor: string | null = null;

  try {
    const result = await prisma.adminAuditLog.findMany({
      where: Object.keys(where).length ? where : undefined,
      orderBy: { createdAt: 'desc' },
      take: filters.limit + 1,
      ...(filters.cursor && { cursor: { id: BigInt(filters.cursor) }, skip: 1 })
    });

    if (result.length > filters.limit) {
      const last = result[filters.limit - 1];
      nextCursor = last ? String(last.id) : null;
      logs = result.slice(0, filters.limit);
    } else {
      logs = result;
    }
  } catch {
    tableMissing = true;
  }

  const distinctRows = !tableMissing
    ? await prisma.adminAuditLog
        .groupBy({
          by: ['entity', 'action', 'status']
        })
        .catch(() => [])
    : [];

  const entities = Array.from(new Set(distinctRows.map((row) => row.entity))).filter(Boolean);
  const actions = Array.from(new Set(distinctRows.map((row) => row.action))).filter(Boolean);
  const statuses = Array.from(new Set(distinctRows.map((row) => row.status))).filter(Boolean);

  const nextParams = new URLSearchParams();
  if (filters.userId) nextParams.set('userId', filters.userId);
  if (filters.entity) nextParams.set('entity', filters.entity);
  if (filters.action) nextParams.set('action', filters.action);
  if (filters.status) nextParams.set('status', filters.status);
  if (filters.limit !== 50) nextParams.set('limit', String(filters.limit));
  if (nextCursor) nextParams.set('cursor', nextCursor);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Audit Logs</h1>
          <p className="text-slate-700">Review all admin create/update/delete actions.</p>
        </div>
        <Link href="/admin" className="btn-secondary">
          Back to Admin
        </Link>
      </div>

      <form className="card grid gap-3 md:grid-cols-3 lg:grid-cols-6">
        <input name="userId" defaultValue={filters.userId} placeholder="User ID" className="rounded border border-slate-300 px-3 py-2 text-sm" />
        <select name="entity" defaultValue={filters.entity} className="rounded border border-slate-300 px-3 py-2 text-sm">
          <option value="">All entities</option>
          {entities.map((entity) => (
            <option key={entity} value={entity}>{entity}</option>
          ))}
        </select>
        <select name="action" defaultValue={filters.action} className="rounded border border-slate-300 px-3 py-2 text-sm">
          <option value="">All actions</option>
          {actions.map((action) => (
            <option key={action} value={action}>{action}</option>
          ))}
        </select>
        <select name="status" defaultValue={filters.status} className="rounded border border-slate-300 px-3 py-2 text-sm">
          <option value="">All statuses</option>
          {statuses.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        <input name="limit" defaultValue={String(filters.limit)} placeholder="Limit" className="rounded border border-slate-300 px-3 py-2 text-sm" />
        <button type="submit" className="btn w-fit">Apply</button>
      </form>

      {tableMissing ? (
        <div className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Audit table not found. Run <code className="rounded bg-amber-100 px-1">prisma migrate deploy</code> to create the AdminAuditLog table.
        </div>
      ) : (
        <>
          <div className="card overflow-auto">
            <table className="w-full min-w-[920px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-2 pr-3">Timestamp</th>
                  <th className="py-2 pr-3">User</th>
                  <th className="py-2 pr-3">Action</th>
                  <th className="py-2 pr-3">Entity</th>
                  <th className="py-2 pr-3">Target</th>
                  <th className="py-2 pr-3">Status</th>
                  <th className="py-2 pr-3">Message</th>
                  <th className="py-2 pr-3">Meta</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((row) => (
                  <tr key={String(row.id)} className="border-b border-slate-100 align-top">
                    <td className="py-2 pr-3">{row.createdAt.toLocaleString()}</td>
                    <td className="py-2 pr-3 font-mono text-xs">{row.userId}</td>
                    <td className="py-2 pr-3">{row.action}</td>
                    <td className="py-2 pr-3">{row.entity}</td>
                    <td className="py-2 pr-3 font-mono text-xs">{row.targetId ?? '-'}</td>
                    <td className="py-2 pr-3">{row.status}</td>
                    <td className="py-2 pr-3">{row.message ?? '-'}</td>
                    <td className="max-w-72 py-2 pr-3 text-xs">{row.meta ? JSON.stringify(row.meta) : '-'}</td>
                  </tr>
                ))}
                {logs.length === 0 ? (
                  <tr>
                    <td className="py-4 text-slate-600" colSpan={8}>No audit records match the current filters.</td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
          {nextCursor ? (
            <div className="flex justify-center">
              <Link
                href={`/admin/audit?${nextParams.toString()}`}
                className="btn-secondary"
              >
                Load more
              </Link>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
