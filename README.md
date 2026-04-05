# CreatorAILab

An AI tools discovery and workflow platform for content creators and solopreneurs. Built with Next.js 14 (App Router), TypeScript, and Tailwind CSS. **Content is served from static catalogs and workflow definitions in the repo** (no database).

## Architecture Overview

```
src/
├── app/                   # Next.js App Router pages and API routes
│   ├── admin/             # Admin notice (Clerk-protected; no DB-backed CRUD)
│   ├── api/subscribe/     # Newsletter confirmation email (Resend)
│   ├── compare/[slug]/    # Tool comparison pages (no static comparisons yet)
│   ├── prompts/           # Copy-paste prompt library
│   ├── quiz/              # AI tool finder quiz
│   ├── tools/             # AI tools directory + detail pages
│   └── workflows/         # Step-by-step workflow tutorials
├── components/            # Shared React components
└── lib/                   # Business logic, data access, utilities
    ├── content.ts         # Tool/workflow fetchers (catalog + workflow guides)
    ├── content-types.ts   # Shared content model types
    ├── tool-catalog.ts    # Static tool data
    ├── tool-context.ts    # Rich context per tool (images, facts, sources)
    ├── workflow-guides.ts # Workflow guide definitions
    ├── prompt-templates.ts# Prompt templates (basic/intermediate/advanced)
    ├── rate-limit.ts      # Upstash Redis rate limiting
    ├── validators.ts      # Zod input validation schemas
    └── admin-audit.ts     # No-op (audit logging was DB-backed)
```

### Key Integrations

| Service | Purpose |
|---------|---------|
| **Clerk** | Authentication & admin access control |
| **Resend** | Transactional email (subscribe confirmation; bulk sends need an external list) |
| **Upstash Redis** | API rate limiting |
| **PostHog** | Product analytics |
| **Google Analytics** | Traffic analytics |
| **Vercel** | Deployment platform |

## Requirements

- Node.js 20+
- npm 10+

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env.local

# 3. Start dev server
npm run dev
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `CLERK_SECRET_KEY` | Yes | Clerk server-side secret key |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Yes | Clerk client-side publishable key |
| `RESEND_API_KEY` | No | Resend API key for email delivery |
| `NEXT_PUBLIC_POSTHOG_KEY` | No | PostHog project API key |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics measurement ID |
| `UPSTASH_REDIS_REST_URL` | No | Upstash Redis URL for rate limiting |
| `UPSTASH_REDIS_REST_TOKEN` | No | Upstash Redis token |
| `NEXT_PUBLIC_SITE_URL` | No | Public site URL (defaults to `http://localhost:3000`) |
| `ADMIN_AUDIT_DISABLED` | No | Set to `1` to silence admin audit no-ops |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript type checking |

## Modules

- **AI Tool Directory** — `/tools`, `/tools/[slug]` — curated tools with reviews, context, and affiliate links
- **Workflow Guides** — `/workflows`, `/workflows/[slug]` — step-by-step tutorials with video, checklists, and references
- **Prompt Library** — `/prompts` — prompts organized by workflow
- **Tool Finder Quiz** — `/quiz` — Interactive quiz with personalized tool stack recommendations
- **Comparison Pages** — `/compare/[slug]` — reserved for future static comparisons
- **Admin** — `/admin` — informational only without a database
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
2. Add environment variables from `.env.example` (no `DATABASE_URL` required)
3. Deploy using the included `vercel.json` config
4. Remove `DATABASE_URL` / `DIRECT_URL` from Vercel project settings if they were set for Supabase

## Developer Notes

- Tools and workflows come from `src/lib/tool-catalog.ts` and `src/lib/workflow-guides.ts`
- Weekly newsletter cron (`/api/newsletter/send`) returns success with `sent: 0` until you wire an audience (e.g. Resend) or reconnect a database
- Do not commit `.env` or `.env.local` files to source control
