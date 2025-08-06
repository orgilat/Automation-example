import { Page, Locator, expect } from '@playwright/test';
import logger from '../logger'; // Logger instance for debugging

export class CatalogPage {
  readonly page: Page;
  readonly catalogLabel: Locator;
  readonly searchButton: Locator;
  readonly searchInput: Locator;
  readonly cartCount: Locator;
  readonly bagIcon: Locator;

  constructor(page: Page) {
    this.page = page;

    // Catalog menu label
    this.catalogLabel = page.locator("//span[normalize-space(text())='Catalog']");

    // Search button opens the search input modal
    this.searchButton = page.locator("(//summary[@role='button']//span)[2]");

    // Search input field inside the modal
    this.searchInput = page.locator('#Search-In-Modal');

    // Shopping cart item count (visually shown to user)
    this.cartCount = page.locator("(//span[@aria-hidden='true'])[2]");

    // Bag icon used to open the cart
    this.bagIcon = page.locator('#cart-icon-bubble');
  }

  async goto() {
    logger.info('Navigating to homepage');
    await this.page.goto('/');
  }

  async gotoCatalog() {
    logger.info('Clicking on Catalog menu');
    await this.catalogLabel.click();
  }

  async openSearch() {
    logger.info('Opening search modal');
    await this.searchButton.click();
  }

  async searchProduct(name: string) {
    logger.info(`Searching for product: ${name}`);
    await this.searchInput.fill(name);
    await this.searchInput.press('Enter');
  }

  async validateCartCountAndClickBag(expectedText: string) {
    logger.info(`Validating cart has ${expectedText} items and clicking bag icon`);
    await expect(this.cartCount).toHaveText(expectedText);
    await this.bagIcon.click();
    await this.page.waitForTimeout(1500); // Wait for cart to fully open
  }
}