import {output} from "../output";
import fs from "fs";
import os from "os";
import {getDeveloperPortalPath, run} from "../helpers";
import {execSync} from 'child_process';
import {v4 as uuid} from 'uuid';
import inquirer from "inquirer";
import cloneCommand from "../commands/clone";
import {copyConfig} from "./copyConfig";
import path from "path";
import {docsSrcDir} from "../data";

export const clone = async ({
                                repository, // 1
                                branch, // 2
                                src, // 3
                                dst, // 4
                                ci,
                                options
                            }: { repository: string, branch: string, src: string, dst: string, ci: boolean | undefined, options: { env?: object } }) => {
    // prepare variables
    const tmpDir = path.join(os.tmpdir(), uuid());
    const developerDir = ci
        ? process.cwd()
        : await getDeveloperPortalPath();
    src = path.join(tmpDir, src);
    dst = path.join(developerDir, docsSrcDir, dst);

    const cleanupTmpDir = () => {
        if (!fs.existsSync(tmpDir)) {
            output.notice(`No need for cleaning - ${tmpDir}`);
            return;
        }

        output.notice('Cleaning up');
        fs.rmSync(tmpDir, {recursive: true, force: true});
    }

    const cleanRepo = repository.split('@')[1];
    output.notice(`Cloning to ${dst} from ${src} in ${branch}@${cleanRepo}`);

    // delete existent dir
    if (fs.existsSync(dst) && fs.lstatSync(dst).isDirectory()) {
        output.notice(`Deleting dir ${dst}`);
        fs.rmSync(dst, {recursive: true, force: true});
    } else {
        output.notice(`Dir does not exist ${dst}`);
    }

    let caughtException;
    try {
        // clone into tmp dir
        output.notice(`Cloning branch ${branch} in repo ${cleanRepo}`);

        //await run('which', ['git'], {dir: tmpDir});
        //await run('/usr/local/bin/git', ['--version'], {dir: tmpDir});
        //await run('git', ['clone', '--depth', '1', '-b', branch, `https://${repository}`, tmpDir], {dir: tmpDir});
        const gitCloneOutput = execSync(`git clone --depth 1 -b ${branch} https://${repository} ${tmpDir}`);
        output.log(`${gitCloneOutput}`);

        // special flows
        const docsAfterClone = '.github/scripts/docs-after-clone.sh';
        const fullDocsAfterClone = path.join(tmpDir, docsAfterClone);
        if (fs.existsSync(fullDocsAfterClone) && fs.lstatSync(fullDocsAfterClone).isFile()) {
            output.notice('Running additional steps');
            // make executable
            fs.chmodSync(fullDocsAfterClone, 0o777);

            // run after-clone script
            await run(fullDocsAfterClone, [tmpDir], {
                dir: tmpDir,
                env: options.env
            });
        }

        // create deep dir
        output.notice(`Creating deep dir ${dst}`);
        fs.mkdirSync(dst, {recursive: true});

        // create a new symlink
        output.notice(`Copying ${src} to ${dst}`);
        await run('cp', ['-ra', `${src}/.`, `${dst}/`], {dir: tmpDir});

        // copy additional config
        await copyConfig(tmpDir, dst);
    } catch (e) {
        caughtException = e;
    }

    // cleanup tmp dir
    cleanupTmpDir();

    if (caughtException) {
        throw caughtException;
    }
}

export const cloneCustom = async (repo: { name: string, src: string, dst: string, branch: string, org: string }, configure: boolean | null, ci: boolean) => {
    // allow custom branch (features) and organization (forks)
    let branch = repo.branch;
    let org = repo.org;
    if (configure) {
        const response = await inquirer.prompt([
            {
                type: 'text',
                name: 'branch',
                message: 'Branch',
                default: branch,
            },
            {
                type: 'text',
                name: 'org',
                message: 'Organization (fork)',
                default: org,
            }
        ]);
        branch = response.branch;
        org = response.org;
    }

    // call clone command
    output.notice(`Embedding ${repo.name}`);
    await cloneCommand.handler({
        repository: repo.name,
        src: repo.src,
        dst: repo.dst,
        branch,
        org,
        ci,
    });

    output.success(`Processed ${repo.name}`);
}