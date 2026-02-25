# Admin Smoke Test Checklist

Run this after deployment to validate admin flows and production safety.

## Preconditions

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` are set in Vercel.
- Admin user has `metadata.role = "admin"` in Clerk.
- `DATABASE_URL` and `DIRECT_URL` are set.
- Baseline migration is present in repo and DB tables already exist.

## Core checks

1. Sign in as admin and open `/admin`.
2. Confirm non-admin user is blocked from `/admin`.
3. Create a tool with valid slug and affiliate URL.
4. Update the same tool name/description and save.
5. Delete the tool and confirm success banner.
6. Create a workflow linked to existing tool slugs.
7. Update workflow content and linked tools.
8. Delete workflow and confirm success banner.
9. Create a prompt with `gated=true`.
10. Update prompt content and set `gated=false`.
11. Delete prompt and confirm success banner.
12. Create a comparison linked to two tool slugs.
13. Update comparison verdict/content.
14. Delete comparison and confirm success banner.

## Public route checks

1. `/tools` filters still render and submit.
2. `/prompts` category filter works.
3. Gated prompt opens email unlock modal.
4. Exit-intent popup appears once per browser profile.
5. `/api/subscribe` accepts valid email and rejects invalid payload.

## Data checks

Run:

```bash
npm run db:check
```

Expected minimum counts:

- tools: `>= 10`
- workflows: `>= 3`
- prompts: `>= 15`
- comparisons: `>= 2`

## Build checks

Run:

```bash
npm run typecheck
npm run lint
npm run build
```

## Rollback notes

- If admin CRUD fails, disable writes by revoking admin role in Clerk.
- Restore content from DB backup/snapshot if destructive actions were executed.
