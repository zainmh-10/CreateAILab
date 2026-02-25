require('dotenv').config();

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const [tools, workflows, prompts, comparisons, subscribers] = await Promise.all([
    prisma.tool.count(),
    prisma.workflow.count(),
    prisma.prompt.count(),
    prisma.comparison.count(),
    prisma.subscriber.count()
  ]);

  const checks = [
    { name: 'tools', expectedMin: 10, actual: tools },
    { name: 'workflows', expectedMin: 3, actual: workflows },
    { name: 'prompts', expectedMin: 15, actual: prompts },
    { name: 'comparisons', expectedMin: 2, actual: comparisons }
  ];

  const failed = checks.filter((c) => c.actual < c.expectedMin);

  console.log(
    JSON.stringify(
      {
        status: failed.length === 0 ? 'ok' : 'failed',
        counts: { tools, workflows, prompts, comparisons, subscribers },
        checks
      },
      null,
      2
    )
  );

  if (failed.length > 0) {
    process.exitCode = 1;
  }
}

main()
  .catch((error) => {
    console.error('db:check failed:', error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
