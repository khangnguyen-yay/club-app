import { Before, After } from '@cucumber/cucumber';

Before(async function () {
  await this.init();
  this.firstButton = this.page.locator('.applyingButton').first();
});

After(async function () {
  await this.cleanup();
});
