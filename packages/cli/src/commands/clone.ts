import {composeRepository, requireParam, sh} from "../helpers";
import {optionDst, optionSrc, optionCI} from "../options";
import {output} from "../output";
import {repositories} from "../data";
import inquirer from "inquirer";
import {storage} from "../storage";
import {env} from "process";
import {clone} from "../procedure/clone";

export default {
    name: 'clone',
    description: 'Clone <src> from <branch> in <repository> to <dst> in developer-portal',
    options: [
        {
            name: 'r --repository <repository>',
            example: 'frontends | shopware/frontends | shopware/frontends.git | github.com/shopware/frontends.git | ssh://git@gitlab.com/shopware/frontends.git',
        },
        {
            name: 'a --as <as>',
            example: 'shopware/frontends',
        },
        {
            name: 'b --branch <branch>',
            defaultValue: 'main'
        },
        optionSrc,
        optionDst,
        {
            name: 'o --org <org>',
        },
        {
            name: 'u --user <user>',
            defaultValue: 'git'
        },
        {
            name: 'p --pass <pass>',
        },
        {
            name: 'g --git <git>',
        },
        optionCI,
    ],
    handler: async ({
                        repository,
                        branch,
                        src,
                        dst,
                        org,
                        user,
                        pass,
                        git,
                        ci
                    }: {
        repository: string,
        branch: string,
        src: string,
        dst: string,
        org?: string,
        user?: string,
        pass?: string,
        git?: string,
        ci?: boolean
    }) => {
        if (!repository) {
            output.error('Repository is required');
            return;
        }

        output.notice(`Preparing ${repository}`);

        const configuredRepo = repositories.find(repo => repo.name.endsWith(`/${repository.split('/').reverse()[0]}`));

        if (!configuredRepo) {
            output.warn('Manually configuring', repository);
        }

        const defaultSrc = configuredRepo?.src ?? null;
        const defaultDst = configuredRepo?.dst ?? null;

        src = await requireParam(src, optionSrc, defaultSrc);
        dst = await requireParam(dst, optionDst, defaultDst);

        const myEnv: { [key: string]: string } = {};
        for (const repo of repositories) {
            if (repo.name !== repository) {
                continue;
            }

            if (typeof repo.env === "undefined") {
                continue;
            }

            output.notice('Gathering env vars');
            // @ts-ignore
            const repoEnv: { [key: string]: { description: string, as?: string } } = repo.env || {};
            for (const key of Object.keys(repoEnv)) {
                // check for env variable
                if (env[key]) {
                    // @ts-ignore
                    myEnv[key] = env[key];
                } else {
                    // check for local storage
                    const saved = storage.get(key);
                    if (saved) {
                        myEnv[key] = saved;
                    } else {
                        const message = repoEnv[key].description;
                        const {value} = await inquirer.prompt([
                            {
                                name: 'value',
                                type: 'password',
                                message: `${message} - ${key}`,
                            }
                        ]);

                        storage.set(key, value);
                        myEnv[key] = value;
                    }
                }

                if (myEnv[key] && repoEnv[key].as === 'user') {
                    user = myEnv[key];
                } else if (myEnv[key] && repoEnv[key].as === 'pass') {
                    pass = myEnv[key];
                }
            }
        }

        output.notice(`Cloning ${repository}`);
        repository = composeRepository(repository, {git, org, user, pass});
        await clone({
            repository,
            branch,
            src,
            dst,
            ci,
            options: {env: myEnv}
        });

        output.success(`Repository cloned`);
    }
};