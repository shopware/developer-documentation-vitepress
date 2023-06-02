import confirm from "@inquirer/confirm";
import {output} from "../output";
import fs from "fs";

export const cleanup = async ({type, fullPath}: { type: string, fullPath: string }): Promise<boolean> => {
    if (!await confirm({message: `Do you really want to delete ${type} ${fullPath}`})) {
        return false;
    }

    output.notice(`Deleting ${type} ${fullPath}`);
    if (type === 'dir') {
        fs.rmSync(fullPath, {recursive: true});
    } else if (type === 'symlink') {
        fs.rmSync(fullPath);
    } else {
        return false;
    }

    output.success(`Deleted ${type} ${fullPath}`);
    return true;
}