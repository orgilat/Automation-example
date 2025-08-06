import { Page, Locator, expect } from '@playwright/test';
import logger from '../logger'; // Logger instance for debugging

export class ProductPage {
  readonly page: Page;
  readonly productLink: Locator;
  readonly img: Locator;
  readonly mediumSizeOption: Locator;
  readonly tooLargeSizeOption: Locator;
  readonly largeSizeOption: Locator;
  readonly quantityValue: Locator;
  readonly plusButton: Locator;
  readonly minusButton: Locator;
  readonly addToCartButton: Locator;
  readonly chipsLink: Locator;
  readonly chipsImg: Locator;

  constructor(page: Page) {
    this.page = page;

    // Hamburger product link in search results
    this.productLink = page.locator("a.full-unstyled-link[href*='/products/qa-automation-hamburger']");

    // Product image
    this.img = page.locator("img[alt='Dropit Hamburger (QA Automation)']");

    // Size options
    this.mediumSizeOption = page.locator("//label[normalize-space(text())='Medium']");
    this.tooLargeSizeOption = page.locator("label[for='template--15463406600416__main-1-3']");
    this.largeSizeOption = page.locator("//label[normalize-space(text())='Large']");

    // Quantity input + buttons
    this.quantityValue = page.locator('input[name="quantity"]');
    this.plusButton = page.locator('button[name="plus"]');
    this.minusButton = page.locator('button[name="minus"]');

    // Add to cart button
    this.addToCartButton = page.locator('button[name="add"]');

    // Chips product link and image
    this.chipsLink = page.locator("a.full-unstyled-link[href*='/products/dropit-chips-qa-automation']");
    this.chipsImg = page.locator("img[alt='Dropit Chips (QA Automation)']");
  }

  async validatePage() {
    logger.info('Validating Hamburger search result');
    await expect(this.page).toHaveURL(/search\?q=Dropit\+Hamburger/);
    await expect(this.productLink).toBeVisible();
    await expect(this.img).toBeVisible();
  }

  async validateChipsSearchPage() {
    logger.info('Validating Chips search result');
    await expect(this.page).toHaveURL(/search\?q=Dropit\+Chips/);
    await expect(this.chipsLink).toBeVisible();
    await expect(this.chipsImg).toBeVisible();
  }

  async clickProduct() {
    logger.info('Clicking on Hamburger product');
    await this.productLink.click();
  }

  async clickChipsProduct() {
    logger.info('Clicking on Chips product');
    await this.chipsLink.click();
  }

  async setQuantity(target: number) {
    logger.info(`Setting product quantity to ${target}`);
    let current = parseInt(await this.quantityValue.inputValue(), 10);

    while (current > target) {
      await this.minusButton.click();
      current = parseInt(await this.quantityValue.inputValue(), 10);
    }
    while (current < target) {
      await this.plusButton.click();
      current = parseInt(await this.quantityValue.inputValue(), 10);
    }

    await expect(this.quantityValue).toHaveValue(target.toString());
  }

  async selectMediumAndAddTwo() {
    logger.info('Selecting Medium size and adding 2 items to cart');
    await this.mediumSizeOption.click();
    await this.setQuantity(2);
    await this.page.waitForTimeout(1000); // Allow UI update
    await this.addToCartButton.click();
  }

  async selectTooLargeAndAddOne() {
    logger.info('Selecting Too Large size and adding 1 item to cart');
    await this.tooLargeSizeOption.click();
    await this.setQuantity(1);
    await this.addToCartButton.click();
    await this.page.waitForTimeout(1000); // Allow animation to complete
  }

  async selectLargeAndAddTwo() {
    logger.info('Selecting Large size and adding 2 items to cart');
    await this.largeSizeOption.click();
    await this.setQuantity(2);
    await this.page.waitForTimeout(1000); // Allow UI update
    await this.addToCartButton.click();
  }
}