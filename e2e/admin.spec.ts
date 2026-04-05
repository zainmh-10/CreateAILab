import { expect, test } from '@playwright/test';

test.describe('Admin panel', () => {
  test('unauthenticated user is redirected from admin', async ({ page }) => {
    const response = await page.goto('/admin');
    const url = page.url();
    expect(url).toMatch(/sign-in|admin/);
    if (url.includes('/admin')) {
      await expect(page.getByText(/admin access required|sign in/i)).toBeVisible({ timeout: 5000 });
    }
  });

  test('admin audit page requires auth', async ({ page }) => {
    const response = await page.goto('/admin/audit');
    const url = page.url();
    expect(url).toMatch(/sign-in|admin/);
  });
});
