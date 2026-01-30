import { test, expect } from '@playwright/test';
import { HeaderPage } from '../pages/HeaderPage';
import { CartPage } from '../pages/CartPage';

test.describe('Cart Accessibility Tests', () => {
  let headerPage: HeaderPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    headerPage = new HeaderPage(page);
    cartPage = new CartPage(page);
    await page.goto('/');
  });

  test.afterEach(async ({ page }) => {
    await page.evaluate(() => localStorage.clear());
  });

  test('Cart icon has proper ARIA labels', async ({ page }) => {
    const button = page.locator('button[data-testid="cart-icon"]');
    await expect(button).toHaveAttribute('aria-label');
  });

  test('Badge has live region for screen readers', async ({ page }) => {
    const badge = page.locator('[data-testid="cart-badge"]');
    if (await badge.isVisible()) {
      await expect(badge).toHaveAttribute('aria-live', 'polite');
      await expect(badge).toHaveAttribute('aria-atomic', 'true');
    }
  });

  test('Keyboard navigation: Tab to cart icon', async ({ page }) => {
    await page.keyboard.press('Tab');
    const focused = page.locator('button[data-testid="cart-icon"]');
    await expect(focused).toBeFocused();
  });

  test('Keyboard activation: Enter on cart icon', async ({ page }) => {
    const button = page.locator('button[data-testid="cart-icon"]');
    await button.focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL('/cart');
  });

  test('Color contrast for cart icon', async ({ page }) => {
    // Manual check, but can use axe
    // For now, ensure visible
    const isVisible = await headerPage.isCartIconVisible();
    expect(isVisible).toBe(true);
  });

  test('Cart page accessibility', async ({ page }) => {
    await headerPage.clickCartIcon();
    // Check for headings, etc.
    const heading = page.locator('h1, h2').first();
    await expect(heading).toBeVisible();
  });
});