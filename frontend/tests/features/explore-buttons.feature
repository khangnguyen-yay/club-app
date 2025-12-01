Feature: Explore Page status buttons

    Scenario: Select the "Applying" button
        Given the user is on the explore page
        Given the Applying button is light orange
        When we click on the Applying button
        Then the Applying button is dark orange

    Scenario: Select the "Consider" button
        Given the user is on the explore page
        Given the Consider button is light blue
        When we click on the Consider button
        Then the Consider button is dark blue

    Scenario: Select the "Applied" button
        Given the user is on the explore page
        Given the Applied button is light green
        When we click on the Applied button
        Then the Applied button is dark green

    Scenario: Select the "Applying" button
        Given the user is on the explore page
        Given we click on the Applying button
        Given the Applying button is dark orange
        When we click on the Applying button
        Then the Applying button is light orange

    Scenario: Select the "Consider" button
        Given the user is on the explore page
        Given we click on the Consider button
        Given the Consider button is dark blue
        When we click on the Consider button
        Then the Consider button is light blue

    Scenario: Select the "Applied" button
        Given the user is on the explore page
        Given we click on the Applied button
        Given the Applied button is dark green
        When we click on the Applied button
        Then the Applied button is light green

    
