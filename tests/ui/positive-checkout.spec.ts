import { test, expect } from '../../fixtures/testFixtures';
import { allure } from 'allure-playwright';

test.describe('Part 1 - UI Testing', () => {
  test('Positive Scenario: Add products to cart and complete purchase', async ({ catalogPage, productPage, cartPage, checkoutPage }) => {
    allure.label('feature', 'ui tests ');  

    await allure.step('Navigate to homepage', async () => {
      await catalogPage.goto();
    });

    await allure.step('Navigate to catalog', async () => {
      await catalogPage.gotoCatalog();
    });

    await allure.step('Open search modal for Hamburger', async () => {
      await catalogPage.openSearch();
    });

    await allure.step('Search for "Dropit Hamburger (QA Automation)"', async () => {
      await catalogPage.searchProduct('Dropit Hamburger (QA Automation)');
    });

    await allure.step('Validate Hamburger search result and click product', async () => {
      await productPage.validatePage();
      await productPage.clickProduct();
    });

    await allure.step('Add 2 Medium hamburgers to cart', async () => {
      await productPage.selectMediumAndAddTwo();
    });

    await allure.step('Add 1 Super Large hamburger to cart', async () => {
      await productPage.selectTooLargeAndAddOne();
    });

    // ----- רווח ברור בין החלקים -----

    await allure.step('Search for "Dropit Chips (QA Automation)"', async () => {
      await catalogPage.openSearch();
      await catalogPage.searchProduct('Dropit Chips (QA Automation)');
    });

    await allure.step('Validate Dropit Chips search result and click product', async () => {
      await productPage.validateChipsSearchPage();
      await productPage.clickChipsProduct();
    });

    await allure.step('Add 2 Large fries to cart', async () => {
      await productPage.selectLargeAndAddTwo();
    });

    await allure.step('Add 1 Super Large fries to cart', async () => {
      await productPage.selectTooLargeAndAddOne();
    });

    // ----- וידוא חכם -----

    await allure.step('Validate cart count is 6 and open bag', async () => {
      await catalogPage.validateCartCountAndClickBag('6');
    });

    await allure.step('Validate cart page subtotal and proceed to checkout', async () => {
      await cartPage.validateCartPageAndSubtotal('£33.00');
      await cartPage.clickCheckout();
    });

    // ----- צ׳קאאוט -----

    await allure.step('Validate total is £56.99 on checkout page', async () => {
      await checkoutPage.validateTotalIs('£56.99');
    });

    await allure.step('Fill contact form with valid data', async () => {
      await checkoutPage.fillContactForm();
    });

    await allure.step('Fill credit card details and click Pay Now', async () => {
      await checkoutPage.fillCreditCardForm(); // Card number: 1, Exp: 12/26, CVC: 777, Name: Bogus Gateway
      await checkoutPage.clickPayNowButton();
    });

    await allure.step('Verify Thank You page is displayed (order confirmation)', async () => {
      await checkoutPage.validateOnThankYouPage();
    });
  });
});
