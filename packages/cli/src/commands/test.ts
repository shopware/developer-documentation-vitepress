import {output} from "../output";
import {pnpm} from "../helpers";

export default {
    name: 'test',
    description: 'Run vitest end-to-end suite in your local developer-portal repository. Use build flag (-b / --build) to run test on the build instead of dev server.',
    options: [
        {
            name: 'b --build',
            description: 'Create a build and then run e2e tests'
        }
    ],
    handler: async ({build = false}, program: any) => {
        output.notice('Running test');
        await pnpm(build ? 'test:build' : 'test');
        output.success('Tests ran');
    }
};