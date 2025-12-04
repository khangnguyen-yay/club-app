import { Before, After  } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import path from 'path';


Before({ timeout: 30000 }, async function () {

  // Launch browser once per worker
  if (!this.browser) {
    this.browser = await chromium.launch({ headless: false });
  }

  // Load Google session
  this.context = await this.browser.newContext({
    storageState: path.resolve('storageState.json')   // remove './' (safer)
  });

  this.page = await this.context.newPage();

  // If your World has init() defined
  if (this.init) {
    await this.init();
  }

  //Reset the cards
  await this.page.goto('http://localhost:5173/home');

  //iterate through selected applied buttons and unselect them
  const updatedAppliedButtons = await this.page.locator('.statusButton.appliedButtonClicked');
  while (await updatedAppliedButtons.count() > 0) {
      await updatedAppliedButtons.first().click();
  }

  //iterate through applying buttons and unselect them
  const updatedApplyingButtons = await this.page.locator('.statusButton.applyingButtonClicked');
  while (await updatedApplyingButtons.count() > 0) {
      await updatedApplyingButtons.first().click();
  }

  //iterate through consider buttons and unselect them
  const updatedConsiderButtons = await this.page.locator('.statusButton.considerButtonClicked');
  while (await updatedConsiderButtons.count() > 0) {
      await updatedConsiderButtons.first().click();
  }

});

After(async function () {
  await this.cleanup();
});
