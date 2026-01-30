import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration scoped to Chromium and Edge only.
 */
export default defineConfig({
  testDir: './tests/e2e',
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:5137',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'edge',
      use: {
        ...devices['Desktop Edge'],
        launchOptions: {
          ...devices['Desktop Edge'].launchOptions,
          args: ['--headless=new'],
        },
      },
    },
  ],
  webServer: undefined,
});
