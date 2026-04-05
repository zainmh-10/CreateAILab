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

export async function logAdminAudit(input: AuditInput) {
  if (process.env.ADMIN_AUDIT_DISABLED === '1') {
    return;
  }

  try {
    await prisma.adminAuditLog.create({
      data: {
        userId: input.userId,
        action: input.action,
        entity: input.entity,
        targetId: input.targetId ?? null,
        status: input.status,
        message: input.message ?? null,
        meta: (input.meta ?? {}) as object
      }
    });
  } catch (error) {
    console.error('admin_audit_failed', error);
  }
}
