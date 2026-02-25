import { prisma } from '@/lib/prisma';

type AuditInput = {
  userId: string;
  action: string;
  entity: string;
  targetId?: string | null;
  status: 'success' | 'error';
  message?: string;
  meta?: Record<string, unknown>;
};

let auditTableReady = false;

async function ensureAuditTable() {
  if (auditTableReady) {
    return;
  }

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "AdminAuditLog" (
      id BIGSERIAL PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      user_id TEXT NOT NULL,
      action TEXT NOT NULL,
      entity TEXT NOT NULL,
      target_id TEXT,
      status TEXT NOT NULL,
      message TEXT,
      meta JSONB
    )
  `);

  auditTableReady = true;
}

export async function logAdminAudit(input: AuditInput) {
  if (process.env.ADMIN_AUDIT_DISABLED === '1') {
    return;
  }

  try {
    await ensureAuditTable();
    await prisma.$executeRawUnsafe(
      `INSERT INTO "AdminAuditLog" (user_id, action, entity, target_id, status, message, meta)
       VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb)`,
      input.userId,
      input.action,
      input.entity,
      input.targetId ?? null,
      input.status,
      input.message ?? null,
      JSON.stringify(input.meta ?? {})
    );
  } catch (error) {
    console.error('admin_audit_failed', error);
  }
}
