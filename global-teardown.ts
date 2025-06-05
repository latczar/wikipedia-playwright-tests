import { chromium } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

async function globalTeardown() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://en.wikipedia.org/w/index.php?title=Special:UserLogout', 
    { waitUntil: 'networkidle' });

  // Try to click the logout link if it exists
  const logoutLink = page.getByRole('link', { name: /log out/i });
  if (await logoutLink.isVisible()) {
    await logoutLink.click();
    console.log('Clicked logout link.');
  } else {
    console.log('No logout link found, likely already logged out.');
  }

  await browser.close();
}
export default globalTeardown;