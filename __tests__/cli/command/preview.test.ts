import {createSandbox, destroySandbox, docsCli, timeout, withDirConfig, terminates} from "../helpers";
import {expectEmptyRootPath} from "../expect";
import {prepareDeveloperPortalCheckout} from "../prepare";

describe('cli preview', async () => {
    let sandbox;
    beforeEach(() => {
        sandbox = createSandbox();
    })

    afterEach(() => {
        sandbox = destroySandbox(sandbox);
    })

    test('Default preview (empty)', async () => {
        const result = await terminates(docsCli(['preview'], sandbox.cwd, timeout.low));

        // terminates
        expectEmptyRootPath(result);
        expect(result.stdout).not.toContain('Docs previewed');
    })

    test('Preview configured paths', async () => {
        withDirConfig(sandbox);

        // prepare developer-portal checkout
        prepareDeveloperPortalCheckout(sandbox);

        const result = await docsCli(['preview'], sandbox.cwd, timeout.medium);

        expect(result.stdout).toContain('Previewing docs');
        expect(result.stdout).not.toContain('Docs previewed'); // *long-running
    })
})