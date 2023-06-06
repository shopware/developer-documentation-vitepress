import {output} from "../output";
import {pnpm} from "../helpers";

export default {
    name: 'build',
    description: 'Build docs in developer-portal',
    options: [],
    handler: async () => {
        output.notice('Building docs');

        await pnpm('build');

        output.success('Docs built');
    }
};