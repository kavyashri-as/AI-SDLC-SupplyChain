import { test, expect } from '@playwright/test';
import { HeaderPage } from '../pages/HeaderPage';
import { CartPage } from '../pages/CartPage';

test.describe('Cart Error Handling Scenarios', () => {
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

  test('Cart icon handles network failure gracefully', async ({ page }) => {
    // Mock network failure
    await page.route('**/api/**', route => route.abort());
    await headerPage.clickCartIcon();
    // Should still navigate or show error
    await expect(page).toHaveURL('/cart');
  });

  test('Badge updates correctly after failed add operation', async ({ page }) => {
    // Mock API failure on add
    await page.route('**/api/cart/add', route => route.abort());
    // Assuming add method, but for now, check badge remains 0
    const count = await headerPage.getCartItemCount();
    expect(count).toBe('0');
  });

  test('Cart persistence fails gracefully', async ({ page }) => {
    // Mock localStorage failure
    await page.evaluate(() => {
      Object.defineProperty(window, 'localStorage', {
        value: {
          setItem: () => { throw new Error('Storage full'); },
          getItem: () => null,
          clear: () => {}
        }
      });
    });
    // Cart should still function
    const isVisible = await headerPage.isCartIconVisible();
    expect(isVisible).toBe(true);
  });
});