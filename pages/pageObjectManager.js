
const { WeatherPage } = require('./weatherPage');




class PageObjectManager {
    constructor(page) {
        this.page = page;
        this.weatherPage = null;
    }


    getWeatherPage() {
        if (!this.weatherPage) {
            this.weatherPage = new WeatherPage(this.page);
        }
        return this.weatherPage;
    }


}

module.exports = { PageObjectManager };