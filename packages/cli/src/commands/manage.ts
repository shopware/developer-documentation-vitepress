import {output} from "../output";
import clone from "./clone";
import {docsSrcDir, repositories} from "../data";
import inquirer from "inquirer";
import confirm from '@inquirer/confirm';
import {getDeveloperPortalPath} from "../helpers";
import fs from "fs";
import {cleanup} from "../procedure/cleanup";
import {cloneCustom} from "../procedure/clone";
import path from "path";

export default {
    name: 'manage',
    description: 'Add or remove mountpoints in developer-portal',
    options: [],
    handler: async ({}: { configure: boolean | null, ci: boolean }, program: any) => {

        output.notice('Managing repositories');
        const developerPortalPath = await getDeveloperPortalPath();

        const {selectedRepositories} = await inquirer.prompt([
            {
                type: 'checkbox',
                name: 'selectedRepositories',
                message: 'Select repositories to manage',
                choices: repositories.map(({name, branch}) => ({name: `${name} (${branch})`, value: `${name}@${branch}`})),
            }
        ]);

        for (const repo of repositories) {
            if (!selectedRepositories.includes(`${repo.name}@${repo.branch}`)) {
                continue;
            }

            output.notice(`Processing ${repo.name}@${repo.branch} in ${repo.dst}`);
            const fullPath = path.join(developerPortalPath, docsSrcDir, repo.dst);
            let exists = false;
            let type = null;
            try {
                exists = fs.existsSync(fullPath);
                const stat = fs.statSync(fullPath);
                type = stat.isDirectory()
                    ? 'dir'
                    : (stat.isSymbolicLink() ? 'symlink' : null);
            } catch (e) {
            }

            let clean = true;
            if (type) {
                clean = await cleanup({type, fullPath});
            }

            if (clean && await confirm({message: `Do you want to mount ${repo.name} @ ${repo.branch} into ${repo.dst}?`})) {
                await cloneCustom(repo, true, false);
            }
        }

        output.success('Repositories embedded');
    }
};