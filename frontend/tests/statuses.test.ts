import { test, expect } from "@playwright/test";

interface Club {
  id: number;
  club_name: string;
  type: string;
  preference: string;
}

const APPLIED_COLOR = 'rgb(148, 210, 152)';
const APPLIED_COLOR_SELECTED = 'rgb(84, 160, 89)';
const APPLYING_COLOR = 'rgb(217, 213, 157)';
const APPLYING_COLOR_SELECTED = 'rgb(176, 168, 52)';
const CONSIDER_COLOR = 'rgb(216, 164, 164)';
const CONSIDER_COLOR_SELECTED = 'rgb(202, 96, 96)';

//SELECTION AND DESELECTION TESTS FOR EXPLORE PAGE
//Verifies that selecting and unselecting buttons on the explore page properly updates the backend

//SELECTION TESTS
test('Selecting applied button on explore page adds club to applied category in backend', async ({ page }) => {
    // Go to explore page
    await page.goto('http://localhost:5173/explore');

    //Click applied button that is currently unselected
    const appliedButton = await page.locator('.appliedButton').first();
    await expect(appliedButton).toHaveCSS('background-color', APPLIED_COLOR);
    await appliedButton.click();

    const updatedAppliedButtons = page.locator('.statusButton.appliedButtonClicked');

    const updatedAppliedButton = await updatedAppliedButtons.first();
    await expect(updatedAppliedButton).toHaveCSS('background-color', APPLIED_COLOR_SELECTED);
    // Check that it is now in backend
    //const appliedClubs = await fetchClubsByStatus("applied"); this didn't work
    const res = await page.request.get('http://localhost:3000/api/user/clubs?status=applied');
    const appliedClubs : Club[] = await res.json();
    const clubIDToCheck = 1;
    expect(appliedClubs.some((club : Club) => club.id === clubIDToCheck)).toBe(true);
  });

  test('Selecting applying button on explore page adds club to applying category in backend', async ({ page }) => {
    // Go to explore page
    await page.goto('http://localhost:5173/explore');

    //Click applying button that is currently unselected
    const applyingButton = await page.locator('.applyingButton').first();
    await expect(applyingButton).toHaveCSS('background-color', APPLYING_COLOR);
    await applyingButton.click();

    const updatedApplyingButtons = page.locator('.statusButton.applyingButtonClicked');

    const updatedApplyingButton = await updatedApplyingButtons.first();
    await expect(updatedApplyingButton).toHaveCSS('background-color', APPLYING_COLOR_SELECTED);

    // Check that it is now in backend
    const res = await page.request.get('http://localhost:3000/api/user/clubs?status=applying');
    const applyingClubs : Club[] = await res.json();
    const clubIDToCheck = 1;
    console.log(applyingClubs);
    expect(applyingClubs.some((club : Club) => club.id === clubIDToCheck)).toBe(true);
  });

  test('Selecting consider button on explore page adds club to considering category in backend', async ({ page }) => {
    // Go to explore page
    await page.goto('http://localhost:5173/explore');

    //Click consider button that is currently unselected
    const considerButton = await page.locator('.considerButton').first();
    await expect(considerButton).toHaveCSS('background-color', CONSIDER_COLOR);
    await considerButton.click();

    const updatedConsiderButtons = page.locator('.statusButton.considerButtonClicked');

    const updatedConsiderButton = await updatedConsiderButtons.first();
    await expect(updatedConsiderButton).toHaveCSS('background-color', CONSIDER_COLOR_SELECTED);

    // Check that it is now in backend
    const res = await page.request.get('http://localhost:3000/api/user/clubs?status=considering');
    const considerClubs : Club[] = await res.json();
    const clubIDToCheck = 1;
    //console.log(considerClubs);
    expect(considerClubs.some((club : Club) => club.id === clubIDToCheck)).toBe(true);
  });

  //DESELECTION TESTS
  test('Deselecting applied button on explore page removes club from applied category in backend', async ({ page }) => {
    // Go to explore page
    await page.goto('http://localhost:5173/explore');

    //Click applied button that is currently unselected, then select it
    const appliedButton = await page.locator('.appliedButton').nth(1);
    await expect(appliedButton).toHaveCSS('background-color', APPLIED_COLOR);
    await appliedButton.click();
    const updatedAppliedButtons = page.locator('.statusButton.appliedButtonClicked');
    const updatedAppliedButton = await updatedAppliedButtons.first();
    await expect(updatedAppliedButton).toHaveCSS('background-color', APPLYING_COLOR_SELECTED);

    //Unselect applied button
    await appliedButton.click();
    const unselectedAppliedButton = await page.locator('.appliedButton').nth(1);
    await expect(unselectedAppliedButton).toHaveCSS('background-color', APPLIED_COLOR);

    // Check that it is now not in backend
    const res = await page.request.get('http://localhost:3000/api/user/clubs?status=applied');
    const appliedClubs : Club[] = await res.json();
    console.log(appliedClubs);
    const clubIDToCheck = 2;
    expect(appliedClubs.some((club : Club) => club.id === clubIDToCheck)).toBe(false);
  });

  test('Selecting applying button on explore page removes club from applying category in backend', async ({ page }) => {
    // Go to explore page
    await page.goto('http://localhost:5173/explore');

    //Click applying button that is currently unselected
    const applyingButton = await page.locator('.applyingButton').first();
    await expect(applyingButton).toHaveCSS('background-color', APPLYING_COLOR);
    await applyingButton.click();

    const updatedApplyingButtons = page.locator('.statusButton.applyingButtonClicked');
    const updatedApplyingButton = await updatedApplyingButtons.first();
    await expect(updatedApplyingButton).toHaveCSS('background-color', APPLYING_COLOR_SELECTED);

    //Unselect applying button
    await applyingButton.click();
    const unselectedApplyingButton = await page.locator('.appliedButton').nth(1);
    await expect(unselectedApplyingButton).toHaveCSS('background-color', APPLYING_COLOR);

    // Check that it is now in backend
    const res = await page.request.get('http://localhost:3000/api/user/clubs?status=applying');
    const applyingClubs : Club[] = await res.json();
    const clubIDToCheck = 1;
    console.log(applyingClubs);
    expect(applyingClubs.some((club : Club) => club.id === clubIDToCheck)).toBe(false);
  });

  test('Selecting consider button on explore page removes club from consider category in backend', async ({ page }) => {
    // Go to explore page
    await page.goto('http://localhost:5173/explore');

    //Click consider button that is currently unselected
    const considerButton = await page.locator('.considerButton').first();
    await expect(considerButton).toHaveCSS('background-color', CONSIDER_COLOR);
    await considerButton.click();
    const updatedConsiderButtons = page.locator('.statusButton.considerButtonClicked');
    const updatedConsiderButton = await updatedConsiderButtons.first();
    await expect(updatedConsiderButton).toHaveCSS('background-color', CONSIDER_COLOR_SELECTED);

     //Unselect consider button
     await considerButton.click();
     const unselectedConsiderButton = await page.locator('.appliedButton').nth(1);
     await expect(unselectedConsiderButton).toHaveCSS('background-color', CONSIDER_COLOR);

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
test('Selecting applied button on home page adds club to applied category in backend', async ({ page }) => {
  // Go to explore page
  await page.goto('http://localhost:5173/home');

  //Click applied button that is currently unselected
  const appliedButton = await page.locator('.appliedButton').first();
  await expect(appliedButton).toHaveCSS('background-color', APPLIED_COLOR);
  await appliedButton.click();

  const updatedAppliedButtons = page.locator('.statusButton.appliedButtonClicked');

  const updatedAppliedButton = await updatedAppliedButtons.first();
  await expect(updatedAppliedButton).toHaveCSS('background-color', APPLIED_COLOR_SELECTED);
  // Check that it is now in backend
  //const appliedClubs = await fetchClubsByStatus("applied"); this didn't work
  const res = await page.request.get('http://localhost:3000/api/user/clubs?status=applied');
  const appliedClubs : Club[] = await res.json();
  const clubIDToCheck = 1;
  expect(appliedClubs.some((club : Club) => club.id === clubIDToCheck)).toBe(true);
});

test('Selecting applying button on home page adds club to applying category in backend', async ({ page }) => {
  // Go to explore page
  await page.goto('http://localhost:5173/home');

  //Click applying button that is currently unselected
  const applyingButton = await page.locator('.applyingButton').first();
  await expect(applyingButton).toHaveCSS('background-color', APPLYING_COLOR);
  await applyingButton.click();

  const updatedApplyingButtons = page.locator('.statusButton.applyingButtonClicked');

  const updatedApplyingButton = await updatedApplyingButtons.first();
  await expect(updatedApplyingButton).toHaveCSS('background-color', APPLYING_COLOR_SELECTED);

  // Check that it is now in backend
  const res = await page.request.get('http://localhost:3000/api/user/clubs?status=applying');
  const applyingClubs : Club[] = await res.json();
  const clubIDToCheck = 1;
  console.log(applyingClubs);
  expect(applyingClubs.some((club : Club) => club.id === clubIDToCheck)).toBe(true);
});

test('Selecting consider button on home page adds club to considering category in backend', async ({ page }) => {
  // Go to explore page
  await page.goto('http://localhost:5173/home');

  //Click consider button that is currently unselected
  const considerButton = await page.locator('.considerButton').first();
  await expect(considerButton).toHaveCSS('background-color', CONSIDER_COLOR);
  await considerButton.click();

  const updatedConsiderButtons = page.locator('.statusButton.considerButtonClicked');

  const updatedConsiderButton = await updatedConsiderButtons.first();
  await expect(updatedConsiderButton).toHaveCSS('background-color', CONSIDER_COLOR_SELECTED);

  // Check that it is now in backend
  const res = await page.request.get('http://localhost:3000/api/user/clubs?status=considering');
  const considerClubs : Club[] = await res.json();
  const clubIDToCheck = 1;
  //console.log(considerClubs);
  expect(considerClubs.some((club : Club) => club.id === clubIDToCheck)).toBe(true);
});

//DESELECTION TESTS
test('Deselecting applied button on home page removes club from applied category in backend', async ({ page }) => {
  // Go to explore page
  await page.goto('http://localhost:5173/home');

  //Click applied button that is currently unselected, then select it
  const appliedButton = await page.locator('.appliedButton').nth(1);
  await expect(appliedButton).toHaveCSS('background-color', APPLIED_COLOR);
  await appliedButton.click();
  const updatedAppliedButtons = page.locator('.statusButton.appliedButtonClicked');
  const updatedAppliedButton = await updatedAppliedButtons.first();
  await expect(updatedAppliedButton).toHaveCSS('background-color', APPLIED_COLOR_SELECTED);

  //Unselect applied button
  await appliedButton.click();
  const unselectedAppliedButton = await page.locator('.appliedButton').nth(1);
  await expect(unselectedAppliedButton).toHaveCSS('background-color', APPLIED_COLOR);

  // Check that it is now not in backend
  const res = await page.request.get('http://localhost:3000/api/user/clubs?status=applied');
  const appliedClubs : Club[] = await res.json();
  console.log(appliedClubs);
  const clubIDToCheck = 2;
  expect(appliedClubs.some((club : Club) => club.id === clubIDToCheck)).toBe(false);
});

test('Selecting applying button on home page removes club from applying category in backend', async ({ page }) => {
  // Go to explore page
  await page.goto('http://localhost:5173/home');

  //Click applying button that is currently unselected
  const applyingButton = await page.locator('.applyingButton').first();
  await expect(applyingButton).toHaveCSS('background-color', APPLYING_COLOR);
  await applyingButton.click();

  const updatedApplyingButtons = page.locator('.statusButton.applyingButtonClicked');
  const updatedApplyingButton = await updatedApplyingButtons.first();
  await expect(updatedApplyingButton).toHaveCSS('background-color', APPLYING_COLOR_SELECTED);

  //Unselect applying button
  await applyingButton.click();
  const unselectedApplyingButton = await page.locator('.appliedButton').nth(1);
  await expect(unselectedApplyingButton).toHaveCSS('background-color', APPLYING_COLOR);

  // Check that it is now in backend
  const res = await page.request.get('http://localhost:3000/api/user/clubs?status=applying');
  const applyingClubs : Club[] = await res.json();
  const clubIDToCheck = 1;
  console.log(applyingClubs);
  expect(applyingClubs.some((club : Club) => club.id === clubIDToCheck)).toBe(false);
});

test('Selecting consider button on home page removes club from consider category in backend', async ({ page }) => {
  // Go to explore page
  await page.goto('http://localhost:5173/home');

  //Click consider button that is currently unselected
  const considerButton = await page.locator('.considerButton').first();
  await expect(considerButton).toHaveCSS('background-color', CONSIDER_COLOR);
  await considerButton.click();
  const updatedConsiderButtons = page.locator('.statusButton.considerButtonClicked');
  const updatedConsiderButton = await updatedConsiderButtons.first();
  await expect(updatedConsiderButton).toHaveCSS('background-color', CONSIDER_COLOR_SELECTED);

   //Unselect consider button
   await considerButton.click();
   const unselectedConsiderButton = await page.locator('.appliedButton').nth(1);
   await expect(unselectedConsiderButton).toHaveCSS('background-color', CONSIDER_COLOR);

  // Check that it is now in backend
  const res = await page.request.get('http://localhost:3000/api/user/clubs?status=considering');
  const considerClubs : Club[] = await res.json();
  const clubIDToCheck = 1;
  //console.log(considerClubs);
  expect(considerClubs.some((club : Club) => club.id === clubIDToCheck)).toBe(false);
});
