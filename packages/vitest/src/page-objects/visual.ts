import {expect, Page} from "@playwright/test";
import slugify from "slugify";
import glob from "glob";

export class Visual {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async open(url: string) {
        await goto(url)
    }

    async getAllPages() {
        return await new Promise<string[]>((resolve, reject) => {
            const dir = `${process.cwd()}/.vitepress/dist`;
            glob(`${dir}/**/**.html`, {}, (er, files) => resolve(files.map(file => file.substring(dir.length))));
        })
    }

    // https://github.com/americanexpress/jest-image-snapshot#%EF%B8%8F-api
    // https://playwright.dev/docs/screenshots
    // https://vitest.dev/guide/snapshot.html
    // https://vitest.dev/guide/extending-matchers.html
    // https://github.com/americanexpress/jest-image-snapshot#recommendations-when-using-ssim-comparison
    // https://playwright.dev/docs/test-snapshots
    // https://playwright.dev/docs/api/class-page#page-screenshot
    async visualTest(url: string) {
        try {
            await this.open(url);
            await this.page.waitForLoadState('networkidle');
            const image = await this.page.locator('#VPContent main').screenshot({
                // fullPage: true,
                animations: 'disabled',
                caret: 'hide',
                scale: 'css',
                mask: [
                    this.page.locator('header.VPNav')
                ]
            });

            let identifier = slugify(url);
            if (url.endsWith('/')) {
                identifier = `${identifier}--index`;
            }

            await expect(image).toMatchImageSnapshot({
                /*customDiffConfig: {
                    threshold: 0.05,
                },*/
                customSnapshotIdentifier: identifier,
                //updatePassedSnapshot: true,
            });
        } catch (e) {
            console.log(e);
        }
    }
}
