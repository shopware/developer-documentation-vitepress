import {createSandbox, destroySandbox, docsCli, Result, Sandbox, terminates, timeout, withDirConfig} from "../helpers";
import {prepareDeveloperPortalCheckout, prepareDummySource} from "../prepare";
import fs from "fs-extra";
import {docsSrcDir} from "../../../cli/src/data";

describe('cli link', async () => {
    let sandbox: Sandbox;
    beforeEach(() => {
        sandbox = createSandbox();
    })

    afterEach(() => {
        // @ts-ignore
        sandbox = destroySandbox(sandbox);
    })

    const expectSuccess = (result: Result) => {
        expect(result.stdout).toContain('Linking docs directory');
        expect(result.stdout).toContain('Docs directory linked');
    }

    test('Default link (empty)', async () => {
        const result = await terminates(docsCli(['link'], sandbox.cwd, timeout.low));

        // terminates
        expect(result.stdout).toContain('Enter root path for ALL of your projects');
    })

    test('Link configured paths, manually', async () => {
        withDirConfig(sandbox);
        const result = await terminates(docsCli(['link'], sandbox.cwd, timeout.low));

        expect(result.stdout).toContain('Linking docs directory');
        // terminates
        expect(result.stdout).toContain('Mount source');
    })

    test('Link configured paths', async () => {
        withDirConfig(sandbox);

        // prepare developer-portal checkout
        prepareDeveloperPortalCheckout(sandbox);
        prepareDummySource(sandbox);

        // mount folder to folder
        const result = await docsCli(['link', '--src', 'foo', '--dst', 'dst-foo'], sandbox.cwd, timeout.medium);

        expectSuccess(result);

        expect(fs.lstatSync(`${sandbox.developerPortal}/${docsSrcDir}/dst-foo`).isDirectory()).toBeTruthy();
        expect(fs.lstatSync(`${sandbox.developerPortal}/${docsSrcDir}/dst-foo/bar.md`).isFile()).toBeTruthy();
    })

    test('Link configured paths with dot (root to folder)', async () => {
        withDirConfig(sandbox);

        // prepare developer-portal checkout
        prepareDeveloperPortalCheckout(sandbox);
        prepareDummySource(sandbox);

        // mount root to root
        const result = await docsCli(['link', '--src', '.', '--dst', 'dst-foo'], sandbox.cwd, timeout.medium);

        expectSuccess(result);

        expect(fs.lstatSync(`${sandbox.developerPortal}/${docsSrcDir}/dst-foo`).isDirectory()).toBeTruthy();
        expect(fs.lstatSync(`${sandbox.developerPortal}/${docsSrcDir}/dst-foo/foo`).isDirectory()).toBeTruthy();
        expect(fs.lstatSync(`${sandbox.developerPortal}/${docsSrcDir}/dst-foo/root.md`).isFile()).toBeTruthy();
        expect(fs.lstatSync(`${sandbox.developerPortal}/${docsSrcDir}/dst-foo/foo/bar.md`).isFile()).toBeTruthy();
    })

    test.skip('Link configured paths with dot (root to root)', async () => {
        withDirConfig(sandbox);

        // prepare developer-portal checkout
        prepareDeveloperPortalCheckout(sandbox);
        prepareDummySource(sandbox);

        // mount root to root
        const result = await docsCli(['link', '--src', '.', '--dst', '.'], sandbox.cwd, timeout.medium);

        expectSuccess(result);

        expect(fs.lstatSync(`${sandbox.developerPortal}/${docsSrcDir}/foo`).isDirectory()).toBeTruthy();
        expect(fs.lstatSync(`${sandbox.developerPortal}/${docsSrcDir}/root.md`).isFile()).toBeTruthy();
        expect(fs.lstatSync(`${sandbox.developerPortal}/${docsSrcDir}/foo/bar.md`).isFile()).toBeTruthy();
    })

    test('Link developer-portal (self-reference)', async () => {
        withDirConfig(sandbox)

        // prepare developer-portal checkout
        prepareDeveloperPortalCheckout(sandbox);

        const result = await docsCli(['link'], sandbox.developerPortal, timeout.low);

        expect(result.stdout).toContain('This command can\'t run in developer-portal');
    })
})