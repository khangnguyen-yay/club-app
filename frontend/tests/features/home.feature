Feature: Selecting and unselecting buttons when on home page

     Scenario: Deselecting Applying button on home page removes it from the home page
        Given we navigate to the home page
        Given the Applying button is dark orange
        When we click on the Applying button
        Then the card should not be in the Applying section