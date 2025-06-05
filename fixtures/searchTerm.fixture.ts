import { test as base } from '@playwright/test';

// This fixture provides a search term for your tests
export const test = base.extend<{ searchTerm: string }>({
  searchTerm: async ({}, use, testInfo) => {
    await use('Quality Assurance'); // Default search term but can be overridden using testInfo
  }
});