import { NextRequest, NextResponse } from 'next/server';

import { getAiNewsBundle } from '@/lib/ai-news';

export async function GET(request: NextRequest) {
  const tool = request.nextUrl.searchParams.get('tool')?.trim().toLowerCase() ?? null;
  const data = await getAiNewsBundle(tool);

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 's-maxage=900, stale-while-revalidate=3600'
    }
  });
}
