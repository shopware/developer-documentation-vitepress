import path from "path";
import fs from "fs";
import {output} from "../output";
import {run} from "../helpers";

export const docsAfterClone = async (root: string, options: { env?: object } = {}) => {
    const docsAfterCloneScript = '.github/scripts/docs-after-clone.sh';
    const fullDocsAfterClone = path.join(root, docsAfterCloneScript);

    if (!fs.existsSync(fullDocsAfterClone) || !fs.lstatSync(fullDocsAfterClone).isFile()) {
        output.log(`No after-clone script found at ${fullDocsAfterClone}`);
        return;
    }

    output.notice('Running additional steps');

    // make executable
    fs.chmodSync(fullDocsAfterClone, 0o777);

    // run after-clone script
    await run(fullDocsAfterClone, [root], {
        dir: root,
        env: options.env
    });
}