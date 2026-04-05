import { NextRequest, NextResponse } from 'next/server';

import { buildWeeklyNewsletterIssue, isNewsletterRequestAuthorized } from '@/lib/newsletter';

export async function GET(request: NextRequest) {
  if (!isNewsletterRequestAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const issue = await buildWeeklyNewsletterIssue();

  return new NextResponse(issue.html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8'
    }
  });
}
