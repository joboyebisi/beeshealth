import { expect, test } from '@playwright/test';

test.describe('patient visit companion', () => {
  test('enforces consent before confirmation and sharing', async ({ page }) => {
    const browserErrors = [];
    page.on('pageerror', error => browserErrors.push(error.message));

    await page.goto('/');
    await expect(page).toHaveTitle(/BEES Health/);

    await page.locator('#beginRecording').click();
    await expect(page.locator('#toast')).toContainText('Both patient and clinician');

    await page.locator('#patientConsent').check();
    await page.locator('#doctorConsent').check();
    await page.locator('#beginRecording').click();
    await expect(page.locator('#recordDot')).toContainText('Recording');

    await page.locator('#confirm').click();
    await expect(page.locator('#statusBadge')).toContainText('Clinician confirmed');
    await expect(page.locator('#share')).toBeVisible();
    await expect(page.locator('.fact')).toHaveCount(3);

    await page.locator('#share').click();
    await expect(page.locator('#toast')).toContainText('recipient-bound link');
    expect(browserErrors).toEqual([]);
  });
});

test.describe('clinic workflow', () => {
  test('moves from consent through review to the patient handoff', async ({ page }) => {
    const browserErrors = [];
    page.on('pageerror', error => browserErrors.push(error.message));

    await page.goto('/clinic.html');
    await page.locator('#record').click();
    await expect(page.locator('#toast')).toContainText('Both patient and clinician');

    await page.locator('#pc').check();
    await page.locator('#cc').check();
    await page.locator('#record').click();
    await expect(page.locator('.status')).toContainText('RECORDING');

    await page.locator('[data-view="review"]').click();
    await page.locator('#confirmAll').click();
    await expect(page.locator('#toast')).toContainText('Check all three');
    for (const box of await page.locator('.confirm').all()) await box.check();
    await page.locator('#confirmAll').click();
    await expect(page.locator('#draftBadge')).toContainText('ready to share');

    await page.locator('[data-view="patient"]').click();
    await page.locator('#share').click();
    await expect(page.locator('#toast')).toContainText('secure link');
    await page.locator('#approveReminder').click();
    await expect(page.locator('#toast')).toContainText('reminder is now schedulable');
    expect(browserErrors).toEqual([]);
  });
});
