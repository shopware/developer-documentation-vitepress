import {output} from "../output";
import {pnpm} from "../helpers";

export default {
    name: 'preview',
    description: 'Preview docs',
    options: [],
    handler: async ({}, program: any) => {
        output.notice('Previewing docs');

        await pnpm('dev');

        output.success('Docs previewed');
    }
};