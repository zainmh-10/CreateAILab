import { getCatalogToolBySlug, popularToolsCatalog } from '@/lib/tool-catalog';
import type { ComparisonWithTools, Prompt, Tool, Workflow, WorkflowWithTools } from '@/lib/content-types';
import { workflowGuides } from '@/lib/workflow-guides';

const catalogEpoch = new Date('2026-02-27T00:00:00.000Z');

function guidesToWorkflows(): Workflow[] {
  return workflowGuides.map((g) => ({
    id: `guide-${g.slug}`,
    title: g.title,
    slug: g.slug,
    summary: g.summary,
    content: g.steps.join('\n\n'),
    featuredImage: null,
    createdAt: catalogEpoch,
    updatedAt: catalogEpoch
  }));
}

export async function safeGetTools(): Promise<Tool[]> {
  return popularToolsCatalog;
}

export async function safeGetToolBySlug(slug: string): Promise<Tool | null> {
  return getCatalogToolBySlug(slug);
}

export async function safeGetWorkflows(): Promise<Workflow[]> {
  return guidesToWorkflows();
}

export async function safeGetWorkflowBySlug(slug: string): Promise<WorkflowWithTools | null> {
  const wf = guidesToWorkflows().find((w) => w.slug === slug);
  if (!wf) {
    return null;
  }
  return { ...wf, toolsUsed: [] };
}

export async function safeGetPrompts(): Promise<Prompt[]> {
  return [];
}

export async function safeGetComparisonBySlug(slug: string): Promise<ComparisonWithTools | null> {
  void slug;
  return null;
}
