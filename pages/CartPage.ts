import { Page, Locator, expect } from '@playwright/test';
import logger from '../logger'; // Logger instance for debugging

export class CartPage {
  readonly page: Page;
  readonly subtotalValue: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Subtotal amount in cart summary
    this.subtotalValue = page.locator('p.totals__subtotal-value');

    // Checkout button
    this.checkoutButton = page.locator('#checkout');
  }

  async validateCartPageAndSubtotal(expectedValue: string) {
    logger.info(`Validating cart URL and subtotal = ${expectedValue}`);
    await expect(this.page).toHaveURL(/\/cart/);
    await expect(this.subtotalValue).toContainText(expectedValue);
  }

  async clickCheckout() {
    logger.info('Clicking checkout button');
    await expect(this.checkoutButton).toBeVisible();
    await this.checkoutButton.click();
  }
}
