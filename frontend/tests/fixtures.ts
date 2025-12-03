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
        const countApplied = await updatedAppliedButtons.count();
        for (let i = 0; i < countApplied; i++) {
            await updatedAppliedButtons.nth(i).click();
        }

        //iterate through applying buttons and unselect them
        const updatedApplyingButtons = await page.locator('.statusButton.applyingButtonClicked');
        const countApplying = await updatedApplyingButtons.count();
        for (let i = 0; i < countApplying; i++) {
            await updatedApplyingButtons.nth(i).click();
        }

        //iterate through consider buttons and unselect them
        const updatedConsiderButtons = await page.locator('.statusButton.considerButtonClicked');
        const countConsider = await updatedConsiderButtons.count();
        for (let i = 0; i < countConsider; i++) {
            await updatedConsiderButtons.nth(i).click();
        }
    }
    await use(resetFunction);
  },
});
