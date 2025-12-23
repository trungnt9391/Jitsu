const { Before, After, setDefaultTimeout} = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const { PageObjectManager } = require('../pages/pageObjectManager');
setDefaultTimeout(30 * 1000); // 30s
Before({ tags: '@UI' }, async function () {
    this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext({
        permissions: [],
    });
    this.page = await this.context.newPage();
    this.pageObjectManager = new PageObjectManager(this.page);
});

After({ tags: '@UI' }, async function () {
    await this.browser.close();
});