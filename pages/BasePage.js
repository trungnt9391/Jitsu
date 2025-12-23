class BasePage {
    constructor(page) {
        this.page = page;

    }



    async goto(url) {
        await this.page.goto(url);
    }


    async waitForSelector(selector, options = { timeout: 30000 }) {
        try {
            console.log(`Waiting for selector: ${selector}`);
            await this.page.waitForSelector(selector, options);
        } catch (error) {
            throw new Error(`Failed to wait for selector "${selector}": ${error.message}`);
        }
    }

    async click(selector) {
        try {
            console.log(`Clicking on ${selector}...`);
            await this.page.click(selector);
        } catch (error) {
            throw new Error(`Failed to click on "${selector}": ${error.message}`);
        }
    }

    async fill(selector, value) {
        try {
            console.log(`Filling ${selector} with value: ${value}`);
            await this.page.fill(selector, value);
        } catch (error) {
            throw new Error(`Failed to fill "${selector}" with value "${value}": ${error.message}`);
        }
    }

    async isVisible(selector) {
        console.log(`Checking if ${selector} is visible...`);
        const isVisible = await this.page.isVisible(selector);
        console.log(`${selector} visible: ${isVisible}`);
        return isVisible;
    }

    async waitForLoadState(state = 'networkidle') {
        try {
            console.log(`Waiting for load state: ${state}...`);
            await this.page.waitForLoadState(state);
        } catch (error) {
            throw new Error(`Failed to wait for load state "${state}": ${error.message}`);
        }
    }


}

module.exports = { BasePage };