import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  // Selectors based on cart page structure (assumed from frontend components)
  private readonly cartItems: Locator;
  private readonly removeItemButton: (itemId: string) => Locator;
  private readonly itemQuantity: (itemId: string) => Locator;
  private readonly totalPrice: Locator;
  private readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = page.locator('[data-testid="cart-items"]');
    this.removeItemButton = (itemId: string) => page.locator(`[data-testid="remove-item-${itemId}"]`);
    this.itemQuantity = (itemId: string) => page.locator(`[data-testid="item-quantity-${itemId}"]`);
    this.totalPrice = page.locator('[data-testid="cart-total"]');
    this.checkoutButton = page.locator('[data-testid="checkout-button"]');
  }

  // Method to navigate to cart page
  async navigateToCart(): Promise<void> {
    await this.navigateTo('/cart');
  }

  // Method to get the number of items in cart
  async getCartItemCount(): Promise<number> {
    return await this.cartItems.locator('[data-testid^="cart-item-"]').count();
  }

  // Method to remove an item from cart by ID
  async removeItemFromCart(itemId: string): Promise<void> {
    await this.removeItemButton(itemId).click();
  }

  // Method to get item quantity by ID
  async getItemQuantity(itemId: string): Promise<string> {
    return await this.itemQuantity(itemId).textContent() || '';
  }

  // Method to get total cart price
  async getTotalPrice(): Promise<string> {
    return await this.totalPrice.textContent() || '';
  }

  // Method to click checkout
  async clickCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  // Method to assert cart is empty
  async assertCartEmpty(): Promise<void> {
    await this.cartItems.waitFor({ state: 'hidden' });
  }

  // Method to assert item is in cart
  async assertItemInCart(itemId: string): Promise<void> {
    await this.page.locator(`[data-testid="cart-item-${itemId}"]`).waitFor({ state: 'visible' });
  }
}