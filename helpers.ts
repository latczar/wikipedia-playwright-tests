import { Page } from '@playwright/test';

/**
 * Helper function to perform a Wikipedia search.
 * Navigates to Wikipedia, fills the search box with the given term,
 * and clicks the search button.
 * Use this to avoid repeating search steps in multiple tests.
 */

export async function searchWikipedia(page: Page, term: string) {
    await page.goto('https://www.wikipedia.org/', { waitUntil: 'networkidle' });
    await page.getByRole('searchbox', { name: 'Search Wikipedia' }).click();
    await page.getByRole('searchbox', { name: 'Search Wikipedia' }).fill(term);
    await page.getByRole('button', { name: 'Search' }).click();
}