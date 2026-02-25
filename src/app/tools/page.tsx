import Link from 'next/link';

import { safeGetTools } from '@/lib/content';
import { createMetadata } from '@/lib/metadata';

export const revalidate = 300;

export const metadata = createMetadata('AI Tools Directory | CreatorAILab', 'Discover AI tools by category and pricing.', '/tools');

const categories = ['all', 'writing', 'video', 'image', 'automation', 'marketing', 'productivity', 'customer_support'] as const;
const pricingTypes = ['all', 'free', 'freemium', 'paid'] as const;
const sorts = ['featured', 'name'] as const;

type ToolsSearchParams = {
  category?: string;
  pricing?: string;
  sort?: string;
};

export default async function ToolsPage({ searchParams }: { searchParams?: ToolsSearchParams }) {
  const tools = await safeGetTools();
  const category = categories.includes((searchParams?.category ?? 'all') as (typeof categories)[number])
    ? (searchParams?.category ?? 'all')
    : 'all';
  const pricing = pricingTypes.includes((searchParams?.pricing ?? 'all') as (typeof pricingTypes)[number])
    ? (searchParams?.pricing ?? 'all')
    : 'all';
  const sort = sorts.includes((searchParams?.sort ?? 'featured') as (typeof sorts)[number])
    ? (searchParams?.sort ?? 'featured')
    : 'featured';

  const filtered = tools
    .filter((tool) => category === 'all' || tool.category === category)
    .filter((tool) => pricing === 'all' || tool.pricingType === pricing)
    .sort((a, b) => {
      if (sort === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (a.featured === b.featured) {
        return a.name.localeCompare(b.name);
      }
      return a.featured ? -1 : 1;
    });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">AI Tool Directory</h1>
        <p className="text-slate-700">Browse curated tools for creators and solopreneurs.</p>
      </div>

      <form className="card grid gap-3 md:grid-cols-3">
        <label className="text-sm font-medium">
          Category
          <select name="category" defaultValue={category} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm">
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium">
          Pricing
          <select name="pricing" defaultValue={pricing} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm">
            {pricingTypes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium">
          Sort
          <select name="sort" defaultValue={sort} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm">
            {sorts.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className="btn w-fit">
          Apply Filters
        </button>
      </form>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((tool) => (
          <article key={tool.id} className="card space-y-2">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-lg font-semibold">{tool.name}</h2>
              {tool.featured ? <span className="rounded bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-800">Featured</span> : null}
            </div>
            <p className="text-sm text-slate-700">{tool.description}</p>
            <p className="text-xs uppercase tracking-wider text-slate-500">{tool.category} · {tool.pricingType}</p>
            <Link href={`/tools/${tool.slug}`} className="btn-secondary w-full">
              View Details
            </Link>
          </article>
        ))}
        {filtered.length === 0 ? <p className="text-sm text-slate-600">No matching tools found.</p> : null}
      </div>
    </div>
  );
}
