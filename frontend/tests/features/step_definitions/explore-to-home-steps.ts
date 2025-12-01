import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

//Shared
When('we navigate to the home page', async function() {
    //const homePageNavButton = this.page.locator('.NavLink').first();
    //await homePageNavButton.click();
    await this.page.goto('http://localhost:5173/home');
})
When('we refresh the page', async function() {
    await this.page.reload();
}) 

//First card appears under "Applying" category under home page test
//Shared - Given the user is on the explore page

/*
Given('the Applying button on the first card is selected', async function() {
    this.exploreClubCard = this.page.locator('.club-card').first();
    this.exploreClubTitle= await this.exploreClubCard.locator('.clubName').textContent();

    await expect(this.firstButton).toHaveCSS('background-color', 'rgb(255, 165, 0)');
    await this.firstButton.click(); //click on button

    /*
    const backgroundColor = await this.firstButton.getAttribute('style');
    if (backgroundColor?.includes('rgb(255, 165, 0)')) {
        console.log("REACHED")
        await this.firstButton.click();
    }
    await expect(this.firstButton).toHaveCSS('background-color', 'rgb(194, 126, 0)');
    */
Given('the first card has a title', async function() {
    this.exploreClubCard = this.page.locator('.club-card').first();
    this.exploreClubTitle= await this.page.locator('.clubName').first().textContent();
    console.log(this.exploreClubTitle);
})
//Shared - When we navigate to the home page
Then('the first card should appear under the Applying section', { timeout: 20000 }, async function() {
    //console.log(await this.page.content());

    //const clubCards = this.page.locator('.applyingSection .club-card');
    //await clubCards.first().waitFor({ state: 'visible' });


    // 1. Define the specific element we are waiting for.
    // Assuming 'club-card' is the class name for the individual cards rendered by CardList.
    const firstClubCardLocator = this.page.locator('.applyingSection .club-card').first();
    
    // 2. Wait for this element to be attached/visible in the DOM.
    // Playwright is smart enough to retry this until the element appears,
    // handling the asynchronous nature of your React state update.
    await firstClubCardLocator.waitFor({ state: 'visible', timeout: 10000 }); // Increase timeout if necessary

    // 3. (Optional) Verify that the card is there by checking the count
    const cardCount = await this.page.locator('.applyingSection .club-card').count();
    expect(cardCount).toBeGreaterThan(0);

    /*
    const applyingSection = this.page.locator('.applyingSection');
    console.log(await applyingSection.innerHTML());

    await this.page.waitForFunction(() => {
        const grid = document.querySelector('.cardGrid');
        return grid && grid.children.length > 0;
      }, { timeout: 20000 });
      
    console.log(await this.page.locator('.cardGrid').innerHTML());
*/
//const firstCard = this.page.locator('.cardGrid .club-card').first();
//console.log(await firstCard.innerHTML());
    /*
    const cardGrid = this.page.locator('.cardGrid').nth(1);
    await cardGrid.first().waitFor({ state: 'visible' });
    const html = await cardGrid.evaluate((el : Element) => el.outerHTML);
    console.log(html);
    const homeClubTitle = cardGrid.locator('.clubName'); //CAN'T FIND ANYTHING FOR THIS
    */
    //const homeClubTitle = homeClubCard.locator('.clubName');

    //const classList = await applyingSection.evaluate((el: Element) =>
       // Array.from(el.classList));
    //console.log("All computed styles:", classList);

    /*
    console.log(applyingSection);
    //compare card displayed to card selected
    console.log("EXPLORE CLUB TITLE");
    console.log(this.exploreClubTitle);
    console.log("HOME PAGE TITLE");
    console.log(await homeClubTitle.textContent());
    await expect(homeClubTitle).toHaveText(this.exploreClubTitle)
    */
})

//First card does not appear under "Applying" category under home page test
//Shared - Given the user is on the explore page
Given('the Applying button on the first card is unselected', async function() {
    this.exploreClubCard = this.page.locator('.club-card').first();
    this.exploreClubTitle= await this.exploreClubCard.locator('.clubName').textContent();
    this.firstButton = this.page.locator('.applyingButton').first()
    await expect(this.firstButton).toHaveCSS('background-color', 'rgb(255, 165, 0)');
})
//Shared - When we navigate to the home page
Then('the card should not be displayed under the Applying category label', async function() {
    const applyingSection = await this.page.locator('.applyingSection');
    //const html = await applyingSection.evaluate((el : Element) => el.outerHTML);
    //console.log(html);

    const homeClubCard = applyingSection.locator('.club-card');

    const cardCount = await homeClubCard.count();

    if (cardCount == 0) {
        return;
    }

    for (let i = 0; i < cardCount; i++) {
        const titleLocator = homeClubCard.nth(i).locator('.clubName');
        const homeClubTitle = await titleLocator.innerText();
        expect(homeClubTitle.trim()).not.toBe(this.exploreClubTitle.trim());
    }
})