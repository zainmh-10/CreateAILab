import type { NextRequest } from 'next/server';

import { getAiNewsBundle, getToolAiNews, type AiNewsItem } from '@/lib/ai-news';
import { popularToolsCatalog } from '@/lib/tool-catalog';
import { getToolContext } from '@/lib/tool-context';

export const WEEKLY_NEWSLETTER_TAG = 'weekly-newsletter';

export function isNewsletterRequestAuthorized(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get('authorization');
  const vercelCronHeader = request.headers.get('x-vercel-cron');

  if (cronSecret && authHeader === `Bearer ${cronSecret}`) {
    return true;
  }

  return vercelCronHeader === '1';
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatIssueDate(value: string) {
  const date = new Date(value);
  return new Intl.DateTimeFormat('en-GB', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'GMT'
  }).format(date);
}

function buildTutorialSteps(toolName: string, bestFor: string | null | undefined, workflowAngles: string[], updateLine: string) {
  return [
    `Open ${toolName} with one narrow job in mind: ${bestFor ?? `a high-leverage creator workflow`}.`,
    workflowAngles[0] ?? `Use ${toolName} to create a faster first draft, then tighten it with one focused revision pass.`,
    updateLine || workflowAngles[1] || `Ship one output with ${toolName} this week, review the result, and keep only the parts that actually save time.`
  ].slice(0, 3);
}

function renderNewsRow(item: AiNewsItem) {
  const bullets = item.takeaways
    .slice(0, 2)
    .map(
      (bullet) =>
        `<li style="margin:0 0 6px;color:#475569;line-height:1.5;">${escapeHtml(bullet)}</li>`
    )
    .join('');

  return `
    <tr>
      <td style="padding:0 0 18px;">
        <p style="margin:0 0 6px;color:#6366f1;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">${escapeHtml(item.trendLabel)}</p>
        <h3 style="margin:0 0 8px;font-size:18px;color:#0f172a;">${escapeHtml(item.title)}</h3>
        <p style="margin:0 0 10px;color:#334155;line-height:1.65;">${escapeHtml(item.briefing)}</p>
        <ul style="margin:0;padding-left:18px;">${bullets}</ul>
        <p style="margin:10px 0 0;color:#64748b;font-size:13px;">Source: <a href="${escapeHtml(item.url)}" style="color:#4f46e5;text-decoration:none;">${escapeHtml(item.source)}</a></p>
      </td>
    </tr>
  `;
}

export function buildNewsletterConfirmationHtml() {
  return `
    <div style="background:#f8fafc;padding:24px;font-family:Arial,Helvetica,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:24px;">
        <tr>
          <td>
            <p style="margin:0 0 8px;color:#6366f1;font-weight:700;">CreatorAILab Weekly AI Brief</p>
            <h1 style="margin:0 0 10px;font-size:26px;color:#0f172a;">You are subscribed</h1>
            <p style="margin:0 0 14px;color:#475569;line-height:1.6;">You will receive the weekly CreatorAILab AI newsletter every Sunday at 8pm GMT.</p>
            <p style="margin:0 0 14px;color:#475569;line-height:1.6;">Each issue includes the latest AI news worth knowing, one featured tool of the week, and a short tutorial so you can put it to work immediately.</p>
            <p style="margin:0;color:#64748b;font-size:13px;line-height:1.5;">If you subscribed by mistake, you can ignore this message.</p>
          </td>
        </tr>
      </table>
    </div>
  `;
}

