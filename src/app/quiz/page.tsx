'use client';

import { FormEvent, useMemo, useState } from 'react';
import Link from 'next/link';

import { EmailCapture } from '@/components/email-capture';
import { trackEvent } from '@/lib/analytics';

type ToolData = { id: string; name: string; slug: string; description: string; category: string };

type Question = {
  text: string;
  options: string[];
};

const questions: Question[] = [
  {
    text: 'What is your primary content type?',
    options: ['Written (blogs, newsletters)', 'Video (YouTube, TikTok)', 'Audio (podcasts)', 'Visual (design, social graphics)', 'Mixed / multi-format']
  },
  {
    text: 'How often do you publish?',
    options: ['Daily', '2-3 times per week', 'Weekly', 'A few times per month', 'Irregularly']
  },
  {
    text: 'What is your biggest bottleneck?',
    options: ['Generating ideas', 'Drafting and writing', 'Editing and polish', 'Distribution and scheduling', 'Repurposing across platforms']
  },
  {
    text: 'What budget range do you have for tools?',
    options: ['Free only', 'Up to $30/month', '$30-$100/month', '$100+/month']
  },
  {
    text: 'Do you work solo or with a team?',
    options: ['Solo creator', 'Small team (2-5)', 'Larger team (5+)']
  }
];

type Recommendation = { name: string; reason: string; slug: string };

function getRecommendations(answers: string[]): Recommendation[] {
  const stacks: Recommendation[] = [];
  const contentType = answers[0] ?? '';
  const bottleneck = answers[2] ?? '';
  const budget = answers[3] ?? '';

  stacks.push({ name: 'ChatGPT', reason: 'Core AI assistant for ideation, drafting, and editing across all workflows.', slug: 'chatgpt' });

  if (contentType.includes('Written') || bottleneck.includes('Drafting')) {
    stacks.push({ name: 'Claude', reason: 'Excellent for long-form writing and structured editing passes.', slug: 'claude' });
  }
  if (contentType.includes('Video') || contentType.includes('TikTok')) {
    stacks.push({ name: 'CapCut AI', reason: 'Fast short-form video editing with AI captions.', slug: 'capcut-ai' });
    stacks.push({ name: 'Descript', reason: 'Text-based video editing and transcript-first workflows.', slug: 'descript' });
  }
  if (contentType.includes('Audio')) {
    stacks.push({ name: 'Descript', reason: 'Industry-leading text-based audio editing.', slug: 'descript' });
    stacks.push({ name: 'ElevenLabs', reason: 'AI voiceover generation for narration and dubbing.', slug: 'elevenlabs' });
  }
  if (contentType.includes('Visual') || contentType.includes('design')) {
    stacks.push({ name: 'Canva AI', reason: 'AI-powered design for social graphics and campaigns.', slug: 'canva-ai' });
    stacks.push({ name: 'Midjourney', reason: 'High-quality AI image generation for concepts and thumbnails.', slug: 'midjourney' });
  }
  if (bottleneck.includes('Distribution') || bottleneck.includes('Repurposing')) {
    stacks.push({ name: 'Zapier', reason: 'Automate repetitive distribution and publishing tasks.', slug: 'zapier' });
  }
  if (bottleneck.includes('ideas')) {
    stacks.push({ name: 'Perplexity', reason: 'Fast citation-backed research for content ideation.', slug: 'perplexity' });
  }
  if (contentType.includes('Mixed') || contentType.includes('multi')) {
    stacks.push({ name: 'Notion AI', reason: 'Central workspace for planning and managing multi-format content.', slug: 'notion-ai' });
  }
  if (!budget.includes('Free')) {
    stacks.push({ name: 'Beehiiv', reason: 'Newsletter platform with growth and monetization features.', slug: 'beehiiv' });
  }

  const seen = new Set<string>();
  return stacks.filter((s) => {
    if (seen.has(s.slug)) return false;
    seen.add(s.slug);
    return true;
  }).slice(0, 6);
}

