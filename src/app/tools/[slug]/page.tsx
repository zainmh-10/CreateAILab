import { notFound } from 'next/navigation';

import { AffiliateButton } from '@/components/affiliate-button';
import { ToolPageView } from '@/components/tool-page-view';
import { safeGetToolBySlug } from '@/lib/content';
import { productSchema } from '@/lib/jsonld';
import { createMetadata } from '@/lib/metadata';

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

  return (
    <article className="space-y-6">
      <ToolPageView slug={tool.slug} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(product) }} />
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-wider text-slate-500">{tool.category}</p>
        <h1 className="text-3xl font-bold">{tool.name}</h1>
        <p className="text-slate-700">{tool.description}</p>
      </header>

      <section className="card space-y-3">
        <p className="text-sm text-slate-700">Pricing: {tool.pricingType} {tool.pricingDetails ? `- ${tool.pricingDetails}` : ''}</p>
        <p className="text-sm text-slate-700">Best for: {tool.bestFor ?? 'General creator workflows'}</p>
        <AffiliateButton href={tool.affiliateUrl} toolName={tool.name} />
      </section>
    </article>
  );
}
