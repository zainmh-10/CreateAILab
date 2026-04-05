type AuditInput = {
  userId: string;
  action: string;
  entity: string;
  targetId?: string | null;
  status: 'success' | 'error';
  message?: string;
  meta?: Record<string, unknown>;
};

/** No-op: database-backed audit logging is disabled. */
export async function logAdminAudit(input: AuditInput) {
  void input;
  if (process.env.ADMIN_AUDIT_DISABLED === '1') {
    return;
  }
}
