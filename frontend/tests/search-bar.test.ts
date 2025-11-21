import { test,expect } from '@playwright/test';


test('SearchBar component should be visible on the page', async ({ page }) => {
  // Go to the page where SearchBar is supposed to render (ex: explore page)
  await page.goto('http://localhost:5173/explore');

  // Check that the search bar exists
  const searchBar = page.getByPlaceholder('Search clubs...');
  await expect(searchBar).toBeVisible();
});