import { notFound } from 'next/navigation';

import { AffiliateButton } from '@/components/affiliate-button';
import { safeGetComparisonBySlug } from '@/lib/content';
import { createMetadata } from '@/lib/metadata';

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Params }) {
  const comparison = await safeGetComparisonBySlug(params.slug);

  if (!comparison) {
    return createMetadata('Comparison not found | CreatorAILab', 'Comparison page missing.', `/compare/${params.slug}`);
  }

  return createMetadata(`${comparison.title} | CreatorAILab`, comparison.verdict, `/compare/${comparison.slug}`);
}

export default async function ComparisonPage({ params }: { params: Params }) {
  const comparison = await safeGetComparisonBySlug(params.slug);

  if (!comparison) {
    notFound();
  }

  return (
    <article className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">{comparison.title}</h1>
        <p className="text-slate-700">{comparison.verdict}</p>
      </header>

      <section className="card overflow-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="py-2">Tool</th>
              <th className="py-2">Category</th>
              <th className="py-2">Pricing</th>
              <th className="py-2">CTA</th>
            </tr>
          </thead>
          <tbody>
            {comparison.tools.map((tool) => (
              <tr key={tool.id} className="border-b border-slate-100">
                <td className="py-2 font-medium">{tool.name}</td>
                <td className="py-2">{tool.category}</td>
                <td className="py-2">{tool.pricingType}</td>
                <td className="py-2">
                  <AffiliateButton href={tool.affiliateUrl} toolName={tool.name} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </article>
  );
}
