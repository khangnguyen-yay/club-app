import { chromium } from '@playwright/test';

(async () => {
  // Launch browser in **headed mode**
  const browser = await chromium.launch({ headless: false }); 
  const context = await browser.newContext();
  const page = await context.newPage();

  // Go to your app login page
  await page.goto('http://localhost:5173/login');

  console.log('Please log in with Google manually in the opened browser...');

  // Wait until redirected to the authenticated page
  // Increase timeout if needed
  await page.waitForURL('http://localhost:5173/explore', { timeout: 0 });

  // Save storage state
  await context.storageState({ path: 'storageState.json' });
  console.log('Storage state saved to storageState.json');

  await browser.close();
})();
