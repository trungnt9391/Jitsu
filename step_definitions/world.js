const { setWorldConstructor } = require('@cucumber/cucumber');


class CustomWorld {
    constructor(options) {
        // this(options);

        this.attach = options.attach;
        this.parameters = options.parameters;

        this.page = null;
        this.browser = null;
        this.context = null;

        this.pageObjectManager = null;
        this.pages = {};
    }

    getPage(pageName) {
        if (!this.pages[pageName]) {
            const methodName = `get${pageName}Page`;

            if (!this.pageObjectManager) {
                throw new Error('pageObjectManager is not initialized. Did you forget Before hook?');
            }

            if (typeof this.pageObjectManager[methodName] !== 'function') {
                throw new Error(`Method ${methodName} does not exist in PageObjectManager`);
            }

            this.pages[pageName] = this.pageObjectManager[methodName]();
        }
        return this.pages[pageName];
    }
}

setWorldConstructor(CustomWorld);
