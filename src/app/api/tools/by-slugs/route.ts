import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { safeGetToolBySlug } from '@/lib/content';

const schema = z.object({
  slugs: z.array(z.string().min(1)).max(20)
});

export async function GET(request: NextRequest) {
  const slugs = request.nextUrl.searchParams.get('slugs');
  const parsed = schema.safeParse({ slugs: slugs ? slugs.split(',') : [] });

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid slugs' }, { status: 400 });
  }

  const tools = await Promise.all(
    parsed.data.slugs.map((slug) => safeGetToolBySlug(slug.trim()))
  );

  const results = tools.filter((t): t is NonNullable<typeof t> => t !== null);

  return NextResponse.json(results);
}
