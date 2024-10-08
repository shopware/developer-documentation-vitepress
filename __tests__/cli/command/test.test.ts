import {createSandbox, destroySandbox, docsCli, timeout, withDirConfig, terminates} from "../helpers";
import {expectEmptyRootPath} from "../expect";
import {prepareDeveloperPortalCheckout, prepareDeveloperPortalNpm} from "../prepare";

describe('cli test', async () => {
    let sandbox;
    beforeEach(() => {
        sandbox = createSandbox();
    })

    afterEach(() => {
        sandbox = destroySandbox(sandbox);
    })

    test.skip('Default test (empty)', async () => {
        const result = await terminates(docsCli(['test'], sandbox.cwd, timeout.low));

        // terminates
        expectEmptyRootPath(result);
        expect(result.stdout).not.toContain('Tests ran');
    })

    // issue with developer-portal
    test.skip('Test configured paths', async () => {
        withDirConfig(sandbox);

        // prepare developer-portal checkout
        prepareDeveloperPortalCheckout(sandbox);
        prepareDeveloperPortalNpm(sandbox);

        const result = await docsCli(['test'], sandbox.cwd, timeout.medium);

        console.log(result);

        expect(result.stdout).toContain('Running test');
        //console.log(result);
        //expect(result.stdout).toContain('Tests ran');
    })
})