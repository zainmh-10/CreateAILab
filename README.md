# CreatorAILab

CreatorAILab is a production-oriented MVP scaffold for an AI tools discovery and workflow platform built with Next.js 14 (App Router), TypeScript, TailwindCSS, Prisma, and PostgreSQL.

## Requirements

- Node.js 20+
- npm 10+
- PostgreSQL database (Supabase-compatible)

## Quick Start

1. Install dependencies:
```bash
npm install
```
2. Configure environment:
```bash
cp .env.example .env.local
```
3. Generate Prisma client and run migrations:
```bash
npm run db:generate
npm run db:migrate
```
4. Seed demo data:
```bash
npm run db:seed
```
5. Start dev server:
```bash
npm run dev
```

## Scripts

- `npm run dev` - start development server
- `npm run build` - production build
- `npm run start` - start production server
- `npm run lint` - ESLint
- `npm run typecheck` - TypeScript type checking
- `npm run db:generate` - Prisma client generation
- `npm run db:migrate` - Prisma migration (dev)
- `npm run db:deploy` - apply committed migrations (production/CI)
- `npm run db:seed` - seed sample content
- `npm run db:studio` - Prisma Studio
- `npm run db:check` - validate DB connectivity and minimum seed counts

## Implemented Modules

- AI Tool Directory (`/tools`, `/tools/[slug]`)
- Workflow Guides (`/workflows`, `/workflows/[slug]`)
- Prompt Library (`/prompts`)
- Comparison Pages (`/compare/[slug]`)
- Email Capture API (`POST /api/subscribe`)
- Lightweight Admin (`/admin`, protected by Clerk middleware intent)
- Quiz scaffold (`/quiz`)
- SEO: metadata, OpenGraph/Twitter cards, sitemap, robots

## Environment Variables

See `.env.example` for required variables:

- `OPENAI_API_KEY`
- `RESEND_API_KEY`
- `DATABASE_URL`
- `DIRECT_URL`
- `NEXT_PUBLIC_POSTHOG_KEY`
- `NEXT_PUBLIC_SITE_URL`
- `CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_GA_ID`

## Deployment (Vercel)

1. Import repo into Vercel.
2. Add all required environment variables from `.env.example` in Vercel project settings.
3. Set production values for:
   - `DATABASE_URL` (Supabase pooler URL)
   - `DIRECT_URL` (direct DB URL for Prisma operations)
   - Clerk keys (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`)
   - tracking keys (`NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_GA_ID`)
4. Deploy using the included [vercel.json](/Users/zain/Desktop/Dev/CreateAILab/vercel.json) config.
5. Post-deploy, run DB validation:
```bash
npm run db:check
```

## Smoke Test

- Run the admin and public route smoke checklist:
  - [ADMIN_SMOKE_TEST.md](/Users/zain/Desktop/Dev/CreateAILab/docs/ADMIN_SMOKE_TEST.md)

## Notes

- This repository was scaffolded offline due package registry network limits in the current environment.
- Run `npm install` once network access is available, then run the commands above.
- Baseline migration is committed at `prisma/migrations/20260225161000_baseline`.
- Do not commit real `.env` or `.env.local` secrets to source control.
