import { NextRequest } from 'next/server';

import { buildWorkflowChecklist, getWorkflowGuide } from '@/lib/workflow-guides';

export async function GET(_request: NextRequest, { params }: { params: { slug: string } }) {
  const guide = getWorkflowGuide(params.slug);

  if (!guide) {
    return new Response('Workflow not found', { status: 404 });
  }

  const text = buildWorkflowChecklist(guide);

  return new Response(text, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Content-Disposition': `attachment; filename="${guide.slug}-checklist.txt"`
    }
  });
}
