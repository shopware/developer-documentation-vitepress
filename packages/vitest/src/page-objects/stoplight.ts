import {expect, Locator, Page} from "@playwright/test";
import {eachLocator, host} from "../utils/locator";

export class Stoplight {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async open(url: string) {
        await goto(url)
    }

    async hasStoplightElement() {
        const stoplightLocator = this.page.locator('elements-stoplight-project');
        expect(await stoplightLocator.count()).toEqual(1);
    }

    async hasHeading(heading: string) {
        await this.page.waitForSelector('elements-stoplight-project h1');
        const headingLocator = this.page.locator('elements-stoplight-project h1');
        expect(await headingLocator.allTextContents()).toEqual([heading])
    }

    async hasSidebar() {
        await this.page.waitForSelector('elements-stoplight-project .ElementsTableOfContentsItem:first-child');
        const sidebarLocator = this.page.locator('elements-stoplight-project .ElementsTableOfContentsItem:first-child');
        expect(await sidebarLocator.allTextContents()).toEqual(['Endpoints'])
    }
}
