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
};

type AuditRow = {
  id: number;
  created_at: string;
  user_id: string;
  action: string;
  entity: string;
  target_id: string | null;
  status: string;
  message: string | null;
  meta: unknown;
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
    limit: parseLimit(searchParams?.limit)
  };

  let logs: AuditRow[] = [];
  let tableMissing = false;

  try {
    const clauses: string[] = [];
    const values: unknown[] = [];

    if (filters.userId) {
      values.push(filters.userId);
      clauses.push(`user_id = $${values.length}`);
    }
    if (filters.entity) {
      values.push(filters.entity);
      clauses.push(`entity = $${values.length}`);
    }
    if (filters.action) {
      values.push(filters.action);
      clauses.push(`action = $${values.length}`);
    }
    if (filters.status) {
      values.push(filters.status);
      clauses.push(`status = $${values.length}`);
    }

    values.push(filters.limit);

    const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
    logs = await prisma.$queryRawUnsafe(
      `SELECT id, created_at, user_id, action, entity, target_id, status, message, meta
       FROM "AdminAuditLog"
       ${where}
       ORDER BY created_at DESC
       LIMIT $${values.length}`,
      ...values
    );
  } catch {
    tableMissing = true;
  }

  const distinctRows = !tableMissing
    ? await prisma.$queryRawUnsafe<Array<{ entity: string; action: string; status: string }>>(
        `SELECT DISTINCT entity, action, status FROM "AdminAuditLog" ORDER BY entity, action, status LIMIT 300`
      ).catch(() => [])
    : [];

  const entities = Array.from(new Set(distinctRows.map((row) => row.entity))).filter(Boolean);
  const actions = Array.from(new Set(distinctRows.map((row) => row.action))).filter(Boolean);
  const statuses = Array.from(new Set(distinctRows.map((row) => row.status))).filter(Boolean);

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

      <form className="card grid gap-3 md:grid-cols-3 lg:grid-cols-5">
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
          Audit table not found yet. Trigger any admin write action first to initialize logging.
        </div>
      ) : (
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
                <tr key={row.id} className="border-b border-slate-100 align-top">
                  <td className="py-2 pr-3">{new Date(row.created_at).toLocaleString()}</td>
                  <td className="py-2 pr-3 font-mono text-xs">{row.user_id}</td>
                  <td className="py-2 pr-3">{row.action}</td>
                  <td className="py-2 pr-3">{row.entity}</td>
                  <td className="py-2 pr-3 font-mono text-xs">{row.target_id ?? '-'}</td>
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
      )}
    </div>
  );
}
