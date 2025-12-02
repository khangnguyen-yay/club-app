import { test,expect } from '@playwright/test';


test('SearchBar component should be visible on the page', async ({ page }) => {
  // Go to the page where SearchBar is supposed to render (ex: explore page)
  await page.goto('http://localhost:5173/explore');

  // Check that the search bar exists
  const searchBar = page.getByPlaceholder('Search clubs...');
  await expect(searchBar).toBeVisible();
});

test('Typing Test in search Bar', async ({ page }) => {
  //go to explore page
  await page.goto('http://localhost:5173/explore');
  const searchBar = page.getByPlaceholder('Search clubs...');

  await searchBar.fill('Test');
  await expect(searchBar).toHaveValue('Test');
});

/* TESTING NOTES */
/* The next two tests were implemented before OAuth integration. 
  Since OAuth is now implemented, this requires session cookies to be sent from the playwright broswer for the explore page to render cards.
  Following commands on the README can be used to set up playwright with session cookies. 
  However, these tests failing is a message that the user is not authenticated and thus the explore page does not render any club cards. */
  
test('Search bar input filters club list', async ({ page }) => {
  await page.goto('http://localhost:5173/explore');

  const searchTerm = "ACM"; //using this as test since there is only one club with ACM in the name in sample data
  const expectedCards = ["ACM Teach LA"];
  await page.getByPlaceholder('Search clubs...').fill(searchTerm);
  const clubCards = page.getByTestId('club-card'); // Assuming each club card has a data-testid 'club-card'

  await expect(clubCards).toHaveCount(expectedCards.length);

  await expect(clubCards).toContainText(expectedCards);
});

test('Search input and category filter work together', async ({ page }) => {
  await page.goto('http://localhost:5173/explore');

  const categoryToSelect = "Academic";
  await page.getByRole('combobox').selectOption(categoryToSelect);

  const searchTerm = "Phi";
  await page.getByPlaceholder("Search clubs...").fill(searchTerm);
  const clubCards = page.getByTestId('club-card');

  const expectedClubs = ["Philosophy Club at UCLA", "Eta Sigma Phi - Honorary Society for Classical Studies"]; // must match club_name exactly
  await expect(clubCards).toHaveCount(expectedClubs.length);
  await expect(clubCards).toContainText(expectedClubs);

});