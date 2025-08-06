import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  globalSetup: './global-setup',
  retries: 1,
  reporter: [
    ['list'], // Console reporter (shows test list and status)
    ['allure-playwright'], // Allure reporter for HTML reports
    ['html', { open: 'never' }], // Built-in HTML report (open manually after run)
  ],

  use: {
    baseURL: 'https://drpt-external-dev.myshopify.com',
    storageState: 'storageState.json',
    headless: true,   // set to true for CI
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on',
  },
  // Optionally run tests in multiple browsers/devices
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // You can enable Firefox or WebKit if needed:
    // {
    //   name: 'Firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'WebKit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
