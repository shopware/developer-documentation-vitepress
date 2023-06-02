import fs from "fs";
import path from "path";
import {output} from "../output";
import {run} from "../helpers";

export const copyConfig = async (src: string, dst: string) => {
    const configs = [
        {
            src: path.join('.github', 'scripts', 'docs.yml'),
            dst: 'docs.yml',
            message: 'Copying external config',
        },
        {
            src: '.gitbook.yaml',
            dst: '.gitbook.yaml',
            message: 'Copying gitbook config',
        }
    ];

    for (const config of configs) {
        let finalSrc = path.join(src, config.src);
        if (!fs.existsSync(finalSrc) || !fs.lstatSync(finalSrc).isFile()) {
            continue;
        }

        output.notice(config.message);
        await run('cp', [finalSrc, path.join(dst, config.dst)], {dir: src});
    }
}