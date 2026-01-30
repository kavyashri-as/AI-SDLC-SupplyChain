import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HeaderPage extends BasePage {
  // Selectors based on Header.tsx structure (e.g., button with ShoppingCartIcon, badge span)
  private readonly cartIconButton: Locator;
  private readonly cartBadge: Locator;
  private readonly cartItemCount: Locator;

  constructor(page: Page) {
    super(page);
    this.cartIconButton = page.locator('button[data-testid="cart-icon"]'); // Assumes data-testid from Header.tsx
    this.cartBadge = page.locator('[data-testid="cart-badge"]'); // Badge container
    this.cartItemCount = page.locator('[data-testid="cart-item-count"]'); // Text inside badge
  }

  // Method to click the cart icon and navigate to cart page
  async clickCartIcon(): Promise<void> {
    await this.cartIconButton.click();
  }

  // Method to check if cart icon is visible
  async isCartIconVisible(): Promise<boolean> {
    return await this.cartIconButton.isVisible();
  }

  // Method to get the current item count from the badge
  async getCartItemCount(): Promise<string> {
    if (await this.cartBadge.isVisible()) {
      return await this.cartItemCount.textContent() || '';
    }
    return '0'; // Badge hidden means 0 items
  }

  // Method to assert badge is hidden when cart is empty
  async assertBadgeHidden(): Promise<void> {
    await this.cartBadge.waitFor({ state: 'hidden' });
  }

  // Method to assert badge shows correct count
  async assertBadgeCount(expectedCount: number): Promise<void> {
    await this.cartBadge.waitFor({ state: 'visible' });
    const countText = await this.getCartItemCount();
    expect(countText).toBe(expectedCount.toString());
  }

  // Method to wait for badge update after cart changes (from spec.md real-time updates)
  async waitForBadgeUpdate(expectedCount: number, timeout: number = 100): Promise<void> {
    await this.page.waitForFunction(
      (expected) => {
        const badge = document.querySelector('[data-testid="cart-item-count"]');
        return badge && badge.textContent === expected.toString();
      },
      expectedCount,
      { timeout }
    );
  }
}