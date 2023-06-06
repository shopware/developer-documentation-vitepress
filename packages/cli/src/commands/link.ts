import {getDeveloperPortalPath, requireParam, sh} from "../helpers";
import {optionDst, optionSrc} from "../options";
import {output} from "../output";
import fs from "fs";
import {execSync} from "child_process";
import {copyConfig} from "../procedure/copyConfig";
import path from "path";

export default {
    name: 'link',
    description: 'Copy <src> from current working directory to <dst> in developer-portal',
    options: [
        optionSrc,
        optionDst,
        {
            name: 'ln --symlink',
            description: 'Use ln command',
        },
        {
            name: 'rs --rsync',
            description: 'Use rsync command',
        },
        {
            name: 'cp --copy',
            description: 'Use copy command',
        },
        {
            name: 'wd --wd',
            description: 'Use custom in-repo working directory (devcontainer)'
        }
    ],
    handler: async ({
                        src,
                        dst,
                        symlink,
                        rsync,
                        copy,
                        wd,
                    }: { src?: string, dst?: string, symlink?: boolean, rsync?: boolean, copy?: boolean, wd?: string }) => {
        // validate strategy
        if (((symlink ? 1 : 0) + (rsync ? 1 : 0) + (copy ? 1 : 0)) > 1) {
            output.error('You can use only one link strategy - symlink, rsync or copy');
            return;
        }

        const devcontainerWd = wd;
        const cwdDir = process.cwd();
        const developerDir = devcontainerWd
            ? cwdDir 
            : await getDeveloperPortalPath();
        
        if (!devcontainerWd && cwdDir === developerDir) {
            output.error('This command can\'t run in developer-portal');
            return;
        }

        output.notice('Linking docs directory');

        src = await requireParam(src, optionSrc);
        dst = await requireParam(dst, optionDst);

        // tmp disabled
        if (dst === '.') {
            output.error('Destination cannot be .');
            return;
        }

        if (symlink && dst === '.') {
            output.error('Destination cannot be . when using --symlink - use --copy or --rsync');
            return;
        }

        const strategies = {
            rsync: ({src, dst}: { src: string, dst: string }) => {
                output.notice(`Rsyncing from ${src} to ${dst}`);
                const excludes = [
                    '--exclude=node_modules',
                    '--exclude=.vitepress',
                    '--exclude=.gitignore',
                    '--exclude=package.json',
                    '--exclude=package-lock.json',
                    '--exclude=pnpm-lock.yaml',
                ];
                try {

                    // create deep dir
                    output.notice(`Creating deep dir ${dst}`);
                    fs.mkdirSync(dst, {recursive: true});

                    const response = execSync(`rsync -a ${src}${path.sep} ${dst} ${excludes.join(' ')}`);
                    output.log(`${response}`);
                } catch (e) {
                    throw `Error rsyncing ${src}`;
                }
            },
            symlink: ({src, dst}: { src: string, dst: string }) => {
                output.notice(`Symlinking from ${src} to ${dst}`);
                try {
                    const response = execSync(`ln -s ${src} ${dst}`);
                    output.log(`${response}`);
                } catch (e) {
                    throw `Error symlinking ${src}`;
                }
            },
            copy: ({src, dst}: { src: string, dst: string }) => {
                output.notice(`Copying from ${src} to ${dst}`);
                try {
                    const response = execSync(`cp -r ${src} ${dst}`);
                    output.log(`${response}`);
                } catch (e) {
                    throw `Error copying ${src}`;
                }
            }
        };

        const strategy = symlink
            ? strategies.symlink
            : (rsync ? strategies.rsync : strategies.copy);

        const toDelete = dst !== '.';

        src = path.join(cwdDir, src);
        dst = path.join(developerDir, 'src', dst);

        output.notice(`Linking to ${dst} from ${src}`);

        // delete existent dir
        if (toDelete && fs.existsSync(dst)) {
            if (fs.lstatSync(dst).isDirectory()) {
                output.notice(`Deleting dir ${dst}`);
            } else if (fs.lstatSync(dst).isSymbolicLink()) {
                output.notice(`Deleting symlink ${dst}`);
            } else {
                throw `Unknown destination type ${dst}`;
            }

            fs.rmSync(dst, {recursive: true, force: true});
        }

        // rsync into destination
        await strategy({src, dst});

        // copy additional config
        if (!symlink) {
            await copyConfig(src, dst);
        }

        output.success('Docs directory linked');
    }
};