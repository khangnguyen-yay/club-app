Feature: Explore Page status buttons

    Scenario: Select the "Applying" button
        Given the Applying button is not highlighted
        When we click on the Applying button
        Then the Applying button should turn dark orange

    Scenario: Select the "Consider" button
        Given the Consider button is not highlighted
        When we click on the Consider button
        Then the Consider button should turn dark blue

    Scenario: Select the "Applied" button
        Given the Applied button is not highlighted
        When we click on the Applied button
        Then the Applied button should turn dark green