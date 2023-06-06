import {createSandbox, destroySandbox, docsCli, timeout, withDirConfig} from "../helpers";
import {prepareDeveloperPortalCheckout, prepareDeveloperPortalMounts} from "../prepare";

describe('cli cleanup', async () => {
    let sandbox;
    beforeEach(() => {
        sandbox = createSandbox();
    })

    afterEach(() => {
        sandbox = destroySandbox(sandbox);
    })

    test('Default cleanup (empty)', async () => {
        const result = await docsCli(['cleanup'], sandbox.cwd, timeout.low);

        expect(result.stdout).toContain('Removing symlinks and copied dirs');
        expect(result.stdout).toContain('Enter root path for ALL of your projects');
        expect(result.stdout).not.toContain('Project cleaned up');
    })

    test('Cleanup configured paths', async () => {
        withDirConfig(sandbox);

        // prepare developer-portal checkout
        prepareDeveloperPortalCheckout(sandbox);

        const result = await docsCli(['cleanup'], sandbox.cwd, timeout.medium);

        expect(result.stdout).toContain('Removing symlinks and copied dirs');
        expect(result.stdout).toContain('No mountpoints found.');
        expect(result.stdout).not.toContain('Project cleaned up');
    })

    test('Cleanup configured paths and single mountpoint', async () => {
        withDirConfig(sandbox);

        // prepare developer-portal checkout
        prepareDeveloperPortalCheckout(sandbox);
        prepareDeveloperPortalMounts(sandbox);

        const result = await docsCli(['cleanup'], sandbox.cwd, timeout.medium);

        expect(result.stdout).toContain('Removing symlinks and copied dirs');
        expect(result.stdout).toContain('Pick destination mountpoints that should be removed');
        expect(result.stdout).not.toContain('Project cleaned up');
    })
})