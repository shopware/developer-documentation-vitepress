import cli from "../../cli/src/cli";
import {exec, ExecOptions} from "child_process";
import * as path from "path";
import {v4 as uuid} from 'uuid';
import fs from "fs-extra";

export interface Sandbox {
    projectsPath: string;
    cwd: string;
    developerPortal: string;
}

export interface Result {
    code: number;
    error: any;
    stdout: string;
    stderr: string;
}

export const createProgram = (data?: string[]) => {
    const program = cli.program();

    if (data) {
        program.parse([
            'node',
            'docs-cli',
            ...data,
        ])
    }

    return program;
}

export const docsCli = (args: string[], cwd = '.', options: ExecOptions = {}): Promise<Result> => new Promise(resolve => {
    // avoid referencing
    const finalOptions = {...options};

    if (!finalOptions.cwd) {
        finalOptions.cwd = cwd;
    }

    if (!finalOptions.timeout) {
        finalOptions.timeout = 3000; // 3s
    }

    //const command = `node ${path.resolve("./docs-cli")} ${args.join(" ")}`;
    const command = `${path.resolve("./docs-cli")} ${args.join(" ")}`;
    return exec(
        command,
        finalOptions,
        (error, stdout, stderr) => {
            resolve({
                code: error && error.code ? error.code : 0,
                error,
                stdout: stdout.trim(),
                stderr: stderr.trim()
            });
        }
    );
})

export const createSandbox = (): Sandbox => {
    // double sandbox for sandboxed .docs-cli
    const projectsPath = path.resolve(path.join("./sandbox/", uuid()));
    const cwd = path.join(projectsPath, uuid());

    //console.log(`Creating sandbox: ${cwd}`);
    fs.mkdirSync(cwd, {recursive: true});
    //console.log(`Sandbox created: ${cwd}`);

    return {
        projectsPath,
        cwd,
        developerPortal: `${projectsPath}/developer-portal`,
    }
}

export const destroySandbox = (sandbox: Sandbox) => {
    //console.log(`Removing sandbox: ${sandbox.projectsPath}`);
    fs.rmSync(sandbox.projectsPath, {recursive: true, force: true});
    //console.log(`Sandbox removed: ${sandbox.projectsPath}`);
    return undefined;
}

/**
 * @deprecated
 *     // https://github.com/superflycss/cli/blob/master/index.spec.js
 *     // https://fireflysemantics.medium.com/unit-testing-commander-scripts-with-jest-bc32465709d6
 *     // https://vitest.dev/guide/ui.html
 */
export const sandbox = async (task: Function) => {
    const sandbox = createSandbox();

    try {
        return await task(sandbox.cwd);
    } catch (e) {
        // console.error(e);
    } finally {
        destroySandbox(sandbox);
    }
}

export const terminates = async (promise: Promise<any>) => {
    const result = await promise;

    expect(result.error.signal).toEqual('SIGTERM');

    return result;
}

export const timeout = {
    no: {
        timeout: 0,
    },
    low: {
        timeout: 3000,
    },
    medium: {
        timeout: 15000,
    },
    moderate: {
        timeout: 30000,
    },
    high: {
        timeout: 150000,
    },
};

export const createConfig = (projectsDir: string, contents: { [key: string]: any }) => {
    const dirCLI = `${projectsDir}/.docs-cli`;
    fs.mkdirSync(dirCLI);
    Object.keys(contents).forEach(file => {
        fs.writeFileSync(`${dirCLI}/${file}`, JSON.stringify(contents[file]));
    })
}

export const withDirConfig = (sandbox: Sandbox, secrets = {}) => {
    createConfig(sandbox.projectsPath, {
        'dir.root': sandbox.projectsPath,
        'dir.developer-portal': `${sandbox.projectsPath}/developer-portal`,
        ...secrets,
    });
}

export const fetchSecrets = () => {
    const secrets: { [key: string]: string | undefined } = {
        GITLAB_FRONTENDS_USERNAME: process.env.GITLAB_FRONTENDS_USERNAME,
        GITLAB_FRONTENDS_ACCESS_KEY: process.env.GITLAB_FRONTENDS_ACCESS_KEY,
        FIGMA_TOKEN: process.env.FIGMA_TOKEN,
        FIGMA_FILE: process.env.FIGMA_FILE,
    };

    Object.keys(secrets).forEach(secret => {
        if (secrets[secret]) {
            return;
        }

        if (!fs.existsSync(`../.docs-cli/${secret}`)) {
            return;
        }

        // parse from parent (local) env config
        secrets[secret] = JSON.parse(`${fs.readFileSync(`../.docs-cli/${secret}`)}`);
    });

    return secrets;
}