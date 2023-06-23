import {env} from "process";
import path from "path";
import fs from "fs";
import {output} from "./output";

export interface Repository {
    name: string;
    src: string | string[];
    dst: string | string[];
    branch: string | string[];
    org: string | string[];
    env?: object;
    skip?: boolean;
}

let portalJson: { repositories: Repository[], src?: string } | null = null;
const getPortalJson = () => {
    if (portalJson) {
        return portalJson;
    }

    const portalJsonPath = path.join('.', '.vitepress', 'portal.json');
    output.debug('Reading ' + portalJsonPath);

    if (!fs.existsSync(portalJsonPath)) {
        output.debug('No ' + portalJsonPath);
        return null;
    }

    return portalJson = JSON.parse(`${fs.readFileSync(portalJsonPath)}`)
}

const fetchSrc = () => getPortalJson()?.src ?? 'src';

const mappedRepositories = () => (portalJson?.repositories || [])
    .map((repo: Repository) => {
        if (Array.isArray(repo.branch)) {
            repo.branch = repo.branch
                .map(key => key.startsWith('env.') ? env[key.substring('env.'.length)] : key)
                .find(value => value?.length)!;
        }
        if (Array.isArray(repo.org)) {
            repo.org = repo.org
                .map(key => key.startsWith('env.') ? env[key.substring('env.'.length)] : key)
                .find(value => value?.length)!;
        }
        if (Array.isArray(repo.src)) {
            repo.src = path.join(...repo.src);
        }
        if (Array.isArray(repo.dst)) {
            repo.dst = path.join(...repo.dst);
        }

        return repo;
    });

export const docsSrcDir = fetchSrc();

export const repositories = mappedRepositories();