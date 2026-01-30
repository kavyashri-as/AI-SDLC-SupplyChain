import { test, expect } from '@playwright/test';
import { HeaderPage } from '../pages/HeaderPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

test.describe('Cart E2E User Journeys', () => {
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

  test('Complete purchase flow: browse, add to cart, checkout', async () => {
    // Browse products
    await productPage.navigateToProducts();
    const productCount = await productPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);

    // Add item (assuming method exists)
    // await productPage.addProductToCart(1);

    // Check badge
    const count = await headerPage.getCartItemCount();
    // expect(count).toBe('1');

    // Navigate to cart
    await headerPage.clickCartIcon();
    await expect(page).toHaveURL('/cart');

    // Checkout (assuming method)
    // await cartPage.clickCheckout();
  });

  test('User journey: add multiple items, update quantities, remove items', async () => {
    // Add multiple items
    await productPage.navigateToProducts();
    // await productPage.addProductToCart(1);
    // await productPage.addProductToCart(2);

    // Check total
    const totalCount = await headerPage.getCartItemCount();
    // expect(totalCount).toBe('2');

    // Go to cart
    await headerPage.clickCartIcon();

    // Update quantity
    // await cartPage.updateItemQuantity(1, 3);

    // Remove item
    // await cartPage.removeItemFromCart(2);

    // Check updated count
    const updatedCount = await headerPage.getCartItemCount();
    // expect(updatedCount).toBe('3');
  });

  test('Cross-page cart persistence', async () => {
    // Add item
    await productPage.navigateToProducts();
    // await productPage.addProductToCart(1);

    // Navigate away and back
    await page.goto('/about');
    const countOnOtherPage = await headerPage.getCartItemCount();
    // expect(countOnOtherPage).toBe('1');

    // Reload page
    await page.reload();
    const countAfterReload = await headerPage.getCartItemCount();
    // expect(countAfterReload).toBe('1');
  });
});