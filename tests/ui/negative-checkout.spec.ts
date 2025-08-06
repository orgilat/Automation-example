import { test, expect } from '../../fixtures/testFixtures';
import { allure } from 'allure-playwright';

test.describe('Part 2 - Negative UI Testing', () => {
  test('Invalid Email and Card Number Prevent Checkout', async ({ catalogPage, productPage, cartPage, checkoutPage }) => {
  allure.label('feature', 'ui tests '); 
  allure.description('UI tests- part 1'); 

    await allure.step('Navigate to homepage and unlock with password', async () => {
      await catalogPage.goto();
    });

    await allure.step('Navigate to catalog page', async () => {
      await catalogPage.gotoCatalog();
    });

    await allure.step('Open search and search for "Dropit Hamburger (QA Automation)"', async () => {
      await catalogPage.openSearch();
      await catalogPage.searchProduct('Dropit Hamburger (QA Automation)');
    });

    await allure.step('Validate Hamburger page and click product', async () => {
      await productPage.validatePage();
      await productPage.clickProduct();
    });

    await allure.step('Add 1 Super Large Hamburger to cart', async () => {
      await productPage.selectTooLargeAndAddOne();
    });

    await allure.step('Open search and search for "Dropit Chips (QA Automation)"', async () => {
      await catalogPage.openSearch();
      await catalogPage.searchProduct('Dropit Chips (QA Automation)');
    });

    await allure.step('Validate Chips page and click product', async () => {
      await productPage.validateChipsSearchPage();
      await productPage.clickChipsProduct();
    });

    await allure.step('Add 1 Super Large Chips to cart', async () => {
      await productPage.selectTooLargeAndAddOne();
    });

    await allure.step('Validate cart count is 2 and open cart', async () => {
      await catalogPage.validateCartCountAndClickBag('2');
    });

    await allure.step('Validate subtotal and proceed to checkout', async () => {
      await cartPage.validateCartPageAndSubtotal('£13.00');
      await cartPage.clickCheckout();
    });

    await allure.step('Validate total price is £36.99 on checkout', async () => {
      await checkoutPage.validateTotalIs('£36.99');
    });

    await allure.step('Fill form with invalid email', async () => {
      await checkoutPage.fillContactFormWithInvalidEmail();
    });

    await allure.step('Fill form with invalid credit card details', async () => {
      await checkoutPage.fillInvalidCreditCardForm();
    });

    await allure.step('Click "Pay now" button', async () => {
      await checkoutPage.clickPayNowButton();
    });

    await allure.step('Validate error messages appear and prevent checkout', async () => {
      await checkoutPage.validateErrorsPreventCheckout();
    });

    await allure.step('Validate header color changes to red on error', async () => {
      await checkoutPage.validateChangingColor();
    });

  });
});
