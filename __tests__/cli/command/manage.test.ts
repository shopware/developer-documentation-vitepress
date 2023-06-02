import {
    createConfig,
    withDirConfig,
    createSandbox,
    destroySandbox,
    docsCli,
    terminates,
    timeout,
    fetchSecrets
} from "../helpers";
import {expectEmptyDeveloperPortalPath, expectEmptyRootPath} from "../expect";

describe('cli manage', async () => {
    let sandbox;
    beforeEach(() => {
        sandbox = createSandbox();
    })

    afterEach(() => {
        sandbox = destroySandbox(sandbox);
    })

    test('Default manage (empty)', async () => {
        const result = await terminates(docsCli(['manage'], sandbox.cwd, timeout.low));

        expect(result.stdout).toContain('Managing repositories');

        // terminates
        expectEmptyRootPath(result);
    })

    test('Manage configured paths', async () => {
        withDirConfig(sandbox);
        const result = await terminates(docsCli(['manage'], sandbox.cwd, timeout.low));

        expect(result.stdout).toContain('Managing repositories');

        // terminates
        expect(result.stdout).toContain('Select repositories to manage');
    })
})