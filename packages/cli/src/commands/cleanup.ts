import {output} from "../output";
import {repositories, docsSrcDir} from "../data";
import inquirer from "inquirer";
import {getDeveloperPortalPath} from "../helpers";
import fs from "fs";
import {cleanup} from "../procedure/cleanup";
import path from "path";

export default {
    name: 'cleanup',
    description: 'Remove <dst> in developer-portal',
    options: [],
    handler: async () => {
        output.notice('Removing symlinks and copied dirs');
        const developerPortalPath = await getDeveloperPortalPath();

        const mountPoints = repositories
            .map(repository => repository.dst)
            .filter(dst => fs.existsSync(path.join(developerPortalPath, docsSrcDir, dst)));

        if (!mountPoints.length) {
            output.notice('No mountpoints found. Please, manually cleanup mountpoints');
            return;
        }

        const {dsts} = await inquirer.prompt([
            {
                type: 'checkbox',
                name: 'dsts',
                message: `Pick destination mountpoints that should be removed`,
                choices: mountPoints,
            }
        ]);

        for (const dst of dsts) {
            const fullPath = path.join(developerPortalPath, docsSrcDir, dst);
            const stat = fs.statSync(fullPath);
            const type = stat.isDirectory()
                ? 'dir'
                : (stat.isSymbolicLink() ? 'symlink' : null);

            if (!type) {
                output.error(`Unknown type ${stat}`);
                continue;
            }

            await cleanup({type, fullPath});
        }

        output.success('Project cleaned up');
    }
};