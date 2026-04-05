-- CreateTable
CREATE TABLE IF NOT EXISTS "AdminAuditLog" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "target_id" TEXT,
    "status" TEXT NOT NULL,
    "message" TEXT,
    "meta" JSONB,

    CONSTRAINT "AdminAuditLog_pkey" PRIMARY KEY ("id")
);
