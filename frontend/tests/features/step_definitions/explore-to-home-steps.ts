import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

//Shared
When('we navigate to the home page', async function() {
    await this.page.goto('http://localhost:5173');
})

//First card appears under "Applying" category under home page test
//Shared - Given the user is on the explore page
Given('the Applying button on the first card is selected', async function() {
    this.exploreClubCard = this.page.locator('.club-card').first();
    this.exploreClubTitle= await this.exploreClubCard.locator('.clubName').textContent();
    await this.page.locator('.applyingButton').first().click(); //click applying button for first card
})
//Shared - When we navigate to the home page
Then('the first card should appear under the Applying section', async function() {
    const applyingSection = this.page.locator('.applyingSection');
    const homeClubCard = applyingSection.locator('.club-card').first();
    const homeClubTitle = homeClubCard.locator('.clubName');

    //compare card displayed to card selected
    await expect(homeClubTitle).toHaveText(this.exploreClubTitle)
})

//First card does not appear under "Applying" category under home page test
//Shared - Given the user is on the explore page
Given('the Applying button on the first card is unselected', async function() {
    this.exploreClubCard = this.page.locator('.club-card').first();
    this.exploreClubTitle= await this.exploreClubCard.locator('.clubName').textContent();
    this.firstButton = this.page.locator('.applyingButton').first()
    await expect(this.firstButton).toHaveCSS('background-color', 'rgb(255, 165, 0)');
})
//Shared - When we navigate to the home page
Then('the card should not be displayed under the Applying category label', async function() {
    const applyingSection = this.page.locator('.applyingSection');
    const homeClubCard = applyingSection.locator('.club-card');

    const cardCount = await homeClubCard.count();

    if (cardCount == 0) {
        return;
    }

    for (let i = 0; i < cardCount; i++) {
        const titleLocator = homeClubCard.nth(i).locator('.clubName');
        const homeClubTitle = await titleLocator.innerText();
        expect(homeClubTitle.trim()).not.toBe(this.exploreClubTitle.trim());
    }
})