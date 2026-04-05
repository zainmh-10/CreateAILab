import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

import { buildNewsletterConfirmationHtml } from '@/lib/newsletter';
import { subscribeEmailLimiter, subscribeIpLimiter } from '@/lib/rate-limit';
import { subscribeSchema } from '@/lib/validators';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

function isLikelyBot(userAgent: string | null) {
  const value = (userAgent ?? '').toLowerCase();
  return value.includes('bot') || value.includes('crawler') || value.includes('spider');
}

export async function POST(request: NextRequest) {
  const ip = (request.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]?.trim() || '127.0.0.1';
  const userAgent = request.headers.get('user-agent');

  const body = await request.json().catch(() => null);
  const parsed = subscribeSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid email payload.' }, { status: 400 });
  }

  const { email, website, formStartedAt } = parsed.data;

  const tooFast = formStartedAt && Date.now() - formStartedAt < 2000;
  if ((website ?? '').length > 0 || isLikelyBot(userAgent) || tooFast) {
    return NextResponse.json({ success: true });
  }

  if (subscribeIpLimiter) {
    const ipLimit = await subscribeIpLimiter.limit(`subscribe:ip:${ip}`);
    if (!ipLimit.success) {
      return NextResponse.json({ error: 'Rate limit exceeded.' }, { status: 429 });
    }
  }

  if (subscribeEmailLimiter) {
    const emailLimit = await subscribeEmailLimiter.limit(`subscribe:email:${email.toLowerCase()}`);
    if (!emailLimit.success) {
      return NextResponse.json({ error: 'Rate limit exceeded.' }, { status: 429 });
    }
  }

  if (resend) {
    const newsletterHtml = buildNewsletterConfirmationHtml();
    const mail = await resend.emails.send({
      from: 'CreatorAILab <onboarding@resend.dev>',
      to: [email],
      subject: 'You are subscribed to the CreatorAILab weekly AI brief',
      html: newsletterHtml
    });

    if (mail.error) {
      console.error('resend_email_failed', mail.error.message);
      return NextResponse.json({ error: 'Unable to send confirmation email. Please try again.' }, { status: 502 });
    }
  }

  return NextResponse.json({ success: true });
}
