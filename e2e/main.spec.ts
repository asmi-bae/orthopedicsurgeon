import { test, expect } from '@playwright/test';

test.describe('OrthoSync Patient Flows', () => {
  
  test('should allow a user to search for a doctor', async ({ page }) => {
    await page.goto('http://localhost:4200/doctors');
    
    // Check if hero and search exist
    await expect(page.locator('h1')).toContainText('Find the Right Specialist');
    
    const searchInput = page.locator('input[placeholder*="Search"]');
    await searchInput.fill('Sarah');
    
    // Wait for filtered results
    await expect(page.locator('text=Dr. Sarah Johnson')).toBeVisible();
  });

  test('should navigate to doctor detail and start booking', async ({ page }) => {
    await page.goto('http://localhost:4200/doctors');
    await page.click('text=View Profile');
    
    await expect(page.url()).toContain('/doctors/');
    await expect(page.locator('button:has-text("Book Appointment")')).toBeVisible();
    
    await page.click('text=Book Appointment');
    await expect(page.url()).toContain('/book');
  });

});

test.describe('Admin Console Security', () => {
  
  test('should redirect unauthenticated users to login', async ({ page }) => {
    await page.goto('http://localhost:4201/dashboard');
    await expect(page.url()).toContain('/auth/login');
  });

});
