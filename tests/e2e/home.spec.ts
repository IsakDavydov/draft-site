import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check that the page loads
    await expect(page).toHaveTitle(/FootballSite/);
    
    // Check that main sections are present
    await expect(page.getByText('Season')).toBeVisible();
    await expect(page.getByText('Draft')).toBeVisible();
    await expect(page.getByText('Picks')).toBeVisible();
    await expect(page.getByText('Fantasy')).toBeVisible();
  });

  test('should navigate to season page', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Season').click();
    await expect(page).toHaveURL('/season');
  });

  test('should navigate to draft page', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Draft').click();
    await expect(page).toHaveURL('/draft');
  });

  test('should navigate to picks page', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Picks').click();
    await expect(page).toHaveURL('/picks');
  });

  test('should navigate to fantasy page', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Fantasy').click();
    await expect(page).toHaveURL('/fantasy');
  });
});
