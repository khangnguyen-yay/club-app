import { Before, After  } from '@cucumber/cucumber';

Before({ timeout: 10000 }, async function () {
  await this.init();
  this.firstButton = this.page.locator('.applyingButton').first();
  await this.firstButton.waitFor({ state: 'visible', timeout: 10000 });
});

After(async function () {
  await this.cleanup();
});
