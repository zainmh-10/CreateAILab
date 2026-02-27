import Link from 'next/link';
import Image from 'next/image';

import { safeGetTools } from '@/lib/content';
import { createMetadata } from '@/lib/metadata';
import { getToolContext } from '@/lib/tool-context';

export const metadata = createMetadata('Discover the Best AI Tools | CreatorAILab', 'Curated directory of the most powerful AI tools.', '/tools');

type ToolsSearchParams = {
  q?: string;
  category?: string;
};

const chips = ['all', 'writing', 'video', 'design', 'productivity', 'audio'];

function categoryForChip(chip: string) {
  if (chip === 'design') return 'image';
  if (chip === 'audio') return 'customer_support';
  return chip;
}

export default async function ToolsPage({ searchParams }: { searchParams?: ToolsSearchParams }) {
  const tools = await safeGetTools();
  const q = (searchParams?.q ?? '').toLowerCase();
  const chip = chips.includes((searchParams?.category ?? 'all').toLowerCase()) ? (searchParams?.category ?? 'all').toLowerCase() : 'all';

  const filtered = tools.filter((tool) => {
    const matchesQ = !q || [tool.name, tool.description, tool.bestFor ?? ''].join(' ').toLowerCase().includes(q);
    const matchesCat = chip === 'all' || tool.category === categoryForChip(chip);
    return matchesQ && matchesCat;
  });

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="text-center">
        <h1 className="text-6xl font-black tracking-tight text-slate-900">
          Discover the Best <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">AI Tools</span>
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-2xl text-slate-600">
          A curated directory of the most powerful artificial intelligence tools to help you create better content, faster.
        </p>
      </div>

      <form className="mx-auto mt-10 max-w-3xl space-y-6">
        <input
          name="q"
          defaultValue={searchParams?.q ?? ''}
          placeholder="Search tools by name, description, or feature..."
          className="w-full rounded-3xl border border-slate-200 bg-white px-6 py-4 text-lg shadow-sm outline-none focus:ring-2 focus:ring-indigo-300"
        />
        <div className="flex flex-wrap items-center justify-center gap-3">
          {chips.map((c) => (
            <button key={c} name="category" value={c} className={`chip ${chip === c ? 'active' : ''}`}>
              {c[0].toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>
      </form>

      <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((tool) => {
          const context = getToolContext(tool.slug);
          return (
          <article key={tool.id} className="card-soft overflow-hidden">
            <div className="relative h-48 w-full overflow-hidden">
              <Image src={context.heroImage} alt={context.imageAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
              <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700">
                {tool.category}
              </span>
            </div>
            <div className="space-y-3 p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-slate-900">{tool.name}</h2>
                <span className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-600">{tool.pricingType}</span>
              </div>
              <p className="text-lg text-slate-600">{tool.description}</p>
              <Link href={`/tools/${tool.slug}`} className="text-lg font-semibold text-indigo-600 hover:text-indigo-700">
                View tool →
              </Link>
            </div>
          </article>
          );
        })}
      </div>
    </section>
  );
}
