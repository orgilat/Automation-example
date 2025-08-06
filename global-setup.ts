import { chromium, FullConfig, expect } from '@playwright/test';

async function globalSetup(config?: FullConfig) {
  const browser = await chromium.launch({ headless: true });

  const context = await browser.newContext({
    locale: 'en-GB', // ✅ מגדיר את השפה והמטבע לבריטניה
  });

  const page = await context.newPage();
  console.log('🔥 globalSetup התחיל לפעול');
  await page.goto('https://drpt-external-dev.myshopify.com/password');
  await page.fill("input[type='password']", 'giclao');
  await page.click("button[type='submit']");
  const shopAllButton = page.locator("//a[normalize-space(text())='Shop all']");
  await expect(shopAllButton).toBeVisible({ timeout: 10000 });
  await context.storageState({ path: 'storageState.json' });
  console.log('✅ storageState.json נשמר בהצלחה');

  await browser.close();
}

export default globalSetup;
