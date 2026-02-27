import type { Comparison, Prompt, Tool, Workflow } from '@prisma/client';

import { getCatalogToolBySlug, popularToolsCatalog } from '@/lib/tool-catalog';
import { prisma } from '@/lib/prisma';

const hasDatabaseUrl = Boolean(process.env.DATABASE_URL);

export async function getTools() {
  return prisma.tool.findMany({ orderBy: { featured: 'desc' } });
}

export async function getToolBySlug(slug: string) {
  return prisma.tool.findUnique({ where: { slug } });
}

export async function getWorkflows() {
  return prisma.workflow.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function getWorkflowBySlug(slug: string) {
  return prisma.workflow.findUnique({ where: { slug }, include: { toolsUsed: true } });
}

export async function getPrompts() {
  return prisma.prompt.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function getComparisonBySlug(slug: string) {
  return prisma.comparison.findUnique({ where: { slug }, include: { tools: true } });
}

export async function getFeaturedTools(limit = 3): Promise<Tool[]> {
  return prisma.tool.findMany({ where: { featured: true }, take: limit });
}

export async function safeGetTools(): Promise<Tool[]> {
  if (!hasDatabaseUrl) {
    return popularToolsCatalog;
  }
  try {
    const dbTools = await getTools();
    const merged = [...dbTools, ...popularToolsCatalog];
    const deduped = new Map<string, Tool>();
    for (const tool of merged) {
      if (!deduped.has(tool.slug)) {
        deduped.set(tool.slug, tool);
      }
    }
    return Array.from(deduped.values());
  } catch {
    return popularToolsCatalog;
  }
}

export async function safeGetToolBySlug(slug: string): Promise<Tool | null> {
  if (!hasDatabaseUrl) {
    return getCatalogToolBySlug(slug);
  }
  try {
    return (await getToolBySlug(slug)) ?? getCatalogToolBySlug(slug);
  } catch {
    return getCatalogToolBySlug(slug);
  }
}

export async function safeGetWorkflows(): Promise<Workflow[]> {
  if (!hasDatabaseUrl) {
    return [];
  }
  try {
    return await getWorkflows();
  } catch {
    return [];
  }
}

export async function safeGetWorkflowBySlug(slug: string): Promise<(Workflow & { toolsUsed: Tool[] }) | null> {
  if (!hasDatabaseUrl) {
    return null;
  }
  try {
    return await getWorkflowBySlug(slug);
  } catch {
    return null;
  }
}

export async function safeGetPrompts(): Promise<Prompt[]> {
  if (!hasDatabaseUrl) {
    return [];
  }
  try {
    return await getPrompts();
  } catch {
    return [];
  }
}

export async function safeGetComparisonBySlug(slug: string): Promise<(Comparison & { tools: Tool[] }) | null> {
  if (!hasDatabaseUrl) {
    return null;
  }
  try {
    return await getComparisonBySlug(slug);
  } catch {
    return null;
  }
}
