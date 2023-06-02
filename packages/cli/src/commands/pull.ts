import {getDeveloperPortalPath, pnpm, run} from "../helpers";
import {output} from "../output";

export default {
    name: 'pull',
    description: 'Pull docs and install new dependencies in developer-portal',
    options: [],
    handler: async ({}, program: any) => {
        const developerPortalPath = await getDeveloperPortalPath();

        output.notice('Pulling from git');
        await run('git', ['pull', '--ff'], developerPortalPath);

        output.notice('Installing new packages');
        await pnpm('i', [], {dir: developerPortalPath});

        output.notice('Rebuilding CLI');
        await pnpm('cli:build', [], {dir: developerPortalPath});

        output.success('Developer portal up to date');
    }
};