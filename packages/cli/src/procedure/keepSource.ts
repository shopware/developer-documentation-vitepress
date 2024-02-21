import {output} from "../output";
import path from "path";
import {execSync} from "child_process";
import fs from "fs";

export const keepSource = (cwdDir: string, src: string, dst: string) => {
    output.notice(`Keeping source ${cwdDir} available under ${dst}/_source`);
    try {
        const dst_source = path.join(dst, '_source');
        if (fs.existsSync(dst_source)) {
            console.log(`Already exists: ${dst_source}`);
            return;
        }

        const response = execSync(`ln -s ${cwdDir} ${dst_source}`);
        output.log(`${response}`);
    } catch (e) {
        console.log(`Error symlinking ${src}`);
        console.log(e);
    }
}