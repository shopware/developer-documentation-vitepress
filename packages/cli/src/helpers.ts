import process from "process";
import {execa, ExecaChildProcess} from "execa";
import inquirer from "inquirer";
import {storage} from "./storage";
import path from "path";

/*
import inquirerFuzzyPath from "inquirer-fuzzy-path";
inquirer.registerPrompt('fuzzypath', inquirerFuzzyPath);

const type = 'fuzzypath'; // input
const options = {
    itemType: 'directory',
    excludePath: nodePath => nodePath.startsWith('node_modules'),
    excludeFilter: nodePath => nodePath == '.',
};*/

export interface RepositoryConfig {
    user?: string;
    pass?: string;
    git?: string;
    org?: string;
    separator?: string;
}

export interface RepositoryConfigCollection {
    [key: string]: RepositoryConfig;
}

const pipe = (subprocess: ExecaChildProcess) => {
    subprocess.stdout?.pipe(process.stdout);
    subprocess.stderr?.pipe(process.stderr);

    return subprocess;
};

export const pnpm = async (run: string, args = [], options: { dir?: string, [key: string]: any } = {}) => {
    const cwd = options.dir || await getDeveloperPortalPath();

    const runParams = run === 'i'
        ? ['i']
        : ['run', run];

    return pipe(execa(`pnpm`, [
        '--dir',
        cwd,
        ...runParams,
        ...args
    ], {
        cwd,
        ...options,
    }));
}
export const npm = async (run: string, args: string[], options: { dir?: string, [key: string]: any }) => {
    const cwd = options.dir || await getDeveloperPortalPath();

    return pipe(execa(`npm`, [
        '--prefix',
        cwd,
        'run',
        run,
        ...args
    ], {
        cwd,
        ...options,
    }));
}
export const sh = async (run: string, args: string[], options: { dir?: string, [key: string]: any } = {}) => {
    const cwd = options.dir || await getDeveloperPortalPath();

    return pipe(execa(`sh`, [
        path.join(cwd, run),
        ...args
    ], {
        cwd,
        ...options,
    }));
}
export const run = async (run: string, args: string[], options: {
    dir?: string,
    env?: object,
    [key: string]: any
} = {}) => {
    const cwd = options.dir || await getDeveloperPortalPath();

    // no cwd!
    return pipe(execa(run, [
        ...args
    ], {
        cwd,
        // @ts-ignore
        env: options.env ?? {},
        stdio: [0, 1, 2]
        //...options,
    }));
}

export const choices = (choices: { [key: string]: string }) => {
    return Object.keys(choices).reduce((reduced, key) => {
        reduced.push({value: key, name: `${key} - ${choices[key]}`});
        return reduced;
    }, <{ value: string, name: string }[]>[])
}

export const requireParam = async (param: string | undefined, option: {
    name: string,
    description?: string
}, defaultValue?: string | null | undefined): Promise<string> => {
    if (param) {
        return param;
    }

    let response = await inquirer.prompt([
        {
            type: 'input',
            name: 'param',
            message: option.description || option.name,
            default: defaultValue ?? null,
        }
    ]);

    return response.param;
}
export const composeRepository = (repo: string, {git, org, user, pass, separator = '/'}: RepositoryConfig) => {
    // append git
    if (!repo.endsWith('.git')) {
        repo = `${repo}.git`;
    }

    // append org
    if (repo.includes('shopware.com/')) {
        // keep hardcoded
    } else if (!repo.includes('shopware/')) {
        repo = `${org || 'shopware'}/${repo}`;
    } else if (org) {
        // replace org
        repo = repo.replace('shopware/', `${org}/`);
    }

    // append domain
    if (!repo.includes('gitlab.com') && !repo.includes('github.com') && !repo.includes('gitlab.shopware.com')) {
        repo = `${git || 'github.com'}${separator}${repo}`;
    } else if (git) {
        // replace org
        repo = repo
            .replace('github.com', git)
            .replace('gitlab.com', git);
    }

    // add user
    if (!repo.includes('git@')) {
        if (repo.includes('//')) {
            repo = repo.replace('//', `//git@`)
        } else {
            repo = `git@${repo}`;
        }
    }

    if (user && pass) {
        // replace user and pass
        repo = repo.replace('git@', `${user}:${pass}@`);
    } else if (user) {
        // replace user
        repo = repo.replace('git@', `${user}@`);
    }

    // add schema
    if (!repo.includes('ssh://') && !repo.includes('https://')) {
        repo = `https://${repo}`;
    } else {
        // replace schema to https
        repo = repo.replace('ssh://', 'https://');
    }

    // remove schema (clone.sh)
    repo = repo.replace('https://', '');

    return repo;
}
export const getPath = async (key: string, message: string) => {
    // get root path
    let root = '/www';
    if (key !== 'root') {
        root = await getProjectsPath();
    }

    // get stored path
    const myPath = storage.get(`dir.${key}`);
    if (myPath) {
        return myPath;
    }

    // ask for path
    const {dir} = await inquirer.prompt([
        {
            type: 'input',
            name: 'dir',
            message,
            default: key === 'root'
                ? root
                : path.join(root, key),
        }
    ]);

    // save stored path
    storage.set(`dir.${key}`, dir);

    return dir;
};
export const getProjectsPath = async () => getPath('root', 'Enter root path for ALL of your projects');
export const getDeveloperPortalPath = async () => getPath('developer-portal', 'Enter path for your local install of developer-portal');