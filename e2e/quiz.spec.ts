import { expect, test } from '@playwright/test';

test.describe('Tool Finder Quiz', () => {
  test('quiz page loads and shows questions', async ({ page }) => {
    await page.goto('/quiz');
    await expect(page.getByRole('heading', { name: /AI Quizzes/i })).toBeVisible();
    await expect(page.getByText(/primary content type/i)).toBeVisible();
  });

  test('can complete tool finder quiz and see recommendations', async ({ page }) => {
    await page.goto('/quiz');

    const fieldsets = page.locator('form fieldset');
    await expect(fieldsets.first()).toBeVisible();

    for (let i = 0; i < 5; i++) {
      const fieldset = fieldsets.nth(i);
      await fieldset.locator('label').first().click();
    }

    await page.getByRole('button', { name: /get my recommendation/i }).click();

    await expect(page.getByText(/recommended AI stack|your recommended/i)).toBeVisible({ timeout: 8000 });
    await expect(page.getByRole('link', { name: /view details|chatgpt|claude|browse all tools/i })).toBeVisible({ timeout: 5000 });
  });
});

test.describe('Weekly Quiz', () => {
  test('weekly quiz page loads', async ({ page }) => {
    await page.goto('/quiz/weekly');
    await expect(page.getByRole('heading', { name: /weekly AI quiz/i })).toBeVisible({ timeout: 10000 });
  });

  test('weekly quiz shows questions or completed state', async ({ page }) => {
    await page.goto('/quiz/weekly');
    await page.waitForLoadState('networkidle');

    const hasQuestions = await page.getByRole('button', { name: /see results/i }).isVisible().catch(() => false);
    const alreadyDone = await page.getByText(/already completed/i).isVisible().catch(() => false);

    expect(hasQuestions || alreadyDone).toBeTruthy();
  });
});
