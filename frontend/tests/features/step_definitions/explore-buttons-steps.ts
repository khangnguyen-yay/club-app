import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { setDefaultTimeout } from '@cucumber/cucumber';

setDefaultTimeout(10000)


Given('the user is on the explore page', async function () {
    await this.page.goto('http://localhost:5173/explore'); //navigate to explore page
})

//Applying button test
//Shared - given the user is on the explore page
Given('the Applying button is light orange', async function() {
  //test that first applyingButton is orange
  await expect(this.firstButton).toHaveCSS('background-color', 'rgb(255, 165, 0)');
})

When('we click on the Applying button', async function () {
    await this.firstButton.click(); //click on button
});

Then('the Applying button is dark orange', async function () {
    //move mouse to different button
    this.applyingButtons = this.page.locator('.applyingButton')
    await this.applyingButtons.nth(1).click()

    //verify that button is highlighted
    this.firstButton = this.page.locator('.statusButton.applyingButtonClicked').first()
    await expect(this.firstButton).toHaveCSS('background-color', 'rgb(194, 126, 0)');
});

//Consider button test
//Shared - given the user is on the explore page
Given('the Consider button is light blue', async function () {
  this.firstButton = this.page.locator('.considerButton').first()
  //test that first considerButton is blue
  await expect(this.firstButton).toHaveCSS('background-color', 'rgb(35, 35, 248)');
})

When('we click on the Consider button', async function () {
  await this.firstButton.click(); //click on button
});

Then('the Consider button is dark blue', async function () {
  //move mouse to different button
  this.considerButtons = this.page.locator('.considerButton')
  await this.considerButtons.nth(1).click()

  //verify that button is highlighted
  this.firstButton = this.page.locator('.statusButton.considerButtonClicked').first()
  await expect(this.firstButton).toHaveCSS('background-color', 'rgb(18, 18, 165)');
});

//Applied button test
//Shared - Given the user is on the explore page
Given('the Applied button is light green', async function () {
  this.firstButton = this.page.locator('.appliedButton').first()
  //test that first considerButton is green
  await expect(this.firstButton).toHaveCSS('background-color', 'rgb(18, 176, 18)');
})

When('we click on the Applied button', async function () {
  await this.firstButton.click(); //click on button
});

Then('the Applied button is dark green', async function () {
  //move mouse to different button
  this.appliedButtons = this.page.locator('.considerButton')
  await this.appliedButtons.nth(1).click()

  //verify that button is highlighted
  this.firstButton = this.page.locator('.statusButton.appliedButtonClicked').first()
  await expect(this.firstButton).toHaveCSS('background-color', 'rgb(0, 101, 0)');
});