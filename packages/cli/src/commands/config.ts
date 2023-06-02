import {output} from "../output";
import fs from "fs";
import {repositories} from "../data";
import inquirer from "inquirer";
import {choices} from "../helpers";
import {storage} from "../storage";
import path from "path";

export default {
    name: 'config',
    description: 'Reconfigure .docs-cli',
    options: [
        {
            name: 'd --destroy',
            description: 'Destroy configuration',
        },
        {
            name: 'v --view',
            description: 'View configuration',
        }
    ],
    handler: async ({destroy, view}: { destroy: boolean, view: boolean }) => {
        const docsCLI = '../.docs-cli';

        if ((destroy || view) && !fs.existsSync(docsCLI)) {
            output.log('Configuration dir non-existent');
            return;
        }

        if (destroy) {
            output.error(`Destroying ${docsCLI} folder config`);
            fs.rmSync(docsCLI, {recursive: true});
            output.error(`Destroyed ${docsCLI} folder config`);
            return;
        }

        if (view) {
            const files = fs.readdirSync(docsCLI);
            for (const file of files) {
                const content = await fs.readFileSync(path.join(docsCLI, file));
                output.log(`${file}: ${content}`);
            }
            return;
        }

        const keys = Object.values(repositories)
            .reduce((reduced, repository) => {
                Object.keys(repository.env || {})
                    .forEach(key => reduced.push(key));

                return reduced;
            }, [
                'dir.developer-portal',
                'dir.root',
            ]);

        const {reconfigure} = await inquirer.prompt([
            {
                type: 'checkbox',
                name: 'reconfigure',
                message: `Pick config keys that you would like to change`,
                choices: keys,
            }
        ]);

        for (const key of reconfigure) {
            const {value} = await inquirer.prompt([
                {
                    type: key.toUpperCase() === key ? 'password' : 'input',
                    name: 'value',
                    message: `Enter new value for ${key}, keep empty to delete it`,
                }
            ]);

            if (!value.trim()) {
                storage.delete(key);
                continue;
            }

            storage.set(key, value);
        }

        output.success('Reconfigured');
    }
};