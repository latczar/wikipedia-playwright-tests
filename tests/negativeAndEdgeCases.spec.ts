import { test } from '../fixtures/searchTerm.fixture';
import { expect } from '@playwright/test';
import { searchWikipedia } from '../helpers';

// Parameterized negative and edge case tests for Wikipedia search
// Each test case represents a search term that is expected to return no results.
const testCases = [
  { term: 'asfjklasjdf' },   // unlikely to exist (random string)
  { term: '#$%^&*' }         // special characters (edge case)
];

test.describe('Negative and Edge Cases for Wikipedia Search', () => {
  for (const { term } of testCases) {
    test(`Search for "${term}" and expect no results`, async ({ page }) => {
      // Step 1: Perform the app search using the helper function
      await test.step('Search Wikipedia for the term', async () => {
        await searchWikipedia(page, term);
      });

      // Step 2: Assert that the "no results" message is visible on the page
      // This checks that the app correctly handles invalid or edge-case searches
      await test.step('Assert no results message is visible', async () => {
        await expect(page.getByText('There were no results matching the query.')).toBeVisible();
      });
    });
  }
});