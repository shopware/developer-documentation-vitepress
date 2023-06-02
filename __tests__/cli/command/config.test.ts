import {createSandbox, destroySandbox, docsCli, timeout, createConfig, terminates} from "../helpers";
import fs from "fs-extra";

describe('cli config', async () => {
    let sandbox;
    beforeEach(() => {
        sandbox = createSandbox();
    })

    afterEach(() => {
        sandbox = destroySandbox(sandbox);
    })

    test('Default config (empty)', async () => {
        const result = await terminates(docsCli(['config'], sandbox.cwd, timeout.low));

        // terminates
        expect(result.stdout).toContain('Pick config keys that you would like to change');
    })

    test('Default view (empty)', async () => {
        const result = await docsCli(['config', '--view'], sandbox.cwd, timeout.low);

        expect(result.error).toBeNull();
        expect(result.stdout).toContain('Configuration dir non-existent');
    })

    test('View configured', async () => {
        createConfig(sandbox.projectsPath, {
            foo: 'bar',
        });
        const result = await docsCli(['config', '--view'], sandbox.cwd, timeout.low);

        expect(result.error).toBeNull();
        expect(result.stdout).toEqual('foo: "bar"');
    })

    test('Destroy configured', async () => {
        createConfig(sandbox.projectsPath, {
            foo: 'bar',
        });

        const fooExists = fs.existsSync(`${sandbox.projectsPath}/.docs-cli/foo`);
        expect(fooExists).toBeTruthy();

        const result = await docsCli(['config', '--destroy'], sandbox.cwd, timeout.low);

        expect(result.error).toBeNull();
        expect(result.stdout).toContain('Destroying');

        const fooDoesNotExist = fs.existsSync(`${sandbox.projectsPath}/.docs-cli/foo`);
        expect(fooDoesNotExist).toBeFalsy();
    })
})