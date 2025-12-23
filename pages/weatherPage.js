const { BasePage } = require('./BasePage');
const { getValueFromJson, fetchApiData} = require('../utils/apiUtils');

class WeatherPage extends BasePage {

    constructor(page) {
        super(page);
    }

    get inputCity() {
        return this.page.locator('//div[@class="search-container"]/input');
    }

    get listItemDroDownCity() {
        return this.page.locator(
            '//div[@class="search-container"]/input/following-sibling::ul/li'
        );
    }

    get buttonSearch() {
        return this.page.locator('//div[@class="search"]//button[@type="submit"]');
    }

    get labelCurrentDateResult() {
        return this.page.locator('//div[@class=\'current-container mobile-padding\']//span[@class=\'orange-text\']');
    }

    get labelCityResult() {
        return this.page.locator('//div[@class=\'current-container mobile-padding\']//span[@class=\'orange-text\']/following-sibling::h2');
    }

    get labelTemperatureResult() {
        return this.page.locator('//div[@class=\'current-temp\']//span');
    }

    async clickFirstCityInDropdown() {
        await this.listItemDroDownCity.first().click();
    }
}
module.exports = { WeatherPage };