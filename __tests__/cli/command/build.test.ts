import {createSandbox, destroySandbox, docsCli, timeout, withDirConfig, terminates} from "../helpers";
import {expectEmptyRootPath} from "../expect";
import {prepareDeveloperPortalCheckout, prepareDeveloperPortalMounts, prepareDeveloperPortalNpm} from "../prepare";

describe('cli build', async () => {
    let sandbox;
    beforeEach(() => {
        sandbox = createSandbox();
    })

    afterEach(() => {
        sandbox = destroySandbox(sandbox);
    })

    test('Default build (empty)', async () => {
        const result = await terminates(docsCli(['build'], sandbox.cwd, timeout.low));

        expect(result.stdout).toContain('Building docs');

        // terminates
        expectEmptyRootPath(result);

        expect(result.stdout).not.toContain('Docs built');
    })

    test('Build configured paths', async () => {
        withDirConfig(sandbox);

        // prepare developer-portal checkout, with pnpm and empty mount points
        prepareDeveloperPortalCheckout(sandbox);
        prepareDeveloperPortalNpm(sandbox);
        prepareDeveloperPortalMounts(sandbox);

        const result = await docsCli(['build'], sandbox.cwd, timeout.high);

        expect(result.stdout).toContain('Building docs');
        expect(result.stdout).toContain('Docs built');
    })
})