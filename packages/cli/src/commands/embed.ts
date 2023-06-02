import {output} from "../output";
import {repositories} from "../data";
import inquirer from "inquirer";
import {optionCI} from "../options";
import {cloneCustom} from "../procedure/clone";

export default {
    name: 'embed',
    description: 'Embed all docs repositories to developer-portal',
    options: [
        {
            name: 'c --configure',
            description: 'Apply manual configuration for embedding feature branches and forks',
            defaultValue: false,
        },
        optionCI,
    ],
    handler: async ({configure, ci}: { configure: boolean | null, ci: boolean }, program: any) => {
        output.notice('Embedding repositories');

        const {selectedRepositories} = await inquirer.prompt([
            {
                type: 'checkbox',
                name: 'selectedRepositories',
                message: 'Select repositories to embed',
                choices: repositories.map(({name, branch}) => ({name: `${name} (${branch})`, value: name})),
                when: !!configure,
            }
        ]);

        for (const repo of repositories) {
            if (configure && !selectedRepositories.includes(repo.name)) {
                continue;
            }

            if (!configure && repo.skip) {
                continue;
            }

            output.notice(`Processing ${repo.name}`);
            await cloneCustom(repo, configure, ci);
        }

        output.success('Repositories embedded');
    }
};