Feature: Explore Page status buttons

    Scenario: Select the "Applying" button
        Given the Applying button is not highlighted
        When we click on the Applying button
        Then the Applying button should turn dark orange