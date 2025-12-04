Feature: Selecting and unselecting status buttons on the explore page updates the home page
    
    Scenario: Card appears under "Applying" category under home page when selected
        Given the user is on the explore page
        Given the Applying button is light yellow
        When we click on the Applying button
        When we navigate to the home page
        Then the first card should appear under the Applying section

    Scenario: Card doesn't appear under "Applying" category under home page when not selected
        Given the user is on the explore page
        Given the Applying button is light yellow
        When we navigate to the home page
        Then the first card should not appear under the Applying section

    Scenario: Card appears under "Applied" category under home page when selected
        Given the user is on the explore page
        Given the Applied button is light green
        When we click on the Applied button
        When we navigate to the home page
        Then the first card should appear under the Applied section

    Scenario: Card doesn't appear under "Applied" category under home page when not selected
        Given the user is on the explore page
        Given the Applied button is light green
        When we navigate to the home page
        Then the first card should not appear under the Applied section

    Scenario: Card appears under "Considering" category under home page when selected
        Given the user is on the explore page
        Given the Consider button is light red
        When we click on the Consider button
        When we navigate to the home page
        Then the first card should appear under the Considering section

    Scenario: Card doesn't appear under "Considering" category under home page when not selected
        Given the user is on the explore page
        Given the Consider button is light red
        When we navigate to the home page
        Then the first card should not appear under the Considering section
