import { setWorldConstructor, World } from '@cucumber/cucumber';
import type { Browser, Page } from 'playwright';
import { chromium } from 'playwright';

export class CustomWorld extends World {
  browser!: Browser;
  page!: Page;

  constructor(options: any) {
    super(options);
  }

  async init() {
    //this.browser = await chromium.launch({ headless: true });
    //this.page = await this.browser.newPage();
  }

  
async reset() {
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
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

setWorldConstructor(CustomWorld);
