import type { MetadataRoute } from 'next';

import { safeGetTools, safeGetWorkflows } from '@/lib/content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const [tools, workflows] = await Promise.all([safeGetTools(), safeGetWorkflows()]);

  const staticPaths = ['', '/tools', '/workflows', '/prompts', '/quiz'];
  const pages = staticPaths.map((path) => ({ url: `${siteUrl}${path}`, lastModified: new Date() }));

  const toolPages = tools.map((tool) => ({
    url: `${siteUrl}/tools/${tool.slug}`,
    lastModified: tool.updatedAt
  }));

  const workflowPages = workflows.map((workflow) => ({
    url: `${siteUrl}/workflows/${workflow.slug}`,
    lastModified: workflow.updatedAt
  }));

  return [...pages, ...toolPages, ...workflowPages];
}
