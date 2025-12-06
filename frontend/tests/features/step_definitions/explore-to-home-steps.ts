import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

When('we navigate to the home page', async function() {
    await this.page.goto('http://localhost:5173/home');
})

Then('the first card should appear under the Applying section', async function() {
    const section = await this.page.locator('.applyingSection');
    const card = await section.locator('.club-card').first();
    await expect(card).toContainText("Pilipinos In Engineering and Science");
})

Then('the first card should not appear under the Applying section', async function() {
    const section = await this.page.locator('.applyingSection');
    const card = await section.locator('.club-card').first();
    await expect(card).toHaveCount(0);
})

Then('the first card should appear under the Applied section', async function() {
    const section = await this.page.locator('.appliedSection');
    const card = await section.locator('.club-card').first();
    await expect(card).toContainText("Pilipinos In Engineering and Science");
})

Then('the first card should not appear under the Applied section', async function() {
    const section = await this.page.locator('.appliedSection');
    const card = await section.locator('.club-card').first();
    await expect(card).toHaveCount(0);
})

Then('the first card should appear under the Considering section', async function() {
    const section = await this.page.locator('.considerSection');
    const card = await section.locator('.club-card').first();
    await expect(card).toContainText("Pilipinos In Engineering and Science");
})

Then('the first card should not appear under the Considering section', async function() {
    const section = await this.page.locator('.considerSection');
    const card = await section.locator('.club-card').first();
    await expect(card).toHaveCount(0);
})