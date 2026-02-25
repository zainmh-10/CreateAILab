# CreatorAILab Execution Plan

## 1) Extracted Dependencies (from the 3 requirement files)

### Core framework and language
- `next@14`
- `react`
- `react-dom`
- `typescript`
- `@types/react`
- `@types/react-dom`
- `@types/node`

### Styling and UI
- `tailwindcss`
- `postcss`
- `autoprefixer`
- `shadcn/ui` setup
- `class-variance-authority`
- `clsx`
- `tailwind-merge`
- `lucide-react`

### Backend, DB, and auth
- `prisma`
- `@prisma/client`
- PostgreSQL (Supabase-hosted DB)
- `@clerk/nextjs` (email login only)

### Content and rendering
- `@next/mdx`
- `@mdx-js/loader`
- `@mdx-js/react`
- `gray-matter`
- `remark-gfm`
- `rehype-sanitize`

### Email, analytics, and tracking
- `resend` (or ConvertKit SDK; prefer Resend per file spec)
- `posthog-js`
- `posthog-node`
- `gtag` integration for GA4 (native script + helper module)

### Security and validation
- `zod`
- `@upstash/ratelimit`
- `@upstash/redis`
- `isomorphic-dompurify` (or strict MDX sanitization pipeline)

### SEO and platform
- `next-sitemap` (if not doing manual route handlers)
- Vercel deployment target

### Optional AI module (phase 1.5)
- `openai`

### Recommended dev tooling
- `eslint`
- `eslint-config-next`
- `prettier`
- `tsx` (for Prisma seed scripts)

## 2) Required Environment Variables
- `OPENAI_API_KEY`
- `RESEND_API_KEY`
- `DATABASE_URL`
- `NEXT_PUBLIC_POSTHOG_KEY`
- `NEXT_PUBLIC_SITE_URL`

## 3) 5-Agent Delegation

## Agent 1: Commands Agent
### Mission
Own all setup and repeatable command workflows so all other agents run against a consistent environment.

### Deliverables
- `package.json` scripts:
  - `dev`, `build`, `start`, `lint`, `typecheck`
  - `db:generate`, `db:migrate`, `db:seed`, `db:studio`
- `Makefile` or `justfile` with one-command bootstrap.
- `.env.example` populated with required keys.
- Initial CI command sequence (lint + typecheck + build).

### Command baseline
1. `npm install`
2. `npx prisma generate`
3. `npx prisma migrate dev -n init`
4. `npm run db:seed`
5. `npm run dev`

## Agent 2: Build Agent
### Mission
Implement the product features and architecture for MVP delivery on Next.js 14.

### Deliverables
- App Router structure for:
  - `/tools`, `/tools/[slug]`
  - `/workflows`, `/workflows/[slug]`
  - `/prompts`
  - `/compare/[slug]`
  - `/admin`
  - `/quiz` (optional modular)
- Prisma schema + seed data:
  - 10 tools, 3 workflows, 15 prompts, 2 comparisons
- API routes:
  - `POST /api/subscribe`
  - tracking endpoints if server events required
- Clerk auth and admin route protection.
- SEO metadata, JSON-LD, sitemap, robots.

### Handoffs
- Provides complete feature PR to Debugging Agent with test checklist.

## Agent 3: Debugging Agent
### Mission
Stabilize runtime, data, and API behavior; remove blockers before review.

### Deliverables
- Fix SSR/ISR issues, hydration mismatches, and route errors.
- Validate DB relations and Prisma query correctness.
- Verify:
  - affiliate click events fire
  - email capture stores + sends
  - MDX sanitization blocks unsafe content
  - API rate limits work
- Produce bug log with root cause and fix references.

### Exit criteria
- Zero blocking bugs on primary routes.
- Clean `npm run build` with no fatal errors.

## Agent 4: Review Agent
### Mission
Perform final engineering review for production readiness and success conditions.

### Deliverables
- Code review against:
  - modularity and folder structure
  - security requirements
  - analytics completeness
  - SEO compliance
  - Vercel deploy readiness
- Performance pass:
  - Lighthouse target > 90 on key pages
  - image optimization and caching checks
- Final go/no-go checklist signoff.

## Agent 5: Humanizer Agent
### Mission
Ensure UX copy, flow clarity, and conversion messaging are usable for non-technical creators.

### Deliverables
- Rewrite UI text for clarity and trust:
  - CTAs, empty states, onboarding blurbs, newsletter copy
- Improve prompt/workflow readability:
  - step formatting, scannability, beginner-friendly labels
- Tone consistency across pages.
- Microcopy for forms/errors/success states.

### Conversion focus
- Improve affiliate CTA clarity and email opt-in conversion without adding feature complexity.

## 4) Execution Sequence and Ownership
1. Commands Agent: environment + scripts + bootstrap.
2. Build Agent: implement core modules and API.
3. Debugging Agent: fix integration and runtime defects.
4. Review Agent: perform quality gate and release checks.
5. Humanizer Agent: finalize UX/copy polish before launch.

## 5) Definition of Done (from successconditions.txt.rtf)
- Deployable to Vercel immediately.
- Affiliate conversion tracking works.
- Email capture works end-to-end.
- SEO-friendly rendering is live.
- Architecture supports scaling to 10k+ monthly visitors.
