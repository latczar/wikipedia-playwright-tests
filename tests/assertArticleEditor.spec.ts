import { chromium, expect } from '@playwright/test';
import { test } from '../fixtures/searchTerm.fixture';
import { searchWikipedia } from '../helpers';

// Parameterize the test with a search term and latest editor
const testCases = [
  { term: 'Tester', latestEditor: 'Jiltedsquirrel' },
  { term: 'TypeScript', latestEditor: 'Jerryobject' }
];

// Check latest editor of an article on Wikipedia
test.describe('Assert latest editor of an article', () => {
  for (const { term, latestEditor } of testCases) {
    test(`Search for ${term} and assert the latest respective editor: ${latestEditor}`, async ({ page }) => {
      await searchWikipedia(page, term);
      // Assert the title and heading of the article
      await expect(page).toHaveTitle(new RegExp(term, 'i'));
      await expect(page.getByRole('heading', { name: term })).toBeVisible();
      await page.getByRole('link', { name: 'View history' }).first().click();

      // Assert the latest editor (topmost in the history list).
      await expect(page.getByRole('link', { name: latestEditor }).first()).toBeVisible();
    });
  }

  // afterEach hook to attach a screenshot to the test report on failure
  test.afterEach(async ({ page }, testInfo) => {
    // Only take a screenshot if the test failed
    if (testInfo.status !== testInfo.expectedStatus) {
      const screenshot = await page.screenshot();
      await testInfo.attach(
        `screenshot-${testInfo.title.replace(/[^a-z0-9\-]/gi, '_')}`,
        { body: screenshot, contentType: 'image/png' }
      );
    }
  });
});

/*
test('Search Quality Assurance and assert Editor name', async ({}) => {
  await page.goto('https://www.wikipedia.org/', { waitUntil: 'networkidle' });
  await page.getByRole('searchbox', { name: 'Search Wikipedia' }).click();
  await page.getByRole('searchbox', { name: 'Search Wikipedia' }).fill('Quality Assurance');
  await page.getByRole('button', { name: 'Search' }).click();
  await page.getByRole('link', { name: 'View history' }).first().click();
  await page.getByRole('button', { name: 'Filter revisions show' }).click();
  await page.getByRole('button', { name: 'Toggle options' }).click();
  await page.locator('#ooui-9').getByText('wikitext editor').click();
  await page.getByRole('button', { name: 'Show revisions' }).click();
  await expect(page.getByRole('link', { name: 'HeyElliott' }).first());
});
*/