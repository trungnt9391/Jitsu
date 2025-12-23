const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const {getCurrentDateTimeLosAngeles} = require("../utils/stringUtils");

When(/^I navigate to the weather search page$/,{timeout:10000}, async function () {
    this.weatherPage = this.getPage('Weather');
    await this.weatherPage.goto('https://openweathermap.org/');
});

Then(/^I search for the weather information of "([^"]*)"$/, async function (city) {
    await this.weatherPage.inputCity.fill(city);
    this.expectedCity = city;
});
Then(/^I click on the search button$/,async function () {
    await this.weatherPage.buttonSearch.click();
});
Then(/^I click on the first result from the search results$/,async function () {
    await this.weatherPage.clickFirstCityInDropdown();
});
Then(/^I verify the weather city details are displayed correctly$/, async function () {
    console.log(`Verifying weather details for city: ${this.expectedCity}`);
    await expect(this.weatherPage.labelCityResult).toBeVisible();
    await expect(this.weatherPage.labelCityResult).toHaveText(this.expectedCity);
});


Then(/^I verify the current date is displayed correctly$/,async function () {
    console.log(`Verifying weather current date is displayed correctly`);

    const expectedTime = getCurrentDateTimeLosAngeles();
    console.log(`Current date is ${expectedTime}`);

    const uiText = await this.weatherPage.labelCurrentDateResult.textContent();
    console.log(`Current date UI is ${uiText}`);
    expect(uiText).toContain(expectedTime);
});
Then(/^I verify the current temperature is displayed correctly$/,async function () {
    console.log(`Verifying weather current temperature is displayed correctly`);
    const uiText = await this.weatherPage.labelTemperatureResult.textContent();
    console.log(`Current temperature UI is ${uiText}`);
    await expect(this.weatherPage.labelTemperatureResult)
        .toHaveText(/^-?\d+°C$/);
});