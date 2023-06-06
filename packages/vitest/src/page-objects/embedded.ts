import {expect, Locator, Page} from "@playwright/test";
import {eachLocator, host} from "../utils/locator";

// https://playwright.dev/docs/api/class-locator

export class Embedded {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async open(url: string) {
        await goto(url)
    }

    async hasActiveNavigation(title: string) {
        const navBarLocator = this.page.locator('.VPNavBarMenu > .VPNavBarMenuLink.active');
        const links = await navBarLocator.allTextContents()
        expect(links).toEqual([title])
    }

    async hasSidebarSections(num: Number) {
        const sidebarLocator = this.page.locator('.VPSidebar h2.title-text');
        expect(await sidebarLocator.count() >= num).toEqual(true);
    }

    async hasGitHubLink(repo: string) {
        const linkLocator = this.page.locator('#VPContent p.edit-link .vt-link');
        //expect(await linkLocator[0].getAttribute('href')).to.equal(`https://github.com/${repo}/edit/main/apps/docs/src/frontends/index.md`);
    }

    async validateSidebar() {
        const links = this.page.locator('.VPSidebarNav a');

        const hrefs = await eachLocator(links, async (element) => {
            return await element.getAttribute('href');
        })

        expect(hrefs.length > 10).toEqual(true);

        return;
        for (let index = 0; index < hrefs.length; index++) {
            const href = hrefs[index];
            // @T00D00
            if (href.endsWith('/')) {
                continue;
            }
            console.log(href);
            const response = await this.page.goto(`${host}${href}`);
            expect(response.status(), `${href} CODE 200`).toEqual(200);
        }
    }
}