export async function buildWeeklyNewsletterIssue() {
  const bundle = await getAiNewsBundle();
  const overallLeader =
    bundle.weeklyScoreboard.leaders.find((entry) => entry.area === 'Overall') ??
    bundle.weeklyScoreboard.leaders[0] ??
    null;
  const featuredToolSlug = overallLeader?.toolSlug ?? bundle.toolOptions[0]?.slug ?? popularToolsCatalog[0]?.slug;
  const featuredTool = popularToolsCatalog.find((tool) => tool.slug === featuredToolSlug) ?? popularToolsCatalog[0];
  const featuredContext = getToolContext(featuredTool.slug);
  const featuredToolData = await getToolAiNews(featuredTool.slug);
  const featuredUpdate = featuredToolData.toolNews[0]?.briefing ?? featuredContext.quickFacts[0] ?? '';
  const tutorialSteps = buildTutorialSteps(
    featuredTool.name,
    featuredTool.bestFor,
    featuredContext.workflowAngles,
    featuredUpdate
  );
  const topNewsRows = bundle.generalNews.slice(0, 3).map(renderNewsRow).join('');
  const issueDate = formatIssueDate(bundle.weeklyScoreboard.periodEnd);
  const issueTag = `weekly-brief:${bundle.weeklyScoreboard.periodEnd.slice(0, 10)}`;
  const tutorialRows = tutorialSteps
    .map(
      (step, index) => `
        <tr>
          <td style="padding:0 0 12px;">
            <p style="margin:0;color:#0f172a;line-height:1.6;"><strong>Step ${index + 1}:</strong> ${escapeHtml(step)}</p>
          </td>
        </tr>
      `
    )
    .join('');
  const featuredNewsRows = featuredToolData.toolNews
    .slice(0, 2)
    .map(
      (item) => `
        <tr>
          <td style="padding:0 0 10px;">
            <p style="margin:0;color:#334155;line-height:1.6;"><strong>${escapeHtml(item.title)}:</strong> ${escapeHtml(item.summary)}</p>
          </td>
        </tr>
      `
    )
    .join('');

  const html = `
    <div style="background:#f8fafc;padding:24px;font-family:Arial,Helvetica,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:24px;">
        <tr>
          <td>
            <p style="margin:0 0 8px;color:#6366f1;font-weight:700;">CreatorAILab Weekly AI Brief</p>
            <h1 style="margin:0 0 10px;font-size:28px;color:#0f172a;">Latest AI news for the week of ${escapeHtml(issueDate)}</h1>
            <p style="margin:0 0 24px;color:#475569;line-height:1.6;">Here is the shortest useful version of this week in AI: the biggest stories, the tool with the strongest momentum right now, and a fast tutorial you can use immediately.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:0 0 12px;border-top:1px solid #e2e8f0;">
            <h2 style="margin:20px 0 12px;font-size:22px;color:#0f172a;">What changed in AI this week</h2>
          </td>
        </tr>
        ${topNewsRows}
        <tr>
          <td style="padding:8px 0 12px;border-top:1px solid #e2e8f0;">
            <h2 style="margin:20px 0 12px;font-size:22px;color:#0f172a;">Best AI tool to use this week: ${escapeHtml(featuredTool.name)}</h2>
            <p style="margin:0 0 10px;color:#334155;line-height:1.6;">${escapeHtml(overallLeader?.rationale ?? `${featuredTool.name} stood out this week across the strongest live AI signals.`)}</p>
            <p style="margin:0 0 14px;color:#475569;line-height:1.6;">Best for: ${escapeHtml(featuredTool.bestFor ?? 'high-leverage creator workflows')}.</p>
            <p style="margin:0 0 16px;"><a href="${escapeHtml(featuredTool.affiliateUrl)}" style="color:#4f46e5;text-decoration:none;font-weight:700;">Open ${escapeHtml(featuredTool.name)}</a></p>
          </td>
        </tr>
        ${featuredNewsRows}
        <tr>
          <td style="padding:8px 0 12px;border-top:1px solid #e2e8f0;">
            <h2 style="margin:20px 0 12px;font-size:22px;color:#0f172a;">Short tutorial: how to use ${escapeHtml(featuredTool.name)} this week</h2>
          </td>
        </tr>
        ${tutorialRows}
        <tr>
          <td style="padding-top:16px;border-top:1px solid #e2e8f0;">
            <p style="margin:0;color:#64748b;font-size:13px;line-height:1.5;">You are receiving this because you subscribed at CreatorAILab. New issues land every Sunday at 8pm GMT.</p>
          </td>
        </tr>
      </table>
    </div>
  `;

  return {
    issueTag,
    featuredToolSlug: featuredTool.slug,
    subject: `CreatorAILab Weekly AI Brief: ${featuredTool.name} + this week's top AI news`,
    html
  };
}
