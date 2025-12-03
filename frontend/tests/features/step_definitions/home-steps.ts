import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Then('the card should not be in the Applying section', async function() {
    const applyingCard = this.page.locator('.applyingSection .club-card')
    await expect(applyingCard).toHaveCount(0);
})

Given('there are cards in the Applying section', async function( { page }) {
    await page.goto('http://localhost:5173/explore');

    //Click button that is currently unselected, check unselected color is correct
    const button = await page.locator('.appliedButton').first();
    await button.click();
    const buttonTwo = await page.locator('.appliedButton').first();
    await buttonTwo.click();
})

//When we navigate to the home page

Then('the Applying cateogory count should show the correct number of Applying cards', async function( { page }) {
    const countBox = await page.locator('.countBox').nth(1);
    await expect(countBox).toHaveText('2');
})
