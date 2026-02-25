import Link from 'next/link';

import { EmailCapture } from '@/components/email-capture';
import { safeGetTools, safeGetWorkflows } from '@/lib/content';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata(
  'CreatorAILab | Discover AI Tools and Workflows',
  'Find practical AI tools, prompt libraries, and workflow guides to scale your creator business.',
  '/'
);

export default async function HomePage() {
  const [tools, workflows] = await Promise.all([safeGetTools(), safeGetWorkflows()]);

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">Creator Productivity Platform</p>
        <h1 className="max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
          Discover the right AI stack and deploy workflows that ship faster.
        </h1>
        <p className="max-w-2xl text-slate-700">
          CreatorAILab helps non-technical creators pick tools, use prompts, and execute proven workflows.
        </p>
        <div className="flex gap-3">
          <Link href="/tools" className="btn">
            Explore Tools
          </Link>
          <Link href="/workflows" className="btn-secondary">
            View Workflows
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="card">
          <h2 className="text-xl font-semibold">Featured Tools</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {tools.slice(0, 5).map((tool) => (
              <li key={tool.id}>
                <Link href={`/tools/${tool.slug}`} className="hover:underline">
                  {tool.name}
                </Link>
              </li>
            ))}
            {tools.length === 0 ? <li>No tools seeded yet.</li> : null}
          </ul>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold">Latest Workflows</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {workflows.slice(0, 5).map((workflow) => (
              <li key={workflow.id}>
                <Link href={`/workflows/${workflow.slug}`} className="hover:underline">
                  {workflow.title}
                </Link>
              </li>
            ))}
            {workflows.length === 0 ? <li>No workflows seeded yet.</li> : null}
          </ul>
        </div>
      </section>

      <EmailCapture source="homepage" />
    </div>
  );
}
