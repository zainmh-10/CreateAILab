import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

import { buildQuizResultsEmailHtml, getCurrentQuizSet, scoreQuiz } from '@/lib/weekly-quiz';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const emailSchema = z.object({
  email: z.string().email(),
  answers: z.record(z.string(), z.number())
});

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = emailSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid email or answers.' }, { status: 400 });
  }

  const { email, answers } = parsed.data;
  const result = scoreQuiz(answers);
  const set = getCurrentQuizSet();

  const html = buildQuizResultsEmailHtml({
    score: result.score,
    total: result.total,
    percentage: result.percentage,
    weekLabel: set.weekLabel,
    questionResults: result.questionResults.map((r) => ({
      text: r.text,
      correct: r.correct,
      userAnswer: r.userAnswer,
      correctAnswer: r.correctAnswer
    }))
  });

  if (!resend) {
    return NextResponse.json({ error: 'Email service not configured.' }, { status: 503 });
  }

  const mail = await resend.emails.send({
    from: 'CreatorAILab <onboarding@resend.dev>',
    to: [email],
    subject: `Your AI Quiz Results — ${result.score}/${result.total} (${result.percentage}%)`,
    html
  });

  if (mail.error) {
    console.error('quiz_email_failed', mail.error.message);
    return NextResponse.json({ error: 'Unable to send email. Please try again.' }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
