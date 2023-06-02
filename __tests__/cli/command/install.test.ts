import {createSandbox, destroySandbox, docsCli, timeout, withDirConfig, terminates} from "../helpers";
import {prepareDeveloperPortalCheckout} from "../prepare";

describe('cli install', async () => {
    let sandbox;
    beforeEach(() => {
        sandbox = createSandbox();
    })

    afterEach(() => {
        sandbox = destroySandbox(sandbox);
    })

    test('Default install (empty)', async () => {
        const result = await terminates(docsCli(['install'], sandbox.cwd, timeout.low));

        expect(result.stdout).toContain('Installing aliases to');
        // terminates
        expect(result.stdout).toContain('Pick aliases that you would like to install');
    })

    test('Install configured paths', async () => {
        withDirConfig(sandbox);

        // prepare developer-portal checkout
        prepareDeveloperPortalCheckout(sandbox);

        const result = await terminates(docsCli(['install'], sandbox.cwd, timeout.low));

        expect(result.stdout).toContain('Installing aliases to');
        // terminates
        expect(result.stdout).toContain('Pick aliases that you would like to install');
    })
})