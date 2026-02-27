import Link from 'next/link';

import { createMetadata } from '@/lib/metadata';
import { workflowGuides } from '@/lib/workflow-guides';

export const metadata = createMetadata('Workflow Guides | CreatorAILab', 'Actionable workflow guides for creators.', '/workflows');

export default function WorkflowsPage() {
  return (
    <section className="mx-auto max-w-6xl space-y-12 px-6 py-16">
      <header className="text-center">
        <h1 className="text-6xl font-black text-slate-900">
          Workflow <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">Tutorial Hub</span>
        </h1>
        <p className="mx-auto mt-5 max-w-4xl text-2xl text-slate-600">
          Follow step-by-step creator workflows with tool stacks, expected outcomes, and caption-enabled video tutorials.
        </p>
        <Link href="/workflows/video-sample" className="mt-5 inline-block text-base font-semibold text-indigo-600 hover:underline">
          View AI video sample preview →
        </Link>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {workflowGuides.map((guide) => (
          <article key={guide.slug} className="card-soft p-6">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{guide.level}</span>
            <h2 className="mt-4 text-3xl font-black text-slate-900">{guide.title}</h2>
            <p className="mt-3 text-lg text-slate-600">{guide.summary}</p>
            <p className="mt-6 border-t border-slate-200 pt-3 text-sm font-semibold text-slate-500">Estimated time: {guide.duration}</p>
            <Link href={`/workflows/${guide.slug}`} className="mt-4 inline-block text-lg font-semibold text-indigo-600 hover:text-indigo-700">
              Open full tutorial →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
