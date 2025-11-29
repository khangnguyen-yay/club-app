Feature: Selecting and unselecting status buttons on the explore page updates the home page

    Scenario: First card appears under "Applying" category under home page
        Given the user is on the explore page
        Given the Applying button on the first card is selected
        When we navigate to the home page
        Then the first card should appear under the Applying section