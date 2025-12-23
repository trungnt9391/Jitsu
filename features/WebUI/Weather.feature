@UI
Feature:Weather Feature

  @TC01
  Scenario Outline: TC01_Check Weather Information US City
    When I navigate to the weather search page
    Then I search for the weather information of "<cityName>"
    And I click on the search button
    And I click on the first result from the search results
    And I verify the weather city details are displayed correctly
    And I verify the current date is displayed correctly
    And I verify the current temperature is displayed correctly
    Examples:
      | cityName           |
      | Los Angeles, US    |




