Feature: Selecting and unselecting buttons when on home page

      Scenario: Applying category count should display correct count of Applying cards
         Given there are cards in the Applying section
         When we navigate to the home page
         Then the Applying category count should show the correct number of Applying cards

      Scenario: Applied category count should display correct count of Applied cards
         Given there are cards in the Applied section
         When we navigate to the home page
         Then the Applied category count should show the correct number of Applied cards

      Scenario: Considering category count should display correct count of Consider cards
         Given there are cards in the Considering section
         When we navigate to the home page
         Then the Considering category count should show the correct number of Consider cards

      Scenario: Deselecting Applying button on home page removes it from the home page
        Given we navigate to the home page
        Given the Applying button is dark yellow
        When we click on the Applying button
        When we refresh the page
        Then the first card should not appear under the Applying section

      Scenario: Deselecting Applied button on home page removes it from the home page
        Given we navigate to the home page
        Given the Applied button is dark green
        When we click on the Applied button
        When we refresh the page
        Then the first card should not appear under the Applied section

      Scenario: Deselecting Consider button on home page removes it from the home page
        Given we navigate to the home page
        Given the Consider button is dark red
        When we click on the Consider button
        When we refresh the page
        Then the first card should not appear under the Considering section
