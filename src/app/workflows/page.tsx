import Link from 'next/link';

import { safeGetWorkflows } from '@/lib/content';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata('Workflow Guides | CreatorAILab', 'Step-by-step AI workflows for creators.', '/workflows');

export default async function WorkflowsPage() {
  const workflows = await safeGetWorkflows();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Workflow Guides</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {workflows.map((workflow) => (
          <article key={workflow.id} className="card space-y-2">
            <h2 className="text-xl font-semibold">{workflow.title}</h2>
            <p className="text-sm text-slate-700">{workflow.summary}</p>
            <Link href={`/workflows/${workflow.slug}`} className="btn-secondary w-full">
              Open Workflow
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