export default function QuizPage() {
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(''));
  const [submitted, setSubmitted] = useState(false);
  const [tools, setTools] = useState<ToolData[]>([]);
  const [toolsLoading, setToolsLoading] = useState(false);

  const completed = useMemo(() => answers.every(Boolean), [answers]);
  const staticRecommendations = useMemo(() => getRecommendations(answers), [answers]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!completed) return;
    trackEvent('quiz_completed', { answersCount: answers.length });
    setSubmitted(true);
    setToolsLoading(true);
    try {
      const slugs = staticRecommendations.map((r) => r.slug).join(',');
      const res = await fetch(`/api/tools/by-slugs?slugs=${encodeURIComponent(slugs)}`);
      if (res.ok) {
        const data = await res.json();
        setTools(data);
      }
    } finally {
      setToolsLoading(false);
    }
  }

  const recommendations = useMemo(() => {
    if (tools.length > 0) {
      return staticRecommendations.map((rec) => {
        const tool = tools.find((t) => t.slug === rec.slug);
        return {
          ...rec,
          name: tool?.name ?? rec.name,
          description: tool?.description ?? rec.reason
        };
      });
    }
    return staticRecommendations.map((r) => ({ ...r, description: r.reason }));
  }, [staticRecommendations, tools]);

  return (
    <section className="mx-auto max-w-3xl space-y-8 px-6 py-16">
      <header className="text-center">
        <h1 className="text-4xl font-black text-slate-900">
          AI <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">Quizzes</span>
        </h1>
        <p className="mt-3 text-lg text-slate-600">
          Choose a quiz to get started.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/quiz/weekly"
          className="card-soft group flex flex-col space-y-2 p-6 transition-shadow hover:shadow-md"
        >
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">New</span>
          <h2 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600">Weekly AI Quiz</h2>
          <p className="text-sm text-slate-600">
            20 questions (5 easy, 15 hard). New quiz every Sunday at 8pm GMT. Test your AI knowledge.
          </p>
          <span className="mt-auto text-sm font-semibold text-indigo-600">Take Quiz →</span>
        </Link>
        <div className="card-soft flex flex-col space-y-2 p-6 opacity-90">
          <h2 className="text-xl font-bold text-slate-900">AI Tool Finder</h2>
          <p className="text-sm text-slate-600">
            Answer 5 questions and get a personalized AI tool stack recommendation.
          </p>
          <span className="mt-auto text-sm text-slate-500">Continue below →</span>
        </div>
      </div>

      <div className="border-t border-slate-200 pt-8">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">AI Tool Finder</h2>
      {!submitted ? (
        <form onSubmit={onSubmit} className="space-y-6">
          {questions.map((q, i) => (
            <fieldset key={q.text} className="card space-y-3">
              <legend className="text-base font-semibold text-slate-900">{i + 1}. {q.text}</legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {q.options.map((opt) => (
                  <label
                    key={opt}
                    className={`cursor-pointer rounded-lg border px-4 py-3 text-sm transition-colors ${
                      answers[i] === opt
                        ? 'border-indigo-500 bg-indigo-50 font-semibold text-indigo-700'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`q-${i}`}
                      value={opt}
                      checked={answers[i] === opt}
                      onChange={() => {
                        const next = [...answers];
                        next[i] = opt;
                        setAnswers(next);
                      }}
                      className="sr-only"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </fieldset>
          ))}

          <div className="flex items-center gap-4">
            <button className="btn" type="submit" disabled={!completed}>
              Get My Recommendation
            </button>
            {!completed && (
              <p className="text-sm text-slate-500">Answer all questions to continue</p>
            )}
          </div>
        </form>
      ) : (
        <div className="space-y-8">
          <div className="card-soft space-y-4 border-indigo-200 p-6">
            <h2 className="text-2xl font-bold text-slate-900">Your Recommended AI Stack</h2>
            <p className="text-slate-600">Based on your answers, here is a curated tool stack to get you started.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {toolsLoading ? (
              <p className="col-span-2 text-sm text-slate-500">Loading recommendations...</p>
            ) : (
              recommendations.map((rec) => (
                <Link key={rec.slug} href={`/tools/${rec.slug}`} className="card-soft group space-y-2 p-5 transition-shadow hover:shadow-md">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600">{rec.name}</h3>
                  <p className="text-sm text-slate-600">{rec.description}</p>
                  <span className="text-xs font-semibold text-indigo-600">View details &rarr;</span>
                </Link>
              ))
            )}
          </div>

          <div className="flex gap-3">
            <button className="btn-secondary" type="button" onClick={() => { setSubmitted(false); setAnswers(Array(questions.length).fill('')); }}>
              Retake Quiz
            </button>
            <Link href="/tools" className="btn-secondary">
              Browse All Tools
            </Link>
          </div>

          <EmailCapture
            source="quiz-results"
            title="Get your full AI workflow guide"
            description="We will send a personalized playbook based on your quiz answers plus weekly tips."
            buttonLabel="Send My Guide"
          />
        </div>
      )}
      </div>
    </section>
  );
}
