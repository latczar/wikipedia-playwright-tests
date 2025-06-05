import { chromium } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://en.wikipedia.org/wiki/Special:UserLogin');
  await page.getByRole('textbox', { name: 'Username' }).fill(process.env.WIKI_USERNAME as string);
  await page.getByRole('textbox', { name: 'Password' }).fill(process.env.WIKI_PASSWORD as string);
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.context().storageState({ path: '.auth/login.json' });
  await browser.close();
}
export default globalSetup;