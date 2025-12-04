import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { setDefaultTimeout } from '@cucumber/cucumber';
import { test } from '../../fixtures.ts'

setDefaultTimeout(10000)

const APPLIED_COLOR = 'rgb(148, 210, 152)';
const APPLIED_COLOR_SELECTED = 'rgb(84, 160, 89)';
const APPLYING_COLOR = 'rgb(217, 213, 157)';
const APPLYING_COLOR_SELECTED = 'rgb(176, 168, 52)';
const CONSIDER_COLOR = 'rgb(216, 164, 164)';
const CONSIDER_COLOR_SELECTED = 'rgb(202, 96, 96)';

Given('the user is on the explore page', async function () {
    await this.page.goto('http://localhost:5173/explore'); //navigate to explore page
})

//APPLYING BUTTON SELECTION COLOR CHANGE TEST
//Given the user is on the explore page
Given('the Applying button is light yellow', async function() {
  //test unselected color
  const unselectedButton = await this.page.locator('.applyingButton').first();
  await expect(unselectedButton).toHaveCSS('background-color', APPLYING_COLOR);
})

When('we click on the Applying button', async function () {
    const unselectedButton = await this.page.locator('.applyingButton').first();
    await unselectedButton.click(); //click on button
});

Then('the Applying button is dark yellow', async function () {
    //test selected color
    this.selectedButton = this.page.locator('.statusButton.applyingButtonClicked').first()
    await expect(this.selectedButton).toHaveCSS('background-color', APPLYING_COLOR_SELECTED);
});

//CONSIDER BUTTON SELECTION COLOR CHANGE TEST
//Given the user is on the explore page
Given('the Consider button is light red', async function() {
  //test unselected color
  const unselectedButton = await this.page.locator('.considerButton').first();
  await expect(unselectedButton).toHaveCSS('background-color', CONSIDER_COLOR);
})

When('we click on the Consider button', async function () {
    const unselectedButton = await this.page.locator('.considerButton').first();
    await unselectedButton.click(); //click on button
});

Then('the Consider button is dark red', async function () {
    //test selected color
    this.selectedButton = this.page.locator('.statusButton.considerButtonClicked').first()
    await expect(this.selectedButton).toHaveCSS('background-color', CONSIDER_COLOR_SELECTED);
});

//APPLIED BUTTON SELECTION COLOR CHANGE TEST
//Given the user is on the explore page
Given('the Applied button is light green', async function() {
  //test unselected color
  const unselectedButton = await this.page.locator('.appliedButton').first();
  await expect(unselectedButton).toHaveCSS('background-color', APPLIED_COLOR);
})

When('we click on the Applied button', async function () {
    const unselectedButton = await this.page.locator('.appliedButton').first();
    await unselectedButton.click(); //click on button
});

Then('the Applied button is dark green', async function () {
    //move mouse to different button
    //test selected color
    this.selectedButton = this.page.locator('.statusButton.appliedButtonClicked').first()
    await expect(this.selectedButton).toHaveCSS('background-color', APPLIED_COLOR_SELECTED);
});