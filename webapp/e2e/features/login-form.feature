Feature: Login a created user

Scenario: The user is registered in the site
  Given An user
  When I fill the data in the form and press submit
  Then The home page will appear