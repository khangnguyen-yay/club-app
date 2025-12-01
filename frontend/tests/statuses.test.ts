import { test, expect } from "@playwright/test";
import { fetchClubsByStatus } from "../src/apiHelpers";

test('Selecting applied button adds club to applied category in backend', async ({ page }) => {
    // Go to explore page
    await page.goto('http://localhost:5173/explore');

    //Click applied button that is currently unselected
    const appliedButton = page.locator('.appliedButton').first()
    await expect(appliedButton).toHaveCSS('background-color', 'rgb(18, 176, 18)');

    // Check that it is now in backend
    //const appliedClubs = await fetchClubsByStatus("applied"); this didn't work
    const res = await page.request.get('http://localhost:3000/api/user/clubs?status=applied');
    const appliedClubs = await res.json();
    console.log(appliedClubs);
    await expect(appliedClubs.length).toEqual(1);
  });