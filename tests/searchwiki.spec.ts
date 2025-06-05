import { chromium, expect } from '@playwright/test';
import { test } from '../fixtures/searchTerm.fixture';
import { searchWikipedia } from '../helpers';

// Test for "Quality Assurance" search on Wikipedia
test.describe('Search for articles', () => {
  const term = 'Quality Assurance';
  test.use({ searchTerm: term });
  test(`Search for ${term} and assert title`, async ({ page }) => {
    await searchWikipedia(page, term);
    await expect(page).toHaveTitle(new RegExp(term, 'i'));
      await expect(page.getByRole('heading', { name: term })).toBeVisible();
    });
    // afterEach hook to log the search term used
    test.afterEach(async ({}) => {
      console.log(`Finished test with search term: ${term}`);
  });
});

// Test for "Playwright" search on Wikipedia
test.describe('Search for articles', () => {
  const term = 'Playwright';
  test.use({ searchTerm: term });
  test(`Search for ${term} and assert title`, async ({ page }) => {
    await searchWikipedia(page, term);
    await expect(page).toHaveTitle(new RegExp(term, 'i'));
      await expect(page.getByRole('heading', { name: term }).first()).toBeVisible();
    });
    // afterEach hook to log the search term used
    test.afterEach(async ({}) => {
      console.log(`Finished test with search term: ${term}`);
  });
});


/*test('Search Quality Assurance and assert Editor name', async ({}) => {
  await page.goto('https://www.wikipedia.org/', { waitUntil: 'networkidle' });
  await page.getByRole('searchbox', { name: 'Search Wikipedia' }).click();
  await page.getByRole('searchbox', { name: 'Search Wikipedia' }).fill('Quality Assurance');
  await page.getByRole('button', { name: 'Search' }).click();
  await page.getByRole('link', { name: 'View history' }).first().click();
  await page.getByRole('button', { name: 'Filter revisions show' }).click();
  await page.getByRole('button', { name: 'Toggle options' }).click();
  await page.locator('#ooui-9').getByText('wikitext editor').click();
  await page.getByRole('button', { name: 'Show revisions' }).click();
  await expect (page.getByRole('link', { name: 'HeyElliott' }).first());
  */