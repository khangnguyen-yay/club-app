import { test, expect } from "@playwright/test";
import { fetchClubsByStatus } from "../src/apiHelpers";

test('Selecting applied button adds club to applied category in backend', async ({ page }) => {
    // Go to explore page
    await page.goto('http://localhost:5173/explore');

    //Click applied button that is currently unselected
    const appliedButton = page.locator('.appliedButton').first()
    await expect(appliedButton).toHaveCSS('background-color', 'rgb(18, 176, 18)');

    // Check that it is now in backend
    const appliedClubs = await fetchClubsByStatus("applied");
    await expect(appliedClubs.toString()).toEqual("hi");
    if (typeof appliedClubs == "string") {
      return;
    }
    console.log("HI")
    console.log(appliedClubs.map(c => c.name));
  });