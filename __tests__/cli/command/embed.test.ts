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

describe('cli embed', async () => {
    let sandbox;
    beforeEach(() => {
        sandbox = createSandbox();
    })

    afterEach(() => {
        sandbox = destroySandbox(sandbox);
    })

    test('Default embed (empty)', async () => {
        const result = await terminates(docsCli(['embed'], sandbox.cwd, timeout.low));

        expect(result.stdout).toContain('Embedding repositories');

        // terminates
        expectEmptyRootPath(result);
    })

    test('Default embed (partial)', async () => {
        createConfig(sandbox.projectsPath, {
            'dir.root': sandbox.projectsPath,
        });
        const result = await terminates(docsCli(['embed'], sandbox.cwd, timeout.low));

        expect(result.stdout).toContain('Embedding repositories');

        // terminates
        expectEmptyDeveloperPortalPath(result);
    })

    // vars are added to CI secrets OR read from parent dir
    const secrets = fetchSecrets();
    // @ts-ignore
    test.skipIf(!Object.values(secrets)[0])('Embed configured paths', async () => {
        withDirConfig(sandbox, secrets);

        const result = await docsCli(['embed'], sandbox.cwd, {...timeout.high/*, env: secrets*/});

        expect(result.stdout).toContain('Embedding repositories');

        expect(result.stdout).toContain('Embedding shopware/docs');
        expect(result.stdout).toContain('Processed shopware/docs');

        //expect(result.stdout).toContain('Embedding shopware/frontends');
        //expect(result.stdout).toContain('Processed shopware/frontends');

        //expect(result.stdout).toContain('Embedding shopware/admin-extension-sdk');
        //expect(result.stdout).toContain('Processed shopware/admin-extension-sdk');

        //expect(result.stdout).toContain('Embedding shopware/meteor-icon-kit');
        //expect(result.stdout).toContain('Processed shopware/meteor-icon-kit');

        //expect(result.stdout).toContain('Embedding shopware/meteor-component-library');
        //expect(result.stdout).toContain('Processed shopware/meteor-component-library');

        //expect(result.stdout).toContain('Running additional steps');

        expect(result.stdout).toContain('Repositories embedded');
        // long-running
    }, timeout.high.timeout);
})