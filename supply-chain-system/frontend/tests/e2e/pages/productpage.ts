import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  // Selectors based on product listing structure (assumed from frontend components)
  private readonly productList: Locator;
  private readonly addToCartButton: (productId: string) => Locator;
  private readonly productPrice: (productId: string) => Locator;

  constructor(page: Page) {
    super(page);
    this.productList = page.locator('[data-testid="product-list"]');
    this.addToCartButton = (productId: string) => page.locator(`[data-testid="add-to-cart-${productId}"]`);
    this.productPrice = (productId: string) => page.locator(`[data-testid="product-price-${productId}"]`);
  }

  // Method to navigate to products page
  async navigateToProducts(): Promise<void> {
    await this.navigateTo('/products');
  }

  // Method to get the number of products displayed
  async getProductCount(): Promise<number> {
    return await this.productList.locator('[data-testid^="product-"]').count();
  }

  // Method to add a product to cart by ID
  async addProductToCart(productId: string): Promise<void> {
    await this.addToCartButton(productId).click();
  }

  // Method to get product price by ID
  async getProductPrice(productId: string): Promise<string> {
    return await this.productPrice(productId).textContent() || '';
  }

  // Method to assert a product is visible
  async assertProductVisible(productId: string): Promise<void> {
    await this.page.locator(`[data-testid="product-${productId}"]`).waitFor({ state: 'visible' });
  }
}