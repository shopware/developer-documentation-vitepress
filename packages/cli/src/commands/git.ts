import { output } from "../output";
import { repositories } from "../data";
import { composeRepository } from "../helpers";
import { execSync } from "child_process";
import fs from "fs";
import link from "./link";
import path from "path";

export default {
    name: 'git',
    description: 'Checkout all repos to the ./repos/',
    options: [
        {
            name: 'c --clean',
            default: false,
        },
        {
            name: 'p --pull',
            default: false,
        },
    ],
    handler: async ({ clean, pull }: { clean: boolean, pull: boolean }) => {
        output.notice('Cloning all repos to ./repos/')

        for (const repository of repositories) {
            if (repository.name.startsWith('gitlab.shopware.com')) {
                continue;
            }

            output.notice(`Cloning ${repository.name}`)

            const dir = repository.name.split('/').reverse()[0];
            const cloneDir = path.join('repos', `${dir}-${repository.branch}`);
            const exists = fs.existsSync(cloneDir);

            if (exists && clean) {
                output.notice(`Deleting ${cloneDir}`);
                fs.rmSync(cloneDir)
            }

            // clone or pull
            let newCheckout = false;
            if (!exists) {
                output.notice(`Cloning to ${cloneDir}`);
                execSync(`git clone --depth 1 -b ${repository.branch} ${composeRepository(repository.name, { org: repository.org, separator: ':' })} ${cloneDir}`);
                newCheckout = true;
            } else if (pull) {
                output.notice(`Pulling to ${cloneDir}`);
                execSync(`git -C ${cloneDir} pull --ff`);
            } else {
                output.notice(`Dir ${cloneDir} exists, use -c (--clean) or -p (--pull) to update`);
            }

            // symlink
            if (newCheckout) {
                output.notice(`Symlinking ${cloneDir}/${repository.src} to src/${repository.dst}`)
                await link.handler({
                    src: path.join(cloneDir, repository.src),
                    dst: repository.dst,
                    wd: process.cwd(),
                    symlink: true
                });
            }
        }

        output.success('Cloned all repos to the ./repos/')
    }
}