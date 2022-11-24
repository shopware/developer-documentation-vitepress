import fs from "fs-extra";
import path from "path";
import {SidebarConfig, SidebarGroup} from "../../vitepress/config";

const getAllFiles = function (dirPath: string/*, arrayOfFiles = <string[]>[]*/) {
    const files = fs.readdirSync(dirPath)

    const objectOfFiles = {};
    files.forEach(function (file: string) {
        // skip files and dirs starting with . or _
        if (['.', '_'].includes(file[0])) {
            return;
        }

        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            objectOfFiles[file] = getAllFiles(dirPath + "/" + file)
        } else if (!file.endsWith('.md')) {
            // skip non .md files
        } else {
            objectOfFiles[file] = path.join(dirPath, "/", file);
        }
    })

    return objectOfFiles
}

const reduceTree = (as: string, dirPath: string, tree: object) => {
    const trimmedPath = dirPath.substring(2);

    return Object.keys(tree)
        .filter(file => file !== 'index.md')
        .reduce((reduced, fullfile) => {
            //const file = `${fullfile.substring(trimmedPath.length)}`;
            const file = fullfile;

            const endFile = file.split('/').reverse()[0];

            // conditionally trim .md?
            const name = endFile.endsWith('.md')
                ? endFile.substring(0, endFile.length - 3)
                : endFile;

            const text = name.split('-').join(' ')
                .split('_').join(' ')
                // insert a space before all caps
                .replace(/([A-Z])/g, ' $1')
                .trim()
                // uppercase the first character
                .replace(/^./, str => str.toUpperCase());

            const items = tree[fullfile] && typeof tree[fullfile] === 'object'
                ? reduceTree(`${as}/${name}`, dirPath, tree[fullfile])
                : [];
            const link = `/${as}/${name}.html`;

            //if (items.length) {
            reduced.push({
                text,
                link,
                items
            });
            //}

            return reduced;
        }, [])
}

export const getAllLinks = function (as: string, dirPath: string) {
    const tree = getAllFiles(dirPath);

    return reduceTree(as, dirPath, tree);
}

export function readSidebar(as: string, folder = './src/') {
    return fs.readdirSync(folder)
        .reduce((reduced: SidebarGroup[], file) => {
            if (!fs.statSync(`${folder}${file}`).isDirectory()) {
                return reduced;
            }

            if (file[0] === '.') {
                return reduced;
            }

            reduced.push({
                link: `/${as}/${file}/`,
                text: `${file}`,// file.toUpperCase(),
                items: getAllLinks(`${as}/${file}`, `${folder}${file}/`)
            });

            return reduced;
        }, [])
}

export function makeSidebarConfig(root: string, config: SidebarConfig): SidebarConfig {
    fs.readdirSync(root)
        .forEach(dir => {
            // skip hidden files/dirs
            if (dir[0] === '.') {
                return;
            }

            // skip files
            if (!fs.statSync(`${root}${dir}`).isDirectory()) {
                return;
            }

            // skip existent dirs
            if (Object.keys(config).includes(`/${dir}/`)) {
                return;
            }

            // skip resource dirs
            if (['resources', 'public'].includes(dir)) {
                return;
            }

            // append new config
            config = <SidebarConfig>{
                ...config,
                [`/${dir}/`]: getAllLinks(dir, `${root}${dir}/`),
            };
        });

    return config;
}