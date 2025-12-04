Feature: Explore Page status buttons

    Scenario: Select the "Applying" button, color change
        Given the user is on the explore page
        Given the Applying button is light yellow
        When we click on the Applying button
        Then the Applying button is dark yellow

    Scenario: Select the "Consider" button, color change
        Given the user is on the explore page
        Given the Consider button is light red
        When we click on the Consider button
        Then the Consider button is dark red

    Scenario: Select the "Applied" button, color change
        Given the user is on the explore page
        Given the Applied button is light green
        When we click on the Applied button
        Then the Applied button is dark green

    Scenario: Deselect the "Applying" button, color change
        Given the user is on the explore page
        Given we click on the Applying button
        Given the Applying button is dark yellow
        When we click on the Applying button
        Then the Applying button is light yellow

    Scenario: Deselect the "Consider" button, color change
        Given the user is on the explore page
        Given we click on the Consider button
        Given the Consider button is dark red
        When we click on the Consider button
        Then the Consider button is light red

    Scenario: Deselect the "Applied" button, color change
        Given the user is on the explore page
        Given we click on the Applied button
        Given the Applied button is dark green
        When we click on the Applied button
        Then the Applied button is light green

    
