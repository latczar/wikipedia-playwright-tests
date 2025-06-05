import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  retries: 0,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    baseURL: '',
    storageState: '.auth/login.json', // Use the storage state created by global-setup
  },
  reporter: [['html', { open: 'never' }]],
  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    // Add more browsers as needed
  ],
  globalSetup: require.resolve('./global-setup.ts'), // adjust path if needed
  globalTeardown: require.resolve('./global-teardown.ts'), // teardown after all tests have run
});