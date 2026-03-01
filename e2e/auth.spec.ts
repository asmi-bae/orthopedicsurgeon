import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should allow a patient to register and login', async ({ page }) => {
    // 1. Register
    await page.goto('http://localhost:4200/auth/register');
    await page.fill('input[formControlName="firstName"]', 'John');
    await page.fill('input[formControlName="lastName"]', 'Doe');
    await page.fill('input[formControlName="email"]', 'john.doe@example.com');
    await page.fill('input[formControlName="phone"]', '1234567890');
    await page.fill('input[formControlName="password"]', 'Password123!');
    await page.click('button[type="submit"]');

    await expect(page.locator('.success')).toBeVisible();

    // 2. Login
    await page.goto('http://localhost:4200/auth/login');
    await page.fill('input[formControlName="email"]', 'john.doe@example.com');
    await page.fill('input[formControlName="password"]', 'Password123!');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('should require 2FA for admin login', async ({ page }) => {
    // This assumes an admin user already exists in the test DB
    await page.goto('http://localhost:4201/auth/login');
    await page.fill('input[formControlName="email"]', 'admin@orthopedic.com');
    await page.fill('input[formControlName="password"]', 'AdminPass123!');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/.*auth\/2fa/);
    await expect(page.locator('h2')).toContainText('2FA Verification');
  });
});
