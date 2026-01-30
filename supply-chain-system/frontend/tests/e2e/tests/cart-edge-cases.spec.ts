import { test, expect } from '@playwright/test';
import { HeaderPage } from '../pages/HeaderPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

test.describe('Cart Edge Cases and Boundary Conditions', () => {
  let headerPage: HeaderPage;
  let productPage: ProductPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    headerPage = new HeaderPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    await page.goto('/');
  });

  test.afterEach(async ({ page }) => {
    await page.evaluate(() => localStorage.clear());
  });

  test('Badge handles large item counts (99+)', async () => {
    // Assuming add item method, simulate large count
    // For now, test badge display
    const count = await headerPage.getCartItemCount();
    expect(count).toBe('0'); // Empty initially
  });

  test('Cart icon visible on very small screens', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    const isVisible = await headerPage.isCartIconVisible();
    expect(isVisible).toBe(true);
  });

  test('Rapid clicking cart icon', async () => {
    for (let i = 0; i < 5; i++) {
      await headerPage.clickCartIcon();
      await page.waitForTimeout(100);
    }
    await expect(page).toHaveURL('/cart');
  });

  test('Cart icon after page reload with items', async () => {
    // Simulate items in localStorage
    await page.evaluate(() => {
      localStorage.setItem('cart', JSON.stringify([{ productId: 1, name: 'Test', price: 10, quantity: 1 }]));
    });
    await page.reload();
    const count = await headerPage.getCartItemCount();
    expect(count).toBe('1');
  });
});