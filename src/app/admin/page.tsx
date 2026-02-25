import { PricingType, ToolCategory } from '@prisma/client';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';

import {
  createComparison,
  createPrompt,
  createTool,
  createWorkflow,
  deleteComparison,
  deletePrompt,
  deleteTool,
  deleteWorkflow,
  updateComparison,
  updatePrompt,
  updateTool,
  updateWorkflow
} from '@/app/admin/actions';
import { ConfirmSubmitButton } from '@/components/confirm-submit-button';
import { FormSubmitButton } from '@/components/form-submit-button';
import { createMetadata } from '@/lib/metadata';
import { prisma } from '@/lib/prisma';

export const metadata = createMetadata('Admin | CreatorAILab', 'Manage tools, workflows, prompts, and comparisons.', '/admin');

type AdminSearchParams = {
  status?: string;
  action?: string;
  message?: string;
};

function formatAction(action?: string) {
  return String(action ?? 'operation').replaceAll('_', ' ');
}

export default async function AdminPage({ searchParams }: { searchParams?: AdminSearchParams }) {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string } | undefined)?.role;

  if (!userId || role !== 'admin') {
    return (
      <div className="card space-y-3">
        <h1 className="text-2xl font-bold">Admin access required</h1>
        <p className="text-slate-700">Sign in with an admin account configured in Clerk metadata.</p>
      </div>
    );
  }

  const [tools, workflows, prompts, comparisons] = await Promise.all([
    prisma.tool.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.workflow.findMany({ orderBy: { createdAt: 'desc' }, include: { toolsUsed: true } }),
    prisma.prompt.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.comparison.findMany({ orderBy: { createdAt: 'desc' }, include: { tools: true } })
  ]);

  const status = searchParams?.status;
  const action = formatAction(searchParams?.action);
  const isSuccess = status === 'success';
  const isError = status === 'error';

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <p className="text-slate-700">Create, update, and delete tools, workflows, prompts, and comparisons.</p>
        <Link href="/admin/audit" className="btn-secondary inline-flex">
          View Audit Logs
        </Link>
      </header>

      {isSuccess ? (
        <div className="rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          Success: {action} completed.
        </div>
      ) : null}
      {isError ? (
        <div className="rounded-lg border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-900">
          Failed: {action}. {searchParams?.message ?? 'Please review inputs and retry.'}
        </div>
      ) : null}

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Tools</h2>
        <form action={createTool} className="card grid gap-3 md:grid-cols-2">
          <input name="name" placeholder="Tool name" className="rounded border border-slate-300 px-3 py-2 text-sm" required minLength={2} />
          <input name="slug" placeholder="tool-slug" className="rounded border border-slate-300 px-3 py-2 text-sm" required pattern="[a-z0-9-]+" />
          <input name="description" placeholder="Short description" className="rounded border border-slate-300 px-3 py-2 text-sm md:col-span-2" required minLength={10} />
          <select name="category" className="rounded border border-slate-300 px-3 py-2 text-sm" defaultValue={ToolCategory.writing}>
            {Object.values(ToolCategory).map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select name="pricingType" className="rounded border border-slate-300 px-3 py-2 text-sm" defaultValue={PricingType.freemium}>
            {Object.values(PricingType).map((pricingType) => (
              <option key={pricingType} value={pricingType}>{pricingType}</option>
            ))}
          </select>
          <input name="pricingDetails" placeholder="Pricing details" className="rounded border border-slate-300 px-3 py-2 text-sm" />
          <input name="bestFor" placeholder="Best for" className="rounded border border-slate-300 px-3 py-2 text-sm" />
          <input name="affiliateUrl" placeholder="https://affiliate.example.com" className="rounded border border-slate-300 px-3 py-2 text-sm md:col-span-2" required />
          <input name="pros" placeholder="Pros (comma separated)" className="rounded border border-slate-300 px-3 py-2 text-sm" />
          <input name="cons" placeholder="Cons (comma separated)" className="rounded border border-slate-300 px-3 py-2 text-sm" />
          <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" name="featured" /> Featured</label>
          <FormSubmitButton idleLabel="Create Tool" pendingLabel="Creating..." className="btn w-fit" />
        </form>

        <div className="grid gap-3">
          {tools.map((tool) => (
            <details key={tool.id} className="card" open>
              <summary className="cursor-pointer font-semibold">{tool.name} ({tool.slug})</summary>
              <form action={updateTool} className="mt-3 grid gap-2 md:grid-cols-2">
                <input type="hidden" name="id" value={tool.id} />
                <input name="name" defaultValue={tool.name} className="rounded border border-slate-300 px-3 py-2 text-sm" required minLength={2} />
                <input name="slug" defaultValue={tool.slug} className="rounded border border-slate-300 px-3 py-2 text-sm" required pattern="[a-z0-9-]+" />
                <input name="description" defaultValue={tool.description} className="rounded border border-slate-300 px-3 py-2 text-sm md:col-span-2" required minLength={10} />
                <select name="category" defaultValue={tool.category} className="rounded border border-slate-300 px-3 py-2 text-sm">
                  {Object.values(ToolCategory).map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <select name="pricingType" defaultValue={tool.pricingType} className="rounded border border-slate-300 px-3 py-2 text-sm">
                  {Object.values(PricingType).map((pricingType) => (
                    <option key={pricingType} value={pricingType}>{pricingType}</option>
                  ))}
                </select>
                <input name="pricingDetails" defaultValue={tool.pricingDetails ?? ''} className="rounded border border-slate-300 px-3 py-2 text-sm" />
                <input name="bestFor" defaultValue={tool.bestFor ?? ''} className="rounded border border-slate-300 px-3 py-2 text-sm" />
                <input name="affiliateUrl" defaultValue={tool.affiliateUrl} className="rounded border border-slate-300 px-3 py-2 text-sm md:col-span-2" required />
                <input name="pros" defaultValue={tool.pros.join(', ')} className="rounded border border-slate-300 px-3 py-2 text-sm" />
                <input name="cons" defaultValue={tool.cons.join(', ')} className="rounded border border-slate-300 px-3 py-2 text-sm" />
                <label className="flex items-center gap-2 text-sm font-medium">
                  <input type="checkbox" name="featured" defaultChecked={tool.featured} /> Featured
                </label>
                <FormSubmitButton idleLabel="Save" pendingLabel="Saving..." className="btn w-fit" />
              </form>
              <form action={deleteTool} className="mt-2">
                <input type="hidden" name="id" value={tool.id} />
                <ConfirmSubmitButton idleLabel="Delete" pendingLabel="Deleting..." confirmText={`Delete ${tool.name}?`} className="btn-secondary" />
              </form>
            </details>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Workflows</h2>
        <form action={createWorkflow} className="card grid gap-3 md:grid-cols-2">
          <input name="title" placeholder="Workflow title" className="rounded border border-slate-300 px-3 py-2 text-sm" required minLength={2} />
          <input name="slug" placeholder="workflow-slug" className="rounded border border-slate-300 px-3 py-2 text-sm" required pattern="[a-z0-9-]+" />
          <input name="summary" placeholder="Summary" className="rounded border border-slate-300 px-3 py-2 text-sm md:col-span-2" required minLength={10} />
          <textarea name="content" placeholder="Workflow content" className="rounded border border-slate-300 px-3 py-2 text-sm md:col-span-2" rows={4} required minLength={20} />
          <input name="featuredImage" placeholder="Featured image URL" className="rounded border border-slate-300 px-3 py-2 text-sm md:col-span-2" />
          <input name="toolSlugs" placeholder="Tool slugs (comma separated)" className="rounded border border-slate-300 px-3 py-2 text-sm md:col-span-2" />
          <FormSubmitButton idleLabel="Create Workflow" pendingLabel="Creating..." className="btn w-fit" />
        </form>

        <div className="grid gap-3">
          {workflows.map((workflow) => (
            <details key={workflow.id} className="card" open>
              <summary className="cursor-pointer font-semibold">{workflow.title} ({workflow.slug})</summary>
              <form action={updateWorkflow} className="mt-3 grid gap-2 md:grid-cols-2">
                <input type="hidden" name="id" value={workflow.id} />
                <input name="title" defaultValue={workflow.title} className="rounded border border-slate-300 px-3 py-2 text-sm" required minLength={2} />
                <input name="slug" defaultValue={workflow.slug} className="rounded border border-slate-300 px-3 py-2 text-sm" required pattern="[a-z0-9-]+" />
                <input name="summary" defaultValue={workflow.summary} className="rounded border border-slate-300 px-3 py-2 text-sm md:col-span-2" required minLength={10} />
                <textarea name="content" defaultValue={workflow.content} className="rounded border border-slate-300 px-3 py-2 text-sm md:col-span-2" rows={4} required minLength={20} />
                <input name="featuredImage" defaultValue={workflow.featuredImage ?? ''} className="rounded border border-slate-300 px-3 py-2 text-sm md:col-span-2" />
                <input
                  name="toolSlugs"
                  defaultValue={workflow.toolsUsed.map((tool) => tool.slug).join(', ')}
                  className="rounded border border-slate-300 px-3 py-2 text-sm md:col-span-2"
                />
                <FormSubmitButton idleLabel="Save" pendingLabel="Saving..." className="btn w-fit" />
              </form>
              <form action={deleteWorkflow} className="mt-2">
                <input type="hidden" name="id" value={workflow.id} />
                <ConfirmSubmitButton idleLabel="Delete" pendingLabel="Deleting..." confirmText={`Delete ${workflow.title}?`} className="btn-secondary" />
              </form>
            </details>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Prompts</h2>
        <form action={createPrompt} className="card grid gap-3 md:grid-cols-2">
          <input name="title" placeholder="Prompt title" className="rounded border border-slate-300 px-3 py-2 text-sm" required minLength={2} />
          <input name="category" placeholder="Category" className="rounded border border-slate-300 px-3 py-2 text-sm" required minLength={2} />
          <textarea name="content" placeholder="Prompt content" className="rounded border border-slate-300 px-3 py-2 text-sm md:col-span-2" rows={4} required minLength={10} />
          <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" name="gated" /> Gated</label>
          <FormSubmitButton idleLabel="Create Prompt" pendingLabel="Creating..." className="btn w-fit" />
        </form>

        <div className="grid gap-3">
          {prompts.map((prompt) => (
            <details key={prompt.id} className="card" open>
              <summary className="cursor-pointer font-semibold">{prompt.title} ({prompt.category})</summary>
              <form action={updatePrompt} className="mt-3 grid gap-2 md:grid-cols-2">
                <input type="hidden" name="id" value={prompt.id} />
                <input name="title" defaultValue={prompt.title} className="rounded border border-slate-300 px-3 py-2 text-sm" required minLength={2} />
                <input name="category" defaultValue={prompt.category} className="rounded border border-slate-300 px-3 py-2 text-sm" required minLength={2} />
                <textarea name="content" defaultValue={prompt.content} className="rounded border border-slate-300 px-3 py-2 text-sm md:col-span-2" rows={4} required minLength={10} />
                <label className="flex items-center gap-2 text-sm font-medium">
                  <input type="checkbox" name="gated" defaultChecked={prompt.gated} /> Gated
                </label>
                <FormSubmitButton idleLabel="Save" pendingLabel="Saving..." className="btn w-fit" />
              </form>
              <form action={deletePrompt} className="mt-2">
                <input type="hidden" name="id" value={prompt.id} />
                <ConfirmSubmitButton idleLabel="Delete" pendingLabel="Deleting..." confirmText={`Delete ${prompt.title}?`} className="btn-secondary" />
              </form>
            </details>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Comparisons</h2>
        <form action={createComparison} className="card grid gap-3 md:grid-cols-2">
          <input name="title" placeholder="Comparison title" className="rounded border border-slate-300 px-3 py-2 text-sm" required minLength={2} />
          <input name="slug" placeholder="comparison-slug" className="rounded border border-slate-300 px-3 py-2 text-sm" required pattern="[a-z0-9-]+" />
          <input name="verdict" placeholder="Verdict summary" className="rounded border border-slate-300 px-3 py-2 text-sm md:col-span-2" required minLength={10} />
          <textarea name="content" placeholder="Comparison content" className="rounded border border-slate-300 px-3 py-2 text-sm md:col-span-2" rows={4} required minLength={20} />
          <input name="toolSlugs" placeholder="Tool slugs (comma separated)" className="rounded border border-slate-300 px-3 py-2 text-sm md:col-span-2" />
          <FormSubmitButton idleLabel="Create Comparison" pendingLabel="Creating..." className="btn w-fit" />
        </form>

        <div className="grid gap-3">
          {comparisons.map((comparison) => (
            <details key={comparison.id} className="card" open>
              <summary className="cursor-pointer font-semibold">{comparison.title} ({comparison.slug})</summary>
              <form action={updateComparison} className="mt-3 grid gap-2 md:grid-cols-2">
                <input type="hidden" name="id" value={comparison.id} />
                <input name="title" defaultValue={comparison.title} className="rounded border border-slate-300 px-3 py-2 text-sm" required minLength={2} />
                <input name="slug" defaultValue={comparison.slug} className="rounded border border-slate-300 px-3 py-2 text-sm" required pattern="[a-z0-9-]+" />
                <input name="verdict" defaultValue={comparison.verdict} className="rounded border border-slate-300 px-3 py-2 text-sm md:col-span-2" required minLength={10} />
                <textarea name="content" defaultValue={comparison.content} className="rounded border border-slate-300 px-3 py-2 text-sm md:col-span-2" rows={4} required minLength={20} />
                <input
                  name="toolSlugs"
                  defaultValue={comparison.tools.map((tool) => tool.slug).join(', ')}
                  className="rounded border border-slate-300 px-3 py-2 text-sm md:col-span-2"
                />
                <FormSubmitButton idleLabel="Save" pendingLabel="Saving..." className="btn w-fit" />
              </form>
              <form action={deleteComparison} className="mt-2">
                <input type="hidden" name="id" value={comparison.id} />
                <ConfirmSubmitButton idleLabel="Delete" pendingLabel="Deleting..." confirmText={`Delete ${comparison.title}?`} className="btn-secondary" />
              </form>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
