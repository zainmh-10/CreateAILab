'use server';

import { PricingType, ToolCategory } from '@prisma/client';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { logAdminAudit } from '@/lib/admin-audit';
import { prisma } from '@/lib/prisma';

async function requireAdmin() {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string } | undefined)?.role;
  if (!userId || role !== 'admin') {
    throw new Error('Unauthorized');
  }
  return { userId };
}

function splitList(value: FormDataEntryValue | null) {
  return String(value ?? '')
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean);
}

function getToolCategory(value: FormDataEntryValue | null): ToolCategory {
  const candidate = String(value ?? 'writing');
  if (Object.values(ToolCategory).includes(candidate as ToolCategory)) {
    return candidate as ToolCategory;
  }
  return ToolCategory.writing;
}

function getPricingType(value: FormDataEntryValue | null): PricingType {
  const candidate = String(value ?? 'freemium');
  if (Object.values(PricingType).includes(candidate as PricingType)) {
    return candidate as PricingType;
  }
  return PricingType.freemium;
}

function revalidateAdminPaths(slug?: string) {
  revalidatePath('/admin');
  revalidatePath('/tools');
  revalidatePath('/workflows');
  revalidatePath('/prompts');
  if (slug) {
    revalidatePath(`/tools/${slug}`);
    revalidatePath(`/workflows/${slug}`);
    revalidatePath(`/compare/${slug}`);
  }
}

function bounce(action: string, status: 'success' | 'error', message?: string): never {
  const params = new URLSearchParams({ status, action });
  if (message) {
    params.set('message', message);
  }
  redirect(`/admin?${params.toString()}`);
}

function errorMessage(error: unknown) {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return 'Request failed';
}

function isRedirectError(error: unknown) {
  return typeof error === 'object' && error !== null && 'digest' in error && String((error as { digest?: string }).digest ?? '').startsWith('NEXT_REDIRECT');
}

async function auditSuccess(userId: string, action: string, entity: string, targetId?: string, meta?: Record<string, unknown>) {
  await logAdminAudit({ userId, action, entity, targetId, status: 'success', meta });
}

async function auditError(userId: string | undefined, action: string, entity: string, error: unknown, targetId?: string) {
  if (!userId) return;
  await logAdminAudit({ userId, action, entity, targetId, status: 'error', message: errorMessage(error) });
}

export async function createTool(formData: FormData) {
  let userId: string | undefined;
  try {
    const authInfo = await requireAdmin();
    userId = authInfo.userId;

    const slug = String(formData.get('slug') ?? '').trim();
    const created = await prisma.tool.create({
      data: {
        name: String(formData.get('name') ?? '').trim(),
        slug,
        description: String(formData.get('description') ?? '').trim(),
        category: getToolCategory(formData.get('category')),
        pricingType: getPricingType(formData.get('pricingType')),
        pricingDetails: String(formData.get('pricingDetails') ?? '').trim() || null,
        pros: splitList(formData.get('pros')),
        cons: splitList(formData.get('cons')),
        bestFor: String(formData.get('bestFor') ?? '').trim() || null,
        affiliateUrl: String(formData.get('affiliateUrl') ?? '').trim(),
        featured: formData.get('featured') === 'on'
      }
    });

    await auditSuccess(userId, 'create', 'tool', created.id, { slug: created.slug });
    revalidateAdminPaths(slug);
    bounce('create_tool', 'success');
  } catch (error) {
    if (isRedirectError(error)) throw error;
    await auditError(userId, 'create', 'tool', error);
    bounce('create_tool', 'error', errorMessage(error));
  }
}

export async function deleteTool(formData: FormData) {
  let userId: string | undefined;
  const id = String(formData.get('id') ?? '');
  try {
    const authInfo = await requireAdmin();
    userId = authInfo.userId;
    if (!id) throw new Error('Missing tool id');

    await prisma.tool.delete({ where: { id } });
    await auditSuccess(userId, 'delete', 'tool', id);
    revalidateAdminPaths();
    bounce('delete_tool', 'success');
  } catch (error) {
    if (isRedirectError(error)) throw error;
    await auditError(userId, 'delete', 'tool', error, id);
    bounce('delete_tool', 'error', errorMessage(error));
  }
}

