import 'dotenv/config';
import { PrismaClient, PricingType, ToolCategory } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.comparison.deleteMany();
  await prisma.workflow.deleteMany();
  await prisma.prompt.deleteMany();
  await prisma.tool.deleteMany();

  const tools = await Promise.all(
    [
      ['ChatGPT', 'chatgpt', ToolCategory.writing, PricingType.freemium],
      ['Claude', 'claude', ToolCategory.writing, PricingType.freemium],
      ['Midjourney', 'midjourney', ToolCategory.image, PricingType.paid],
      ['Canva AI', 'canva-ai', ToolCategory.image, PricingType.freemium],
      ['Descript', 'descript', ToolCategory.video, PricingType.freemium],
      ['CapCut AI', 'capcut-ai', ToolCategory.video, PricingType.free],
      ['Zapier', 'zapier', ToolCategory.automation, PricingType.freemium],
      ['Make', 'make', ToolCategory.automation, PricingType.freemium],
      ['Notion AI', 'notion-ai', ToolCategory.productivity, PricingType.freemium],
      ['Beehiiv', 'beehiiv', ToolCategory.marketing, PricingType.freemium]
    ].map(([name, slug, category, pricingType], idx) =>
      prisma.tool.create({
        data: {
          name,
          slug,
          category: category as ToolCategory,
          pricingType: pricingType as PricingType,
          description: `${name} helps creators streamline output and quality.`,
          pricingDetails: 'See vendor pricing page for latest tiers.',
          pros: ['Fast setup', 'Creator-friendly UX'],
          cons: ['Learning curve for advanced workflows'],
          bestFor: 'Creators and solopreneurs building repeatable systems',
          affiliateUrl: `https://example.com/affiliate/${slug}`,
          featured: idx < 4
        }
      })
    )
  );

  await Promise.all(
    [
      ['Daily Content Engine', 'daily-content-engine'],
      ['Weekly Newsletter Pipeline', 'weekly-newsletter-pipeline'],
      ['Repurpose Long-form to Shorts', 'repurpose-longform-to-shorts']
    ].map(([title, slug], idx) =>
      prisma.workflow.create({
        data: {
          title,
          slug,
          summary: `Workflow ${idx + 1} to produce consistent creator output with AI tools.`,
          content: 'Step 1: Research. Step 2: Draft. Step 3: Polish. Step 4: Publish.',
          toolsUsed: {
            connect: [
              { id: tools[idx].id },
              { id: tools[(idx + 1) % tools.length].id }
            ]
          }
        }
      })
    )
  );

  await Promise.all(
    Array.from({ length: 15 }).map((_, i) =>
      prisma.prompt.create({
        data: {
          title: `Creator Prompt ${i + 1}`,
          category: i % 2 === 0 ? 'writing' : 'marketing',
          content: `You are an expert creator strategist. Generate a tactical plan #${i + 1}.`,
          gated: i % 3 === 0
        }
      })
    )
  );

  await prisma.comparison.create({
    data: {
      title: 'ChatGPT vs Claude',
      slug: 'chatgpt-vs-claude',
      verdict: 'ChatGPT is stronger for ecosystem integrations; Claude excels at long-form drafting.',
      content: 'Feature and pricing comparison for creator use cases.',
      tools: { connect: [{ id: tools[0].id }, { id: tools[1].id }] }
    }
  });

  await prisma.comparison.create({
    data: {
      title: 'Zapier vs Make',
      slug: 'zapier-vs-make',
      verdict: 'Zapier is easier to onboard, while Make offers deeper visual flow control.',
      content: 'Automation stack comparison for solopreneurs.',
      tools: { connect: [{ id: tools[6].id }, { id: tools[7].id }] }
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
