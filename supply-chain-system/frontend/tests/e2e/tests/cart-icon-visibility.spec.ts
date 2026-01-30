import { test, expect } from '@playwright/test';
import { HeaderPage } from '../pages/HeaderPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

test.describe('Cart Icon Visibility Scenarios', () => {
  let headerPage: HeaderPage;
  let productPage: ProductPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    // Setup: Navigate to the app and initialize Page Objects
    headerPage = new HeaderPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    await page.goto('/'); // Use baseURL from config
  });

  test.afterEach(async ({ page }) => {
    // Teardown: Clear localStorage and close page if needed
    await page.evaluate(() => localStorage.clear());
  });

  test('Cart icon visible in header on home page', async () => {
    // Scenario 1: Verify cart icon is visible on home page
    const isVisible = await headerPage.isCartIconVisible();
    expect(isVisible).toBe(true);
  });

  test('Cart icon visible after navigation to products', async () => {
    // Scenario 2: Navigate to products and verify cart icon remains visible
    await productPage.navigateToProducts();
    const isVisible = await headerPage.isCartIconVisible();
    expect(isVisible).toBe(true);
  });

  test('Cart icon visible on all pages', async () => {
    // Scenario 3: Navigate through multiple pages and verify visibility
    const pages = ['/', '/products', '/cart']; // Based on app routes
    for (const pageUrl of pages) {
      await headerPage.navigateTo(pageUrl);
      const isVisible = await headerPage.isCartIconVisible();
      expect(isVisible).toBe(true);
    }
  });

  test('Badge displays "0" when cart is empty', async () => {
    // Scenario 4: Verify badge shows "0" for empty cart
    await headerPage.assertBadgeHidden(); // Badge hidden when empty
    // Alternatively, if badge shows "0", check count
    const count = await headerPage.getCartItemCount();
    expect(count).toBe('0');
  });

  test('Icon remains visible after page refresh', async () => {
    // Scenario 5: Refresh page and verify icon persists
    await headerPage.page.reload();
    const isVisible = await headerPage.isCartIconVisible();
    expect(isVisible).toBe(true);
  });
});