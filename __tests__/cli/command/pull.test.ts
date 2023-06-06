import {createSandbox, destroySandbox, docsCli, timeout, withDirConfig, terminates} from "../helpers";
import {expectEmptyRootPath} from "../expect";
import {prepareDeveloperPortalCheckout} from "../prepare";

describe('cli pull', async () => {
    let sandbox;
    beforeEach(() => {
        sandbox = createSandbox();
    })

    afterEach(() => {
        sandbox = destroySandbox(sandbox);
    })

    test('Default pull (empty)', async () => {
        const result = await terminates(docsCli(['pull'], sandbox.cwd, timeout.low));

        // terminates
        expectEmptyRootPath(result);
        expect(result.stdout).not.toContain('Developer portal up to date');
    })

    test('Pull configured paths', async () => {
        withDirConfig(sandbox);

        // prepare developer-portal checkout
        prepareDeveloperPortalCheckout(sandbox);

        const result = await docsCli(['pull'], sandbox.cwd, timeout.high);

        // debug flaky test
        console.log(result);

        // test "git pull --ff", "pnpm i" and "pnpm cli:build"
        expect(result.stdout).toContain('Done in ');
        expect(result.stdout).toContain('Developer portal up to date');
    })
})