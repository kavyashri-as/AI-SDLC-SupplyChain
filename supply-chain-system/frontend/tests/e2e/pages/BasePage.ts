import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Common navigation methods
  async navigateTo(url: string): Promise<void> {
    try {
      await this.page.goto(url);
      await this.log(`Navigated to ${url}`);
    } catch (error) {
      await this.handleError(`Failed to navigate to ${url}`, error as Error);
    }
  }

  async goBack(): Promise<void> {
    try {
      await this.page.goBack();
      await this.log('Navigated back');
    } catch (error) {
      await this.handleError('Failed to navigate back', error as Error);
    }
  }

  async goForward(): Promise<void> {
    try {
      await this.page.goForward();
      await this.log('Navigated forward');
    } catch (error) {
      await this.handleError('Failed to navigate forward', error as Error);
    }
  }

  // Wait utilities
  async waitForLoadState(state: 'load' | 'domcontentloaded' | 'networkidle' = 'load'): Promise<void> {
    await this.page.waitForLoadState(state);
  }

  async waitForSelector(selector: string, options?: { timeout?: number; state?: 'attached' | 'detached' | 'visible' | 'hidden' }): Promise<void> {
    await this.page.waitForSelector(selector, options);
  }

  async waitForTimeout(milliseconds: number): Promise<void> {
    await this.page.waitForTimeout(milliseconds);
  }

  // Screenshot helpers
  async takeScreenshot(name: string): Promise<void> {
    const screenshotPath = `screenshots/${name}-${Date.now()}.png`;
    await this.page.screenshot({ path: screenshotPath, fullPage: true });
    await this.log(`Screenshot saved to ${screenshotPath}`);
  }

  async takeElementScreenshot(locator: Locator, name: string): Promise<void> {
    const screenshotPath = `screenshots/${name}-${Date.now()}.png`;
    await locator.screenshot({ path: screenshotPath });
    await this.log(`Element screenshot saved to ${screenshotPath}`);
  }

  // Error handling
  protected async handleError(message: string, error: Error): Promise<void> {
    await this.log(`Error: ${message} - ${error.message}`);
    await this.takeScreenshot(`error-${Date.now()}`);
    throw new Error(`${message}: ${error.message}`);
  }

  // Logging capabilities
  protected async log(message: string): Promise<void> {
    console.log(`[${new Date().toISOString()}] ${this.constructor.name}: ${message}`);
  }

  // Additional utility: Assert page title
  async assertPageTitle(expectedTitle: string): Promise<void> {
    const title = await this.page.title();
    expect(title).toBe(expectedTitle);
  }
}