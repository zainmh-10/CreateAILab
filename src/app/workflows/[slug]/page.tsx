import { notFound } from 'next/navigation';

import { EmailCapture } from '@/components/email-capture';
import { safeGetWorkflowBySlug } from '@/lib/content';
import { articleSchema } from '@/lib/jsonld';
import { createMetadata } from '@/lib/metadata';

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Params }) {
  const workflow = await safeGetWorkflowBySlug(params.slug);
  if (!workflow) {
    return createMetadata('Workflow not found | CreatorAILab', 'Workflow page missing.', `/workflows/${params.slug}`);
  }

  return createMetadata(`${workflow.title} | CreatorAILab`, workflow.summary, `/workflows/${workflow.slug}`);
}

export default async function WorkflowPage({ params }: { params: Params }) {
  const workflow = await safeGetWorkflowBySlug(params.slug);

  if (!workflow) {
    notFound();
  }
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const article = articleSchema({
    title: workflow.title,
    description: workflow.summary,
    url: `${siteUrl}/workflows/${workflow.slug}`
  });

  return (
    <article className="space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      <header>
        <h1 className="text-3xl font-bold">{workflow.title}</h1>
        <p className="text-slate-700">{workflow.summary}</p>
      </header>

      <section className="card space-y-3">
        <h2 className="text-lg font-semibold">Steps</h2>
        <div className="prose max-w-none">
          <p>{workflow.content}</p>
        </div>
      </section>

      <section className="card">
        <h3 className="text-base font-semibold">Tools used</h3>
        <ul className="mt-2 list-disc pl-5 text-sm text-slate-700">
          {workflow.toolsUsed.map((tool) => (
            <li key={tool.id}>{tool.name}</li>
          ))}
        </ul>
      </section>

      <EmailCapture source={`workflow-${workflow.slug}`} />
    </article>
  );
}
