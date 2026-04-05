'use client';

import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';

import { trackEvent } from '@/lib/analytics';

const WEEKLY_QUIZ_TOOL_SLUGS = ['chatgpt', 'claude', 'perplexity', 'midjourney', 'canva-ai', 'descript'];

type QuizQuestion = {
  id: string;
  text: string;
  options: string[];
  difficulty: string;
};

type QuizData = {
  weekLabel: string;
  weekNumber: number;
  questions: QuizQuestion[];
};

const QUIZ_DONE_COOKIE = 'quiz_weekly_done';
const COOKIE_MAX_AGE = 8 * 24 * 60 * 60; // 8 days

function getQuizDoneCookie(): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${QUIZ_DONE_COOKIE}=([^;]*)`));
  return match ? decodeURIComponent(match[1]!) : null;
}

function setQuizDoneCookie(weekNumber: number) {
  if (typeof document === 'undefined') return;
  document.cookie = `${QUIZ_DONE_COOKIE}=${weekNumber}; max-age=${COOKIE_MAX_AGE}; path=/`;
}

type Result = {
  score: number;
  total: number;
  percentage: number;
  correctByQuestion: Record<string, boolean>;
  questionResults: Array<{
    id: string;
    text: string;
    correct: boolean;
    userAnswer: string;
    correctAnswer: string;
  }>;
};

export default function WeeklyQuizPage() {
  const [data, setData] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [email, setEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [emailMessage, setEmailMessage] = useState('');

  const [alreadyCompleted, setAlreadyCompleted] = useState(false);
  const [recommendedTools, setRecommendedTools] = useState<Array<{ name: string; slug: string; description: string }>>([]);

  useEffect(() => {
    fetch('/api/quiz/weekly')
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        const done = getQuizDoneCookie();
        if (done !== null && String(d.weekNumber) === done) {
          setAlreadyCompleted(true);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const completed = data && Object.keys(answers).length === data.questions.length;

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!completed || !data) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/quiz/weekly/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Submit failed');
      setResult(json);
      if (data?.weekNumber != null) setQuizDoneCookie(data.weekNumber);
      trackEvent('quiz_completed', { source: 'weekly', score: json.score, total: json.total });
      const toolsRes = await fetch(`/api/tools/by-slugs?slugs=${encodeURIComponent(WEEKLY_QUIZ_TOOL_SLUGS.join(','))}`);
      if (toolsRes.ok) {
        const tools = await toolsRes.json();
        setRecommendedTools(tools.map((t: { name: string; slug: string; description: string }) => ({ name: t.name, slug: t.slug, description: t.description })));
      }
    } catch {
      setSubmitting(false);
    }
    setSubmitting(false);
  }

  async function onEmailSubmit(event: FormEvent) {
    event.preventDefault();
    if (!email || !result) return;
    setEmailStatus('loading');
    setEmailMessage('');
    try {
      const res = await fetch('/api/quiz/weekly/email-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, answers })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Failed to send');
      setEmailStatus('success');
      setEmailMessage('Results sent to your email.');
    } catch (e) {
      setEmailStatus('error');
      setEmailMessage(e instanceof Error ? e.message : 'Failed to send.');
    }
  }

  if (loading) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="animate-pulse space-y-4">
          <div className="h-10 w-3/4 rounded bg-slate-200" />
          <div className="h-4 w-1/2 rounded bg-slate-200" />
          <div className="mt-8 h-32 rounded bg-slate-200" />
          <div className="h-32 rounded bg-slate-200" />
        </div>
      </section>
    );
  }

  if (!data) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="text-slate-600">Unable to load quiz. Please try again.</p>
        <Link href="/quiz" className="mt-4 inline-block text-indigo-600 hover:underline">
          Back to Quiz
        </Link>
      </section>
    );
  }

  if (alreadyCompleted) {
    return (
      <section className="mx-auto max-w-3xl space-y-8 px-6 py-16">
        <header className="text-center">
          <Link href="/quiz" className="text-sm font-semibold text-indigo-600 hover:underline">
            ← Back to Quiz
          </Link>
          <h1 className="mt-4 text-4xl font-black text-slate-900">
            Weekly AI <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">Quiz</span>
          </h1>
        </header>
        <div className="card-soft border-amber-200 p-8 text-center">
          <p className="text-lg font-medium text-slate-900">You&apos;ve already completed this week&apos;s quiz.</p>
          <p className="mt-2 text-slate-600">A new quiz drops every Sunday at 8pm GMT.</p>
          <Link href="/quiz" className="mt-6 inline-block rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700">
            Back to Quiz
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl space-y-8 px-6 py-16">
      <header className="text-center">
        <Link href="/quiz" className="text-sm font-semibold text-indigo-600 hover:underline">
          ← Back to Quiz
        </Link>
        <h1 className="mt-4 text-4xl font-black text-slate-900">
          Weekly AI <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">Quiz</span>
        </h1>
        <p className="mt-3 text-lg text-slate-600">
          {data.weekLabel} — 20 questions (5 easy, 15 hard). New quiz every Sunday at 8pm GMT.
        </p>
      </header>

      {!result ? (
        <form onSubmit={onSubmit} className="space-y-6">
          {data.questions.map((q, i) => (
            <fieldset key={q.id} className="card space-y-3">
              <div className="flex items-center justify-between gap-2">
                <legend className="text-base font-semibold text-slate-900">
                  {i + 1}. {q.text}
                </legend>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${
                    q.difficulty === 'easy' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {q.difficulty}
                </span>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {q.options.map((opt, optIdx) => (
                  <label
                    key={opt}
                    className={`cursor-pointer rounded-lg border px-4 py-3 text-sm transition-colors ${
                      answers[q.id] === optIdx
                        ? 'border-indigo-500 bg-indigo-50 font-semibold text-indigo-700'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name={q.id}
                      value={optIdx}
                      checked={answers[q.id] === optIdx}
                      onChange={() => setAnswers((prev) => ({ ...prev, [q.id]: optIdx }))}
                      className="sr-only"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </fieldset>
          ))}

          <div className="flex items-center gap-4">
            <button className="btn" type="submit" disabled={!completed || submitting}>
              {submitting ? 'Submitting...' : 'See Results'}
            </button>
            {!completed && (
              <p className="text-sm text-slate-500">
                Answer all {data.questions.length} questions to continue
              </p>
            )}
          </div>
        </form>
      ) : (
        <div className="space-y-8">
          <div className="card-soft space-y-4 border-indigo-200 p-6">
            <h2 className="text-2xl font-bold text-slate-900">Your Results</h2>
            <p className="text-3xl font-black text-indigo-600">
              {result.score}/{result.total} ({result.percentage}%)
            </p>
            <p className="text-slate-600">
              {result.percentage >= 80
                ? 'Excellent! You know your AI.'
                : result.percentage >= 60
                  ? 'Solid score. Keep learning.'
                  : 'Room to grow. A new quiz drops next Sunday at 8pm GMT.'}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-900">Breakdown</h3>
            {result.questionResults.map((r, i) => (
              <div
                key={r.id}
                className={`rounded-lg border p-4 ${
                  r.correct ? 'border-emerald-200 bg-emerald-50/50' : 'border-rose-200 bg-rose-50/50'
                }`}
              >
                <p className="font-medium text-slate-900">{i + 1}. {r.text}</p>
                <p className={`mt-1 text-sm ${r.correct ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {r.correct ? 'Correct' : `Your answer: ${r.userAnswer} — Correct: ${r.correctAnswer}`}
                </p>
              </div>
            ))}
          </div>

          <div className="card space-y-3 p-6">
            <h3 className="text-base font-semibold text-slate-900">Email my results</h3>
            <p className="text-sm text-slate-600">
              Get a copy of your results and breakdown sent to your inbox.
            </p>
            <form onSubmit={onEmailSubmit} className="flex flex-col gap-2 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-accent focus:ring-2"
              />
              <button
                type="submit"
                className="btn shrink-0"
                disabled={emailStatus === 'loading' || emailStatus === 'success'}
              >
                {emailStatus === 'loading' ? 'Sending...' : emailStatus === 'success' ? 'Sent!' : 'Send Results'}
              </button>
            </form>
            {emailMessage && (
              <p
                className={`text-sm ${
                  emailStatus === 'error' ? 'text-rose-600' : 'text-emerald-700'
                }`}
              >
                {emailMessage}
              </p>
            )}
          </div>

          {recommendedTools.length > 0 ? (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-900">Explore AI tools</h3>
              <p className="text-sm text-slate-600">Based on your quiz, you might find these tools useful.</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {recommendedTools.slice(0, 4).map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="card-soft group space-y-1 p-4 transition-shadow hover:shadow-md"
                  >
                    <h4 className="font-semibold text-slate-900 group-hover:text-indigo-600">{tool.name}</h4>
                    <p className="line-clamp-2 text-sm text-slate-600">{tool.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          <div className="flex gap-3">
            <Link href="/quiz" className="btn-secondary">
              Tool Finder Quiz
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
