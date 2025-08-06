import { Page, Locator, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import logger from '../logger'; // Logger instance for debugging

export class CheckoutPage {
  readonly page: Page;
  readonly totalAmount: Locator;


  readonly emailInput: Locator;
  readonly emailInputWrapper: Locator;
  readonly emailErrorMessage: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly postalCodeInput: Locator;
  readonly cityInput: Locator;

  // Card-related error message
  readonly cardErrorMessage: Locator;
  readonly cardNumberWrapper: Locator;

  // Payment button
  readonly payNowButton: Locator;

  // Confirmation page headers
  readonly thankYouHeader: Locator;
  readonly orderDetailsHeader: Locator;
  readonly orderConfirmedHeader: Locator;

  constructor(page: Page) {
    this.page = page;
  // Total amount displayed on the checkout page
    this.totalAmount = page.locator("(//strong[contains(@class,'_19gi7yt0 _19gi7ytk')])[2]");
    this.emailInput = page.locator('#email');
    this.emailInputWrapper = this.emailInput.locator('xpath=ancestor::div[contains(@class,"_7ozb2u6")]');
    this.emailErrorMessage = page.locator('#error-for-email');
    this.cardErrorMessage = page.locator('#error-for-number');

    this.firstNameInput = page.locator("input[placeholder='First name (optional)']");
    this.lastNameInput = page.locator("input[placeholder='Last name']");
    this.addressInput = page.locator("input[placeholder='Address']");
    this.postalCodeInput = page.locator("input[placeholder='Postal code (optional)']");
    this.cityInput = page.locator("input[placeholder='City']");

    this.payNowButton = page.locator('#checkout-pay-button');

    this.thankYouHeader = page.locator("(//h2[contains(text(),'Thank you')])[1]");
    this.orderDetailsHeader = page.locator("//h2[normalize-space(text())='Order details']");
    this.orderConfirmedHeader = page.locator("//h2[normalize-space(text())='Your order is confirmed']");

    this.cardNumberWrapper = page.locator("//label[normalize-space(text())='Card number']/following-sibling::div[contains(@class,'cRSsz')]");
  }

  async validateOnCheckoutPage() {
    logger.info('Validating URL is the checkout page');
    await expect(this.page).toHaveURL(/\/checkouts\//);
  }

  async validateTotalIs(expectedTotal: string) {
    logger.info(`Validating total amount is ${expectedTotal}`);
    await expect(this.totalAmount).toHaveText(expectedTotal);
  }

  async fillContactForm() {
    logger.info('Filling in valid contact form data');
    await this.emailInput.fill(faker.internet.email());
    await this.firstNameInput.fill(faker.person.firstName());
    await this.lastNameInput.fill(faker.person.lastName());
    await this.addressInput.fill(faker.location.streetAddress());
    await this.postalCodeInput.fill('4423113');
    await this.cityInput.fill(faker.location.city());
  }

  async fillContactFormWithInvalidEmail(invalidEmail: string = 'not-an-email') {
    logger.info('Filling in invalid email and other contact details');
    await this.emailInput.fill(invalidEmail);
    await this.firstNameInput.fill(faker.person.firstName());
    await this.lastNameInput.fill(faker.person.lastName());
    await this.addressInput.fill(faker.location.streetAddress());
    await this.postalCodeInput.fill('4423113');
    await this.cityInput.fill(faker.location.city());
  }

  async getCardNumberFrame() {
    logger.info('Accessing iframe for card number input');
    const frame = this.page.frame({ url: /number-ltr.html/ });
    if (!frame) throw new Error('Card number iframe not found');
    await frame.waitForSelector('input[name="number"]', { state: 'visible', timeout: 5000 });
    return frame;
  }

  async fillCreditCardForm() {
    logger.info('Filling in valid credit card information');
    const frame = await this.getCardNumberFrame();
    await frame.locator('input[name="number"]').fill('1');
    await frame.locator('input[name="expiry"]').fill('12/26');
    await frame.locator('#verification_value').fill('777');
    await frame.locator('input[name="name"]').fill('Bogus Gateway');
  }

  async fillInvalidCreditCardForm() {
    logger.info('Filling in invalid credit card information');
    const frame = await this.getCardNumberFrame();
    await frame.locator('input[name="number"]').fill('');
    await frame.locator('input[name="expiry"]').fill('01/26');
    await frame.locator('#verification_value').fill('000');
    await frame.locator('input[name="name"]').fill('Invalid User');
  }

  async clickPayNowButton() {
    logger.info('Clicking on Pay Now button');
    await this.payNowButton.click();
  }

  async validateOnThankYouPage() {
    logger.info('Validating navigation to Thank You page');
    await expect(this.page).toHaveURL(/\/checkouts\/.*\/thank-you/);
    await expect(this.thankYouHeader).toContainText('Thank you');
    await expect(this.orderDetailsHeader).toBeVisible();
    await expect(this.orderConfirmedHeader).toBeVisible();
  }

  async validateErrorsPreventCheckout() {
    logger.info('Validating form errors prevent checkout');
    await expect(this.page).not.toHaveURL(/\/checkouts\/.*\/thank-you/);
    await expect(this.emailErrorMessage).toBeVisible();
    await expect(this.cardErrorMessage).toBeVisible();
    await expect(this.emailErrorMessage).toHaveText('Enter a valid email');
    await expect(this.cardErrorMessage).toHaveText('Enter a card number');
  }

  async validateChangingColor() {
    logger.info('Validating red color appears on error fields');

    const emailColor = await this.emailErrorMessage.evaluate(el => getComputedStyle(el).color);
    expect(emailColor).toBe('rgb(217, 28, 28)');

    const cardColor = await this.cardErrorMessage.evaluate(el => getComputedStyle(el).color);
    expect(cardColor).toBe('rgb(217, 28, 28)');

    await this.emailInputWrapper.waitFor({ state: 'visible' });
    const emailBorderColor = await this.emailInputWrapper.evaluate(el => getComputedStyle(el).borderColor);
    expect(emailBorderColor).toBe('rgb(217, 28, 28)');
  }
}
