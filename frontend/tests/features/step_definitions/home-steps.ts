import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

When('we refresh the page', async function() {
    await this.page.reload();
}) 

Then('the card should not be in the Applying section', async function() {
    const applyingCard = this.page.locator('.applyingSection .club-card')
    await expect(applyingCard).toHaveCount(0);
})

Given('there are cards in the Applying section', async function() {
    await this.page.goto('http://localhost:5173/explore');
    //Select two cards from explore
    const button = await this.page.locator('.applyingButton').first();
    await button.click();
    const buttonTwo = await this.page.locator('.applyingButton').first();
    await buttonTwo.click();
})

Then('the Applying category count should show the correct number of Applying cards', async function() {
    const section = await this.page.locator('.applyingSection');
    const countBox = await section.locator('.countBox');
    await expect(countBox).toContainText('2');
})

Given('there are cards in the Applied section', async function() {
    await this.page.goto('http://localhost:5173/explore');
    //Select two cards from explore
    const button = await this.page.locator('.appliedButton').first();
    await button.click();
    const buttonTwo = await this.page.locator('.appliedButton').first();
    await buttonTwo.click();
})

Then('the Applied category count should show the correct number of Applied cards', async function() {
    const section = await this.page.locator('.appliedSection');
    const countBox = await section.locator('.countBox');
    await expect(countBox).toContainText('2');
})

Given('there are cards in the Considering section', async function() {
    await this.page.goto('http://localhost:5173/explore');
    //Select two cards from explore
    const button = await this.page.locator('.considerButton').first();
    await button.click();
    const buttonTwo = await this.page.locator('.considerButton').first();
    await buttonTwo.click();
})

Then('the Considering category count should show the correct number of Consider cards', async function() {
    const section = await this.page.locator('.considerSection');
    const countBox = await section.locator('.countBox');
    await expect(countBox).toContainText('2');
})
