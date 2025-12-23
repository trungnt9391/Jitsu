Feature:GitRepo Feature

  @TC01
  Scenario: TC01_Check Github API Repository Information
    When I send a GET request to get open issues
    Then I send a GET request to sort the repositories by date updated in descending order
    And I send a GET request to get most watched repositories





