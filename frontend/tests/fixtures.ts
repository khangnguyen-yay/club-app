import { test as baseTest } from '@playwright/test';

type fixture = {
    reset: () => Promise<void>;
}

export const test = baseTest.extend<fixture>({
  reset : async ({ page }, use) => {
    const resetFunction = async() => {
        console.log('RESET EVERYTHING');
        await page.goto('http://localhost:5173/home');

        //iterate through selected applied buttons and unselect them
        const updatedAppliedButtons = await page.locator('.statusButton.appliedButtonClicked');
        while (await updatedAppliedButtons.count() > 0) {
            await updatedAppliedButtons.first().click();
        }

        //iterate through applying buttons and unselect them
        const updatedApplyingButtons = await page.locator('.statusButton.applyingButtonClicked');
        while (await updatedApplyingButtons.count() > 0) {
            await updatedApplyingButtons.first().click();
        }

        //iterate through consider buttons and unselect them
        const updatedConsiderButtons = await page.locator('.statusButton.considerButtonClicked');
        while (await updatedConsiderButtons.count() > 0) {
            await updatedConsiderButtons.first().click();
        }
    }
    await use(resetFunction);
  },
});
