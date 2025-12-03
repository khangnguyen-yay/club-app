import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Then('the card should not be in the Applying section', async function() {
    const applyingCard = this.page.locator('.applyingSection .club-card')
    await expect(applyingCard).toHaveCount(0);
})