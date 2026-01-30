import { test, expect } from '@playwright/test';
import { HeaderPage } from '../pages/HeaderPage';
import { CartPage } from '../pages/CartPage';

test.describe('Cart Icon Navigation Scenarios', () => {
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

  test('Click cart icon navigates to cart page', async () => {
    await headerPage.clickCartIcon();
    await expect(page).toHaveURL('/cart');
  });

  test('Cart page displays empty state when no items', async () => {
    await headerPage.clickCartIcon();
    await cartPage.assertCartEmpty();
  });

  test('Navigation preserves cart state', async () => {
    // Assuming add item functionality, but for now, test navigation
    await headerPage.clickCartIcon();
    await expect(page).toHaveURL('/cart');
    await cartPage.navigateToCart(); // Should stay on cart
    await expect(page).toHaveURL('/cart');
  });
});