import inquirer from "inquirer";
import {choices} from "../helpers";
import {output} from "../output";
import confirm from '@inquirer/confirm';
import fs from "fs";
import shellescape from "shell-escape";
import {commands} from "../commands";

const allAliases = {
    'docs:link': 'Link docs from your docs dir to the target/destination dir (symlink, rsync or copy strategies)',
    'docs:cleanup': 'Remove docs in your local developer-portal checkout',
    'docs:preview': 'Preview docs (npm run dev)',
    'docs:build': 'Build docs (npm run build)',
    'docs:test': 'Run e2e docs tests (dev)',
    'docs:test:build': 'Run e2e docs tests (build)',
    'docs:pull': 'Pull latest changes from remote',
    'docs:embed': 'Embed other repositories (multi-clone)',
    'docs:manage': 'Manage mount points',
    'docs:clone': 'Clone other repositories',
    'docs:config': 'Reconfigure CLI',
};

export default {
    name: 'install',
    description: 'Update aliases/scripts in package.json',
    options: [],
    handler: async () => {
        const packageJson = `${process.cwd()}/package.json`;
        output.notice(`Installing aliases to ${packageJson}`);

        const {aliases} = await inquirer.prompt([
            {
                type: 'checkbox',
                name: 'aliases',
                message: `Pick aliases that you would like to install`,
                choices: choices(allAliases),
                pageSize: Object.keys(allAliases).length
            }
        ]);

        if (!aliases.length) {
            output.error('Empty selection, exiting ...');
            return;
        }

        try {
            const data = fs.readFileSync(packageJson);
            const jsonObject = JSON.parse(`${data}`);

            if (!jsonObject.scripts) {
                jsonObject.scripts = {};
            }

            const newScripts: { [key: string]: string } = {};
            for (const alias of aliases) {
                const name = alias.substring('docs:'.length);
                const command = commands.find(command => command.name === name);

                const args = [
                    name,
                ];

                // ask for options
                // @ts-ignore
                const options = command?.options?.filter(option => option.name.includes('<')) || [];

                if (options.length) {
                    output.log(`Configuring defaults for ${alias}`);
                }

                // build inquiry
                let response = await inquirer.prompt(options.map((option: { name: string, description?: string, defaultValue?: string | boolean, example?: string }) => {
                    const name = option.name.split('<')[1].split('>')[0];
                    const message = option.description || name;
                    const defaultValue = option.defaultValue || option.example || null;

                    return {
                        type: 'input',
                        name,
                        message,
                        default: defaultValue,
                    };
                }));

                // append options, filter empty and escape values
                Object.keys(response || {})
                    .filter(key => response[key])
                    .forEach(key => args.push(`--${key} ${shellescape([response[key]])}`))

                newScripts[alias] = `../developer-portal/docs-cli ${args.join(' ')}`;
            }

            output.log(JSON.stringify({scripts: newScripts}, null, 2));
            const confirmed = await confirm({
                message: `Do you really want to add selected aliases to the ${packageJson}?`
            });

            if (!confirmed) {
                output.error('Exiting ...');
                return;
            }

            // join all scripts
            jsonObject.scripts = {
                ...jsonObject.scripts,
                ...newScripts,
            };
            fs.writeFileSync(packageJson, JSON.stringify(jsonObject, null, 2));

            output.success(`Aliases installed in ${packageJson}`);
        } catch (err) {
            output.error(err);
            return;
        }
    }
};