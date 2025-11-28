import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('the Applying button is not highlighted', async function () {
    await this.page.goto('http://localhost:5173/explore'); //navigate to explore page
    
    this.applyingButton = this.page.locator('.applyingButton') //locate all applyingButtons

    //test that first applyingButton is orange
    await expect(this.applyingButton.first()).toHaveCSS('background-color', 'rgb(255, 165, 0)');
})

When('we click on the Applying button', async function () {
    await this.applyingButton.first().click(); //click on button
});

Then('the Applying button should turn dark orange', async function () {
    //verify that button is highlighted
    await expect(this.applyingButton.first()).toHaveCSS('background-color', 'rgb(194, 126, 0)');
});

/*
.considerButton {
    background-color: rgb(35, 35, 248);
    border-color: rgb(35, 35, 248);
    margin-left: var(--card-margin);
  }
  
  .applyingButton {
    background-color: orange;
    border-color: orange;
    margin-left: 10px;
  }
  
  .appliedButton {
    background-color: rgb(18, 176, 18);
    border-color: rgb(18, 176, 18);
    margin-left: 10px;
    margin-right: var(--card-margin);

      .considerButton:hover {
    background-color: rgb(18, 18, 165)
  }

  .applyingButton:hover {
    background-color: rgb(194, 126, 0)
  }
  
  .appliedButton:hover {
    background-color: rgb(0, 101, 0)
  }
  }*/