export async function updateTool(formData: FormData) {
  let userId: string | undefined;
  const id = String(formData.get('id') ?? '');
  try {
    const authInfo = await requireAdmin();
    userId = authInfo.userId;
    if (!id) throw new Error('Missing tool id');

    const slug = String(formData.get('slug') ?? '').trim();

    await prisma.tool.update({
      where: { id },
      data: {
        name: String(formData.get('name') ?? '').trim(),
        slug,
        description: String(formData.get('description') ?? '').trim(),
        category: getToolCategory(formData.get('category')),
        pricingType: getPricingType(formData.get('pricingType')),
        pricingDetails: String(formData.get('pricingDetails') ?? '').trim() || null,
        pros: splitList(formData.get('pros')),
        cons: splitList(formData.get('cons')),
        bestFor: String(formData.get('bestFor') ?? '').trim() || null,
        affiliateUrl: String(formData.get('affiliateUrl') ?? '').trim(),
        featured: formData.get('featured') === 'on'
      }
    });

    await auditSuccess(userId, 'update', 'tool', id, { slug });
    revalidateAdminPaths(slug);
    bounce('update_tool', 'success');
  } catch (error) {
    if (isRedirectError(error)) throw error;
    await auditError(userId, 'update', 'tool', error, id);
    bounce('update_tool', 'error', errorMessage(error));
  }
}

export async function createWorkflow(formData: FormData) {
  let userId: string | undefined;
  try {
    const authInfo = await requireAdmin();
    userId = authInfo.userId;

    const slug = String(formData.get('slug') ?? '').trim();
    const toolSlugs = splitList(formData.get('toolSlugs'));
    const tools = await prisma.tool.findMany({ where: { slug: { in: toolSlugs } }, select: { id: true } });

    const created = await prisma.workflow.create({
      data: {
        title: String(formData.get('title') ?? '').trim(),
        slug,
        summary: String(formData.get('summary') ?? '').trim(),
        content: String(formData.get('content') ?? '').trim(),
        featuredImage: String(formData.get('featuredImage') ?? '').trim() || null,
        toolsUsed: { connect: tools }
      }
    });

    await auditSuccess(userId, 'create', 'workflow', created.id, { slug: created.slug });
    revalidateAdminPaths(slug);
    bounce('create_workflow', 'success');
  } catch (error) {
    if (isRedirectError(error)) throw error;
    await auditError(userId, 'create', 'workflow', error);
    bounce('create_workflow', 'error', errorMessage(error));
  }
}

export async function deleteWorkflow(formData: FormData) {
  let userId: string | undefined;
  const id = String(formData.get('id') ?? '');
  try {
    const authInfo = await requireAdmin();
    userId = authInfo.userId;

    if (!id) throw new Error('Missing workflow id');

    await prisma.workflow.delete({ where: { id } });
    await auditSuccess(userId, 'delete', 'workflow', id);
    revalidateAdminPaths();
    bounce('delete_workflow', 'success');
  } catch (error) {
    if (isRedirectError(error)) throw error;
    await auditError(userId, 'delete', 'workflow', error, id);
    bounce('delete_workflow', 'error', errorMessage(error));
  }
}

export async function updateWorkflow(formData: FormData) {
  let userId: string | undefined;
  const id = String(formData.get('id') ?? '');
  try {
    const authInfo = await requireAdmin();
    userId = authInfo.userId;

    if (!id) throw new Error('Missing workflow id');

    const slug = String(formData.get('slug') ?? '').trim();
    const toolSlugs = splitList(formData.get('toolSlugs'));
    const tools = await prisma.tool.findMany({ where: { slug: { in: toolSlugs } }, select: { id: true } });

    await prisma.workflow.update({
      where: { id },
      data: {
        title: String(formData.get('title') ?? '').trim(),
        slug,
        summary: String(formData.get('summary') ?? '').trim(),
        content: String(formData.get('content') ?? '').trim(),
        featuredImage: String(formData.get('featuredImage') ?? '').trim() || null,
        toolsUsed: { set: tools }
      }
    });

    await auditSuccess(userId, 'update', 'workflow', id, { slug });
    revalidateAdminPaths(slug);
    bounce('update_workflow', 'success');
  } catch (error) {
    if (isRedirectError(error)) throw error;
    await auditError(userId, 'update', 'workflow', error, id);
    bounce('update_workflow', 'error', errorMessage(error));
  }
}

export async function createPrompt(formData: FormData) {
  let userId: string | undefined;
  try {
    const authInfo = await requireAdmin();
    userId = authInfo.userId;

    const created = await prisma.prompt.create({
      data: {
        title: String(formData.get('title') ?? '').trim(),
        category: String(formData.get('category') ?? '').trim(),
        content: String(formData.get('content') ?? '').trim(),
        gated: formData.get('gated') === 'on'
      }
    });

    await auditSuccess(userId, 'create', 'prompt', created.id, { category: created.category });
    revalidateAdminPaths();
    bounce('create_prompt', 'success');
  } catch (error) {
    if (isRedirectError(error)) throw error;
    await auditError(userId, 'create', 'prompt', error);
    bounce('create_prompt', 'error', errorMessage(error));
  }
}

