import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

//First card appears under "Applying" category under home page test
//Shared - Given the user is on the explore page
Given('the Applying button on the first card is selected', async function() {
    this.exploreClubCard = this.page.locator('.club-card').first();
    this.exploreClubTitle= await this.exploreClubCard.locator('.clubName').textContent();
    await this.page.locator('.applyingButton').first().click(); //click applying button for first card
})
When('we navigate to the home page', async function() {
    await this.page.goto('http://localhost:5173');
})
Then('the first card should appear under the Applying section', async function() {
    const applyingSection = this.page.locator('.applyingSection');
    const homeClubCard = applyingSection.locator('.club-card').first();
    const homeClubTitle = homeClubCard.locator('.clubName');

    //compare card displayed to card selected
    await expect(homeClubTitle).toHaveText(this.exploreClubTitle)
})
