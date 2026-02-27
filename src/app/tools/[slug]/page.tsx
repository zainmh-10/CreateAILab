import { notFound } from 'next/navigation';
import Image from 'next/image';

import { AffiliateButton } from '@/components/affiliate-button';
import { EmailCapture } from '@/components/email-capture';
import { ToolPageView } from '@/components/tool-page-view';
import { safeGetToolBySlug } from '@/lib/content';
import { productSchema } from '@/lib/jsonld';
import { createMetadata } from '@/lib/metadata';
import { buildToolBlogSections, getToolContext } from '@/lib/tool-context';

export const revalidate = 300;

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Params }) {
  const tool = await safeGetToolBySlug(params.slug);
  if (!tool) {
    return createMetadata('Tool not found | CreatorAILab', 'Tool page missing.', `/tools/${params.slug}`);
  }

  return createMetadata(`${tool.name} Review | CreatorAILab`, tool.description, `/tools/${tool.slug}`);
}

export default async function ToolDetailPage({ params }: { params: Params }) {
  const tool = await safeGetToolBySlug(params.slug);

  if (!tool) {
    notFound();
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is ${tool.name} best for?`,
        acceptedAnswer: { '@type': 'Answer', text: tool.bestFor ?? tool.description }
      }
    ]
  };
  const product = productSchema({
    name: tool.name,
    description: tool.description,
    category: tool.category
  });
  const context = getToolContext(tool.slug);
  const blogSections = buildToolBlogSections(tool, context);

  return (
    <article className="mx-auto max-w-5xl space-y-6 px-6 py-12">
      <ToolPageView slug={tool.slug} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(product) }} />
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-wider text-slate-500">{tool.category}</p>
        <h1 className="text-3xl font-bold">{tool.name}</h1>
        <p className="text-slate-700">{tool.description}</p>
      </header>

      <div className="relative h-64 overflow-hidden rounded-2xl border border-slate-200">
        <Image src={context.heroImage} alt={context.imageAlt} fill className="object-cover" sizes="100vw" priority />
      </div>

      <section className="card space-y-3">
        <p className="text-sm text-slate-700">Pricing: {tool.pricingType} {tool.pricingDetails ? `- ${tool.pricingDetails}` : ''}</p>
        <p className="text-sm text-slate-700">Best for: {tool.bestFor ?? 'General creator workflows'}</p>
        <AffiliateButton href={tool.affiliateUrl} toolName={tool.name} />
      </section>

      <section className="card space-y-4">
        <h2 className="text-xl font-semibold text-slate-900">Research-backed context</h2>
        <ul className="list-disc space-y-2 pl-5 text-slate-700">
          {context.quickFacts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
        {context.sources.length > 0 ? (
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-800">Sources</p>
            <div className="flex flex-wrap gap-3 text-sm">
              {context.sources.map((source) => (
                <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="text-indigo-600 hover:text-indigo-700">
                  {source.label}
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </section>

      <section className="card space-y-6">
        <h2 className="text-xl font-semibold text-slate-900">Product blog playbook</h2>
        {blogSections.map((section) => (
          <article key={section.title} className="space-y-2">
            <h3 className="text-lg font-semibold text-slate-900">{section.title}</h3>
            <p className="text-slate-700">{section.body}</p>
          </article>
        ))}
      </section>

      <section className="card">
        <EmailCapture
          source={`tool:${tool.slug}`}
          title={`Get the ${tool.name} newsletter workflow`}
          description="Enter your email to receive a generated newsletter issue with execution ideas for every featured AI product."
          buttonLabel="Send me the newsletter"
        />
      </section>
    </article>
  );
}
