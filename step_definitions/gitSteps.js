const {When, Then} = require("@cucumber/cucumber");
const {getWithoutToken, getValuesFromJson, getRepoNameWithMostWatchers} = require("../utils/apiUtils");
When(/^I send a GET request to get open issues$/,async function () {
    const url ='https://api.github.com/orgs/SeleniumHQ/repos'
   this.responseSeleniumHQ = await getWithoutToken(url);
    const openIssues = getValuesFromJson(this.responseSeleniumHQ,'$[*].open_issues_count');
    const total = openIssues.reduce((sum, value) => sum + value, 0);
    console.log(`Total of open issues: ${total}`);
});
Then(/^I send a GET request to sort the repositories by date updated in descending order$/,async function () {
 const url ='https://api.github.com/orgs/SeleniumHQ/repos?sort=updated&direction=desc&page=1'
 const response = await getWithoutToken(url);
 console.log('Repositories by date updated in descending order')
 console.log(response);
});
Then(/^I send a GET request to get most watched repositories$/,async function () {
    const repoNameWithMostWatchers = getRepoNameWithMostWatchers(this.responseSeleniumHQ);
    console.log('Repo with most watchers:', repoNameWithMostWatchers);
});