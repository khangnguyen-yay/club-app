Feature: Selecting and unselecting buttons when on home page

     Scenario: Deselecting Applying button on home page removes it from the home page
        Given we navigate to the home page
        Given the Applying button is dark orange
        When we click on the Applying button
        Then the card should not be in the Applying section

      Scenario: Applying category count should display correct count of Applying cards
         Given there are cards in the Applying section
         When we navigate to the home page
         Then the Applying cateogory count should show the correct number of Applying cards

      Scenario: A club under the "Applying" category should have a highlighted "Applying" button
         Given 
