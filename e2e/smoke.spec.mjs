import { expect, test } from '@playwright/test';

for (const route of ['/', '/clinic.html']) {
  test(`${route} loads without browser errors`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const response = await page.goto(route);
    expect(response?.ok()).toBeTruthy();
    await expect(page.locator('body')).toBeVisible();
    expect(errors).toEqual([]);
  });
}
