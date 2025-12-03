import { test, expect } from "@playwright/test";

interface Club {
  id: number;
  club_name: string;
  type: string;
  preference: string;
}

//SELECTION AND DESELECTION TESTS FOR EXPLORE PAGE
//Verifies that selecting and unselecting buttons on the explore page properly updates the backend

//SELECTION TESTS
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
    expect(appliedClubs.some((club : Club) => club.id === clubIDToCheck)).toBe(true);
  });

  test('Selecting applying button adds club to applying category in backend', async ({ page }) => {
    // Go to explore page
    await page.goto('http://localhost:5173/explore');

    //Click applying button that is currently unselected
    const applyingButton = await page.locator('.applyingButton').first();
    await expect(applyingButton).toHaveCSS('background-color', 'rgb(255, 165, 0)');
    await applyingButton.click();

    const updatedApplyingButtons = page.locator('.statusButton.applyingButtonClicked');

    const updatedApplyingButton = await updatedApplyingButtons.first();
    await expect(updatedApplyingButton).toHaveCSS('background-color', 'rgb(194, 126, 0)');

    // Check that it is now in backend
    const res = await page.request.get('http://localhost:3000/api/user/clubs?status=applying');
    const applyingClubs : Club[] = await res.json();
    const clubIDToCheck = 1;
    console.log(applyingClubs);
    expect(applyingClubs.some((club : Club) => club.id === clubIDToCheck)).toBe(true);
  });

  test('Selecting consider button adds club to considering category in backend', async ({ page }) => {
    // Go to explore page
    await page.goto('http://localhost:5173/explore');

    //Click consider button that is currently unselected
    const considerButton = await page.locator('.considerButton').first();
    await expect(considerButton).toHaveCSS('background-color', 'rgb(35, 35, 248)');
    await considerButton.click();

    const updatedConsiderButtons = page.locator('.statusButton.considerButtonClicked');

    const updatedConsiderButton = await updatedConsiderButtons.first();
    await expect(updatedConsiderButton).toHaveCSS('background-color', 'rgb(18, 18, 165)');

    // Check that it is now in backend
    const res = await page.request.get('http://localhost:3000/api/user/clubs?status=considering');
    const considerClubs : Club[] = await res.json();
    const clubIDToCheck = 1;
    //console.log(considerClubs);
    expect(considerClubs.some((club : Club) => club.id === clubIDToCheck)).toBe(true);
  });

  //DESELECTION TESTS
  test('Deselecting applied button removes club from applied category in backend', async ({ page }) => {
    // Go to explore page
    await page.goto('http://localhost:5173/explore');

    //Click applied button that is currently unselected, then select it
    const appliedButton = await page.locator('.appliedButton').nth(1);
    await expect(appliedButton).toHaveCSS('background-color', 'rgb(18, 176, 18)');
    await appliedButton.click();
    const updatedAppliedButtons = page.locator('.statusButton.appliedButtonClicked');
    const updatedAppliedButton = await updatedAppliedButtons.first();
    await expect(updatedAppliedButton).toHaveCSS('background-color', 'rgb(0, 101, 0)');

    //Unselect applied button
    await appliedButton.click();
    const unselectedAppliedButton = await page.locator('.appliedButton').nth(1);
    await expect(unselectedAppliedButton).toHaveCSS('background-color', 'rgb(18, 176, 18)');

    // Check that it is now not in backend
    const res = await page.request.get('http://localhost:3000/api/user/clubs?status=applied');
    const appliedClubs : Club[] = await res.json();
    console.log(appliedClubs);
    const clubIDToCheck = 2;
    expect(appliedClubs.some((club : Club) => club.id === clubIDToCheck)).toBe(false);
  });

  test('Selecting applying button removes club from applying category in backend', async ({ page }) => {
    // Go to explore page
    await page.goto('http://localhost:5173/explore');

    //Click applying button that is currently unselected
    const applyingButton = await page.locator('.applyingButton').first();
    await expect(applyingButton).toHaveCSS('background-color', 'rgb(255, 165, 0)');
    await applyingButton.click();

    const updatedApplyingButtons = page.locator('.statusButton.applyingButtonClicked');
    const updatedApplyingButton = await updatedApplyingButtons.first();
    await expect(updatedApplyingButton).toHaveCSS('background-color', 'rgb(194, 126, 0)');

    //Unselect applying button
    await applyingButton.click();
    const unselectedApplyingButton = await page.locator('.appliedButton').nth(1);
    await expect(unselectedApplyingButton).toHaveCSS('background-color', 'rgb(255, 165, 0)');

    // Check that it is now in backend
    const res = await page.request.get('http://localhost:3000/api/user/clubs?status=applying');
    const applyingClubs : Club[] = await res.json();
    const clubIDToCheck = 1;
    console.log(applyingClubs);
    expect(applyingClubs.some((club : Club) => club.id === clubIDToCheck)).toBe(false);
  });

  test('Selecting consider button removes club from consider category in backend', async ({ page }) => {
    // Go to explore page
    await page.goto('http://localhost:5173/explore');

    //Click consider button that is currently unselected
    const considerButton = await page.locator('.considerButton').first();
    await expect(considerButton).toHaveCSS('background-color', 'rgb(35, 35, 248)');
    await considerButton.click();
    const updatedConsiderButtons = page.locator('.statusButton.considerButtonClicked');
    const updatedConsiderButton = await updatedConsiderButtons.first();
    await expect(updatedConsiderButton).toHaveCSS('background-color', 'rgb(18, 18, 165)');

     //Unselect consider button
     await considerButton.click();
     const unselectedConsiderButton = await page.locator('.appliedButton').nth(1);
     await expect(unselectedConsiderButton).toHaveCSS('background-color', 'rgb(35, 35, 248)');

    // Check that it is now in backend
    const res = await page.request.get('http://localhost:3000/api/user/clubs?status=considering');
    const considerClubs : Club[] = await res.json();
    const clubIDToCheck = 1;
    //console.log(considerClubs);
    expect(considerClubs.some((club : Club) => club.id === clubIDToCheck)).toBe(false);
  });


