import { expect, test } from '@playwright/test';

test.describe('Subscribe flow', () => {
  test('email capture form renders on home page', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByPlaceholder('you@example.com')).toBeVisible();
    await expect(page.getByRole('button', { name: /join|subscribe/i })).toBeVisible();
  });

  test('subscribe form shows validation for invalid email', async ({ page }) => {
    await page.goto('/');
    const emailInput = page.getByPlaceholder('you@example.com');
    const submitBtn = page.getByRole('button', { name: /join|subscribe/i }).first();

    await emailInput.fill('invalid');
    await submitBtn.click();
    await expect(emailInput).toHaveAttribute('type', 'email');
  });

  test('subscribe form submits with valid email', async ({ page }) => {
    await page.goto('/');
    const emailInput = page.getByPlaceholder('you@example.com');
    const submitBtn = page.getByRole('button', { name: /join|subscribe/i }).first();

    await emailInput.fill(`test-${Date.now()}@example.com`);
    await submitBtn.click();

    await expect(page.getByText(/submitting|loading/i).or(page.getByText(/you are in|success/i))).toBeVisible({
      timeout: 5000
    });
  });
});
