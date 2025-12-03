import { expect } from "@playwright/test";
import { test } from './fixtures.ts'

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
test('Selecting applied button on explore page adds club to applied category in backend', async ({ reset, page }) => {
  page.pause();
    await reset();

    // Go to explore page
    await page.goto('http://localhost:5173/explore');

    //Click button that is currently unselected, check unselected color is correct
    const button = await page.locator('.appliedButton').first();
    await expect(button).toHaveCSS('background-color', APPLIED_COLOR);
    await button.click();

    const selectedButton = page.locator('.statusButton.appliedButtonClicked').first();
    await expect(selectedButton).toHaveCSS('background-color', APPLIED_COLOR_SELECTED);
    // Check that it is now in backend
    const res = await page.request.get('http://localhost:3000/api/user/clubs?status=applied');
    const clubs : Club[] = await res.json();
    const clubIDToCheck = 1;
    expect(clubs.some((club : Club) => club.id === clubIDToCheck)).toBe(true);

    await reset();
  });

  test('Selecting applying button on explore page adds club to applying category in backend', async ({ reset, page }) => {
    await reset();

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

    await reset();
  });

  test('Selecting consider button on explore page adds club to considering category in backend', async ({ reset, page }) => {
    await reset();
    
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

    await reset();
  });

  //DESELECTION TESTS
  test('Deselecting applied button on explore page removes club from applied category in backend', async ({ reset, page }) => {
    await reset();
   
    // Go to explore page
    await page.goto('http://localhost:5173/explore');

    //Click applied button that is currently unselected, then select it
    const button = await page.locator('.appliedButton').first();
    await button.click();
    const updatedButton = await page.locator('.statusButton.appliedButtonClicked');

    //Unselect applied button
    await updatedButton.click();

    // Check that it is now not in backend
    const res = await page.request.get('http://localhost:3000/api/user/clubs?status=applied');
    const categoryClubs : Club[] = await res.json();
    console.log(categoryClubs);
    const clubIDToCheck = 1;
    expect(categoryClubs.some((club : Club) => club.id === clubIDToCheck)).toBe(false);

    await reset();
  });

  test('Deselecting applying button on explore page removes club from applying category in backend', async ({ reset, page }) => {
    await reset();
   
    // Go to explore page
    await page.goto('http://localhost:5173/explore');

    //Click button that is currently unselected, then select it
    const button = await page.locator('.applyingButton').first();
    await button.click();
    const updatedButton = await page.locator('.statusButton.applyingButtonClicked');

    //Unselect button
    await updatedButton.click();

    // Check that it is now not in backend
    const res = await page.request.get('http://localhost:3000/api/user/clubs?status=applying');
    const categoryClubs : Club[] = await res.json();
    console.log(categoryClubs);
    const clubIDToCheck = 1;
    expect(categoryClubs.some((club : Club) => club.id === clubIDToCheck)).toBe(false);

    await reset();
  });

  test('Deselecting consider button on explore page removes club from consider category in backend', async ({ reset, page }) => {
    await reset();
   
    // Go to explore page
    await page.goto('http://localhost:5173/explore');

    //Click button that is currently unselected, then select it
    const button = await page.locator('.considerButton').first();
    await button.click();
    const updatedButton = await page.locator('.statusButton.considerButtonClicked');

    //Unselect button
    await updatedButton.click();

    // Check that it is now not in backend
    const res = await page.request.get('http://localhost:3000/api/user/clubs?status=considering');
    const categoryClubs : Club[] = await res.json();
    console.log(categoryClubs);
    const clubIDToCheck = 1;
    expect(categoryClubs.some((club : Club) => club.id === clubIDToCheck)).toBe(false);

    await reset();
  });


//SELECTION AND DESELECTION TESTS FOR HOME PAGE
//Verifies that selecting and unselecting buttons on the homepage properly updates the backend

 //SELECTION TESTS
test('Selecting applied button on home page adds club to applied category in backend', async ({ reset ,page }) => {
  await reset();
  
  // Go to home page
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

  await reset();
});

test('Selecting applying button on home page adds club to applying category in backend', async ({ reset, page }) => {
  await reset();
  
  // Go to home page
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

  await reset();
});

test('Selecting consider button on home page adds club to considering category in backend', async ({ reset, page }) => {
  await reset();
  
  // Go to home page
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

  await reset();
});

//DESELECTION TESTS
test('Deselecting applied button on home page removes club from applied category in backend', async ({ reset, page }) => {
  await reset();

  //Select a club on explore page
  await page.goto('http://localhost:5173/explore');
  const appliedButton = await page.locator('.appliedButton').first();
  await appliedButton.click();
  
  // Go to home page
  await page.goto('http://localhost:5173/home');

  //Click applied button that is currently selected, then unselect it
  const homeAppliedButton = await page.locator('.statusButton.appliedButtonClicked').first();

  //Unselect applied button
  await homeAppliedButton.click();

  // Check that it is now not in backend
  const res = await page.request.get('http://localhost:3000/api/user/clubs?status=applied');
  const appliedClubs : Club[] = await res.json();
  const clubIDToCheck = 1;
  expect(appliedClubs.some((club : Club) => club.id === clubIDToCheck)).toBe(false);

  await reset();
});

test('Deselecting applying button on home page removes club from applying category in backend', async ({ reset, page }) => {
  page.pause();
  await reset();

  //Select a club on explore page
  await page.goto('http://localhost:5173/explore');
  const applyingButton = await page.locator('.applyingButton').first();
  await applyingButton.click();
  
  // Go to home page
  await page.goto('http://localhost:5173/home');

  //Click applied button that is currently selected, then unselect it
  const homeApplyingButton = await page.locator('.statusButton.applyingButtonClicked').first();

  //Unselect applied button
  await homeApplyingButton.click();

  // Check that it is now not in backend
  const res = await page.request.get('http://localhost:3000/api/user/clubs?status=applying');
  const applyingClubs : Club[] = await res.json();
  const clubIDToCheck = 1;
  expect(applyingClubs.some((club : Club) => club.id === clubIDToCheck)).toBe(false);

  await reset();
});


test('Deselecting consider button on home page removes club from consider category in backend', async ({ reset, page }) => {
  await reset();

  //Select a club on explore page
  await page.goto('http://localhost:5173/explore');
  const considerButton = await page.locator('.considerButton').first();
  await considerButton.click();
  
  // Go to home page
  await page.goto('http://localhost:5173/home');

  //Click applied button that is currently selected, then unselect it
  const homeConsiderButton = await page.locator('.statusButton.considerButtonClicked').first();

  //Unselect applied button
  await homeConsiderButton.click();

  // Check that it is now not in backend
  const res = await page.request.get('http://localhost:3000/api/user/clubs?status=considering');
  const considerClubs : Club[] = await res.json();
  const clubIDToCheck = 1;
  expect(considerClubs.some((club : Club) => club.id === clubIDToCheck)).toBe(false);

  await reset();
});