//SELECTION AND DESELECTION TESTS FOR HOME PAGE
//Verifies that selecting and unselecting buttons on the homepage properly updates the backend

  //SELECTION TESTS
test('Selecting applied button adds club to applied category in backend', async ({ page }) => {
    // Go to explore page
    await page.goto('http://localhost:5173/home');

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
    expect(appliedClubs.some((club : Club) => club.id === clubIDToCheck)).toBe(true);
  });

  test('Selecting applying button adds club to applying category in backend', async ({ page }) => {
    // Go to explore page
    await page.goto('http://localhost:5173/home');

    //Click applying button that is currently unselected
    const applyingButton = await page.locator('.applyingButton').first();
    await expect(applyingButton).toHaveCSS('background-color', 'rgb(255, 165, 0)');
    await applyingButton.click();

    const updatedApplyingButtons = page.locator('.statusButton.applyingButtonClicked');

    const updatedApplyingButton = await updatedApplyingButtons.first();
    await expect(updatedApplyingButton).toHaveCSS('background-color', 'rgb(194, 126, 0)');

    // Check that it is now in backend
    const res = await page.request.get('http://localhost:3000/api/user/clubs?status=applying');
    const applyingClubs : Club[] = await res.json();
    const clubIDToCheck = 1;
    console.log(applyingClubs);
    expect(applyingClubs.some((club : Club) => club.id === clubIDToCheck)).toBe(true);
  });

  test('Selecting consider button adds club to considering category in backend', async ({ page }) => {
    // Go to explore page
    await page.goto('http://localhost:5173/home');

    //Click consider button that is currently unselected
    const considerButton = await page.locator('.considerButton').first();
    await expect(considerButton).toHaveCSS('background-color', 'rgb(35, 35, 248)');
    await considerButton.click();

    const updatedConsiderButtons = page.locator('.statusButton.considerButtonClicked');

    const updatedConsiderButton = await updatedConsiderButtons.first();
    await expect(updatedConsiderButton).toHaveCSS('background-color', 'rgb(18, 18, 165)');

    // Check that it is now in backend
    const res = await page.request.get('http://localhost:3000/api/user/clubs?status=considering');
    const considerClubs : Club[] = await res.json();
    const clubIDToCheck = 1;
    //console.log(considerClubs);
    expect(considerClubs.some((club : Club) => club.id === clubIDToCheck)).toBe(true);
  });

  //DESELECTION TESTS
  test('Deselecting applied button removes club from applied category in backend', async ({ page }) => {
    // Go to explore page
    await page.goto('http://localhost:5173/home');

    //Click applied button that is currently unselected, then select it
    const appliedButton = await page.locator('.appliedButton').nth(1);
    await expect(appliedButton).toHaveCSS('background-color', 'rgb(18, 176, 18)');
    await appliedButton.click();
    const updatedAppliedButtons = page.locator('.statusButton.appliedButtonClicked');
    const updatedAppliedButton = await updatedAppliedButtons.first();
    await expect(updatedAppliedButton).toHaveCSS('background-color', 'rgb(0, 101, 0)');

    //Unselect applied button
    await appliedButton.click();
    const unselectedAppliedButton = await page.locator('.appliedButton').nth(1);
    await expect(unselectedAppliedButton).toHaveCSS('background-color', 'rgb(18, 176, 18)');

    // Check that it is now not in backend
    const res = await page.request.get('http://localhost:3000/api/user/clubs?status=applied');
    const appliedClubs : Club[] = await res.json();
    console.log(appliedClubs);
    const clubIDToCheck = 2;
    expect(appliedClubs.some((club : Club) => club.id === clubIDToCheck)).toBe(false);
  });

  test('Selecting applying button removes club from applying category in backend', async ({ page }) => {
    // Go to explore page
    await page.goto('http://localhost:5173/home');

    //Click applying button that is currently unselected
    const applyingButton = await page.locator('.applyingButton').first();
    await expect(applyingButton).toHaveCSS('background-color', 'rgb(255, 165, 0)');
    await applyingButton.click();

    const updatedApplyingButtons = page.locator('.statusButton.applyingButtonClicked');
    const updatedApplyingButton = await updatedApplyingButtons.first();
    await expect(updatedApplyingButton).toHaveCSS('background-color', 'rgb(194, 126, 0)');

    //Unselect applying button
    await applyingButton.click();
    const unselectedApplyingButton = await page.locator('.appliedButton').nth(1);
    await expect(unselectedApplyingButton).toHaveCSS('background-color', 'rgb(255, 165, 0)');

    // Check that it is now in backend
    const res = await page.request.get('http://localhost:3000/api/user/clubs?status=applying');
    const applyingClubs : Club[] = await res.json();
    const clubIDToCheck = 1;
    console.log(applyingClubs);
    expect(applyingClubs.some((club : Club) => club.id === clubIDToCheck)).toBe(false);
  });

  test('Selecting consider button removes club from consider category in backend', async ({ page }) => {
    // Go to explore page
    await page.goto('http://localhost:5173/home');

    //Click consider button that is currently unselected
    const considerButton = await page.locator('.considerButton').first();
    await expect(considerButton).toHaveCSS('background-color', 'rgb(35, 35, 248)');
    await considerButton.click();
    const updatedConsiderButtons = page.locator('.statusButton.considerButtonClicked');
    const updatedConsiderButton = await updatedConsiderButtons.first();
    await expect(updatedConsiderButton).toHaveCSS('background-color', 'rgb(18, 18, 165)');

     //Unselect consider button
     await considerButton.click();
     const unselectedConsiderButton = await page.locator('.appliedButton').nth(1);
     await expect(unselectedConsiderButton).toHaveCSS('background-color', 'rgb(35, 35, 248)');

    // Check that it is now in backend
    const res = await page.request.get('http://localhost:3000/api/user/clubs?status=considering');
    const considerClubs : Club[] = await res.json();
    const clubIDToCheck = 1;
    //console.log(considerClubs);
    expect(considerClubs.some((club : Club) => club.id === clubIDToCheck)).toBe(false);
  });