import { test, expect } from "@playwright/test";
import { fetchClubsByStatus } from "../src/apiHelpers";

interface Club {
  clubID: number;
  club_name: string;
  type: string;
  preference: string;
}

test('Selecting applied button adds club to applied category in backend', async ({ page }) => {
    // Go to explore page
    await page.goto('http://localhost:5173/explore');

    //Click applied button that is currently unselected
    const appliedButton = await page.locator('.appliedButton').first();
    await expect(appliedButton).toHaveCSS('background-color', 'rgb(18, 176, 18)');
    await appliedButton.click();

    const updatedAppliedButtons = page.locator('.statusButton.appliedButtonClicked');

    const updatedAppliedButton = await updatedAppliedButtons.first();
    await expect(updatedAppliedButton).toHaveCSS('background-color', 'rgb(0, 101, 0)');
    // Check that it is now in backend
    //const appliedClubs = await fetchClubsByStatus("applied"); this didn't work
    const res = await page.request.get('http://localhost:3000/api/user/clubs?status=applied');
    const appliedClubs : Club[] = await res.json();
    const clubIDToCheck = 1;
    expect(appliedClubs.some((club : Club) => club.clubID === clubIDToCheck)).toBe(true);
  });

  test('Selecting applying button adds club to applying category in backend', async ({ page }) => {
    // Go to explore page
    await page.goto('http://localhost:5173/explore');

    //Click applied button that is currently unselected
    const appliedButton = await page.locator('.applyingButton').first();
    await expect(appliedButton).toHaveCSS('background-color', 'rgb(255, 165, 0)');
    await appliedButton.click();

    const updatedApplyingButtons = page.locator('.statusButton.applyingButtonClicked');

    const updatedApplyingButton = await updatedApplyingButtons.first();
    await expect(updatedApplyingButton).toHaveCSS('background-color', 'rgb(194, 126, 0)');
    // Check that it is now in backend
    //const appliedClubs = await fetchClubsByStatus("applied"); this didn't work
    const res = await page.request.get('http://localhost:3000/api/user/clubs?status=applying');
    const applyingClubs : Club[] = await res.json();
    const clubIDToCheck = 1;
    console.log(applyingClubs);
    expect(applyingClubs.some((club : Club) => club.clubID === clubIDToCheck)).toBe(true);
  });