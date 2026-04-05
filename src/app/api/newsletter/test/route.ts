import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

import { buildWeeklyNewsletterIssue, isNewsletterRequestAuthorized } from '@/lib/newsletter';
import { newsletterTestSendSchema } from '@/lib/validators';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
  if (!isNewsletterRequestAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!resend) {
    return NextResponse.json({ error: 'Missing RESEND_API_KEY.' }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  const parsed = newsletterTestSendSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid email payload.' }, { status: 400 });
  }

  const issue = await buildWeeklyNewsletterIssue();
  const response = await resend.emails.send({
    from: 'CreatorAILab <onboarding@resend.dev>',
    to: [parsed.data.email],
    subject: `[Test] ${issue.subject}`,
    html: issue.html
  });

  if (response.error) {
    return NextResponse.json({ error: response.error.message }, { status: 502 });
  }

  return NextResponse.json({
    success: true,
    email: parsed.data.email,
    featuredToolSlug: issue.featuredToolSlug,
    issueTag: issue.issueTag
  });
}
