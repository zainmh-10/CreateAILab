# CreatorAILab

An AI tools discovery and workflow platform for content creators and solopreneurs. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Prisma, and PostgreSQL.

## Architecture Overview

```
src/
├── app/                   # Next.js App Router pages and API routes
│   ├── admin/             # Admin CRUD panel (Clerk-protected)
│   ├── api/subscribe/     # Newsletter subscription API
│   ├── compare/[slug]/    # Tool comparison pages
│   ├── prompts/           # Copy-paste prompt library
│   ├── quiz/              # AI tool finder quiz
│   ├── tools/             # AI tools directory + detail pages
│   └── workflows/         # Step-by-step workflow tutorials
├── components/            # Shared React components
└── lib/                   # Business logic, data access, utilities
    ├── content.ts         # Safe data fetchers with fallbacks
    ├── prisma.ts          # Prisma client singleton
    ├── tool-catalog.ts    # Static tool data (20 tools)
    ├── tool-context.ts    # Rich context per tool (images, facts, sources)
    ├── workflow-guides.ts # 20 workflow guide definitions
    ├── prompt-templates.ts# 50 prompt templates (basic/intermediate/advanced)
    ├── rate-limit.ts      # Upstash Redis rate limiting
    ├── validators.ts      # Zod input validation schemas
    └── admin-audit.ts     # Admin action audit logging
```

### Key Integrations

| Service | Purpose |
|---------|---------|
| **Clerk** | Authentication & admin access control |
| **Prisma + PostgreSQL** | Database ORM and storage |
| **Resend** | Transactional email delivery |
| **Upstash Redis** | API rate limiting |
| **PostHog** | Product analytics |
| **Google Analytics** | Traffic analytics |
| **Vercel** | Deployment platform |

## Requirements

- Node.js 20+
- npm 10+
- PostgreSQL database (Supabase-compatible)

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env.local

# 3. Generate Prisma client and run migrations
npm run db:generate
npm run db:migrate

# 4. Seed demo data
npm run db:seed

# 5. Start dev server
npm run dev
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string (pooled) |
| `DIRECT_URL` | Yes | PostgreSQL direct connection (for Prisma migrations) |
| `CLERK_SECRET_KEY` | Yes | Clerk server-side secret key |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Yes | Clerk client-side publishable key |
| `RESEND_API_KEY` | No | Resend API key for email delivery |
| `NEXT_PUBLIC_POSTHOG_KEY` | No | PostHog project API key |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics measurement ID |
| `UPSTASH_REDIS_REST_URL` | No | Upstash Redis URL for rate limiting |
| `UPSTASH_REDIS_REST_TOKEN` | No | Upstash Redis token |
| `NEXT_PUBLIC_SITE_URL` | No | Public site URL (defaults to `http://localhost:3000`) |
| `ADMIN_AUDIT_DISABLED` | No | Set to `1` to disable admin audit logging |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript type checking |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:migrate` | Run migrations (dev) |
| `npm run db:deploy` | Apply migrations (production/CI) |
| `npm run db:seed` | Seed sample content |
| `npm run db:studio` | Open Prisma Studio |
| `npm run db:check` | Validate DB connectivity and seed counts |

## Modules

- **AI Tool Directory** — `/tools`, `/tools/[slug]` — 20 curated tools with reviews, context, and affiliate links
- **Workflow Guides** — `/workflows`, `/workflows/[slug]` — 20 step-by-step tutorials with video, checklists, and references
- **Prompt Library** — `/prompts` — 50 prompts (10 free basic, 20 intermediate, 20 advanced) organized by workflow
- **Tool Finder Quiz** — `/quiz` — Interactive quiz with personalized tool stack recommendations
- **Comparison Pages** — `/compare/[slug]` — Side-by-side tool comparisons (admin-created)
- **Admin Panel** — `/admin` — CRUD for tools, workflows, prompts, and comparisons with audit logging
- **SEO** — Metadata, OpenGraph/Twitter cards, JSON-LD structured data, sitemap, robots.txt

## Security

- Clerk authentication with admin role-based access control
- Zod input validation on all API endpoints
- Honeypot fields + timing checks for bot detection
- Upstash Redis rate limiting (IP + email)
- Security headers (HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)
- XSS-safe JSON-LD rendering
- Restricted image domains (no wildcard hostnames)
- Sanitized analytics script injection

## Deployment (Vercel)

1. Import repo into Vercel
2. Add all required environment variables from `.env.example`
3. Deploy using the included `vercel.json` config
4. Post-deploy, validate with `npm run db:check`

## Developer Notes

- The app gracefully degrades when `DATABASE_URL` is not set by falling back to the static tool catalog
- Admin audit logs are stored in a raw SQL table (`AdminAuditLog`) created on first write
- The baseline Prisma migration is at `prisma/migrations/20260225161000_baseline`
- Do not commit `.env` or `.env.local` files to source control