export async function deletePrompt(formData: FormData) {
  let userId: string | undefined;
  const id = String(formData.get('id') ?? '');
  try {
    const authInfo = await requireAdmin();
    userId = authInfo.userId;

    if (!id) throw new Error('Missing prompt id');

    await prisma.prompt.delete({ where: { id } });
    await auditSuccess(userId, 'delete', 'prompt', id);
    revalidateAdminPaths();
    bounce('delete_prompt', 'success');
  } catch (error) {
    if (isRedirectError(error)) throw error;
    await auditError(userId, 'delete', 'prompt', error, id);
    bounce('delete_prompt', 'error', errorMessage(error));
  }
}

export async function updatePrompt(formData: FormData) {
  let userId: string | undefined;
  const id = String(formData.get('id') ?? '');
  try {
    const authInfo = await requireAdmin();
    userId = authInfo.userId;

    if (!id) throw new Error('Missing prompt id');

    await prisma.prompt.update({
      where: { id },
      data: {
        title: String(formData.get('title') ?? '').trim(),
        category: String(formData.get('category') ?? '').trim(),
        content: String(formData.get('content') ?? '').trim(),
        gated: formData.get('gated') === 'on'
      }
    });

    await auditSuccess(userId, 'update', 'prompt', id);
    revalidateAdminPaths();
    bounce('update_prompt', 'success');
  } catch (error) {
    if (isRedirectError(error)) throw error;
    await auditError(userId, 'update', 'prompt', error, id);
    bounce('update_prompt', 'error', errorMessage(error));
  }
}

export async function createComparison(formData: FormData) {
  let userId: string | undefined;
  try {
    const authInfo = await requireAdmin();
    userId = authInfo.userId;

    const slug = String(formData.get('slug') ?? '').trim();
    const toolSlugs = splitList(formData.get('toolSlugs'));
    const tools = await prisma.tool.findMany({ where: { slug: { in: toolSlugs } }, select: { id: true } });

    const created = await prisma.comparison.create({
      data: {
        title: String(formData.get('title') ?? '').trim(),
        slug,
        verdict: String(formData.get('verdict') ?? '').trim(),
        content: String(formData.get('content') ?? '').trim(),
        tools: { connect: tools }
      }
    });

    await auditSuccess(userId, 'create', 'comparison', created.id, { slug: created.slug });
    revalidateAdminPaths(slug);
    bounce('create_comparison', 'success');
  } catch (error) {
    if (isRedirectError(error)) throw error;
    await auditError(userId, 'create', 'comparison', error);
    bounce('create_comparison', 'error', errorMessage(error));
  }
}

export async function deleteComparison(formData: FormData) {
  let userId: string | undefined;
  const id = String(formData.get('id') ?? '');
  try {
    const authInfo = await requireAdmin();
    userId = authInfo.userId;

    if (!id) throw new Error('Missing comparison id');

    await prisma.comparison.delete({ where: { id } });
    await auditSuccess(userId, 'delete', 'comparison', id);
    revalidateAdminPaths();
    bounce('delete_comparison', 'success');
  } catch (error) {
    if (isRedirectError(error)) throw error;
    await auditError(userId, 'delete', 'comparison', error, id);
    bounce('delete_comparison', 'error', errorMessage(error));
  }
}

export async function updateComparison(formData: FormData) {
  let userId: string | undefined;
  const id = String(formData.get('id') ?? '');
  try {
    const authInfo = await requireAdmin();
    userId = authInfo.userId;

    if (!id) throw new Error('Missing comparison id');

    const slug = String(formData.get('slug') ?? '').trim();
    const toolSlugs = splitList(formData.get('toolSlugs'));
    const tools = await prisma.tool.findMany({ where: { slug: { in: toolSlugs } }, select: { id: true } });

    await prisma.comparison.update({
      where: { id },
      data: {
        title: String(formData.get('title') ?? '').trim(),
        slug,
        verdict: String(formData.get('verdict') ?? '').trim(),
        content: String(formData.get('content') ?? '').trim(),
        tools: { set: tools }
      }
    });

    await auditSuccess(userId, 'update', 'comparison', id, { slug });
    revalidateAdminPaths(slug);
    bounce('update_comparison', 'success');
  } catch (error) {
    if (isRedirectError(error)) throw error;
    await auditError(userId, 'update', 'comparison', error, id);
    bounce('update_comparison', 'error', errorMessage(error));
  }
}
