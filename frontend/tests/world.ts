import { setWorldConstructor, World } from '@cucumber/cucumber';
import type { Browser, Page } from 'playwright';
import { chromium } from 'playwright';

export class CustomWorld extends World {
  browser!: Browser;
  page!: Page;

  async init() {
    this.browser = await chromium.launch({ headless: true });
    this.page = await this.browser.newPage();
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

setWorldConstructor(CustomWorld);
