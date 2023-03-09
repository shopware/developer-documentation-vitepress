import fs from "fs-extra";
import matter from "gray-matter";
import removeMd from "remove-markdown";
import {
    AdditionalMenuItemWithContext,
    SidebarConfig,
} from "../../vitepress/config";
import {MenuItemWithLink} from "vitepress-shopware-docs";

interface ObjectOfFiles {
    [key: string]: string | ObjectOfFiles;
}

interface FilesystemObject {
    hidden: boolean;
}

interface FilesystemTree {
    [key: string]: string | FilesystemTree | FilesystemObject;
}

interface MetaCollection {
    [key: string]: ObjectMeta;
}

interface ObjectMeta {
    hidden?: boolean;
    title: string;
    //text?: string
    link?: string;
    position: Number;
    items: ItemLink[];
    nolink?: boolean;
    description?: string;
}

interface MetaHead {
    name?: string;
    content?: string;
}

interface ItemLink {
    text?: string;
    link?: string;
    description?: string;
    position?: Number;
    items: ItemLink[];
}

interface NavConfig {
    title?: string;
    description?: string;
    position?: Number;
    items: ItemLink[];
    class?: string;
}

interface FrontmatterConfig {
    nav?: NavConfig;
    head: MetaHead[];
}

interface FrontmatterContent {
    content?: string[];
}

const getAllFiles = function (dirPath: string): ObjectOfFiles {
    const objectOfFiles: ObjectOfFiles = {};
    fs.readdirSync(dirPath).forEach(function (file: string) {
        // skip files and dirs starting with . or _
        if ([".", "_"].includes(file[0])) {
            return;
        }

        if (fs.statSync(`${dirPath}${file}`).isDirectory()) {
            const files = getAllFiles(`${dirPath}${file}/`);

            // skip empty dirs
            if (!Object.keys(files).length) {
                return;
            }

            objectOfFiles[file] = files;
        } else if (!file.endsWith(".md")) {
            // skip non .md files
        } else {
            objectOfFiles[file] = `${dirPath}${file}`;
        }
    });

    return objectOfFiles;
};

const niceName = (name: string): string => {
    if (name.endsWith('.md')) {
        name = name.substring(0, name.length - '.md'.length);
    }

    return name
        // replace - and _
        .replace(/([\-_])/g, " ")
        // replace double spaces
        .replace(/\s{2,}/g, " ")
        .trim()
        // uppercase the first character
        .replace(/^./, (str) => str.toUpperCase());
}

const getMetas = (folder: string, tree: FilesystemTree): MetaCollection => {
    return (
        Object.keys(tree)
            //.filter(file => file !== 'index.md')
            .reduce((reduced, file) => {
                const meta = tree[file];
                if (typeof meta === "string") {
                    // file
                    reduced[file] = getMeta(folder, file);
                } else if ("index.md" in meta) {
                    // dir with index
                    reduced[file] = getMeta(`${folder}${file}/`, "index.md");
                }

                return reduced;
            }, <MetaCollection>{})
    );
};

const reduceTree = (as: string, dirPath: string, tree: FilesystemTree) => {
    // use metas to sort items correctly
    const metas = getMetas(dirPath, tree);

    const reduced = Object.keys(tree)
        // .filter(file => file !== 'index.md')
        .reduce((reduced: ItemLink[], file, i) => {
            // hide entry
            if (metas[file]?.hidden) {
                return reduced;
            }

            // add custom links (menu items)
            if (metas[file]?.items) {
                metas[file].items.forEach((item) => {
                    if (!item.items) {
                        item.items = [];
                    }
                    reduced.push(item);
                });

                return reduced;
            }

            // should be added by parent directory?
            if (file === "index.md") {
                return reduced;
            }

            const filepath = tree[file];
            if (typeof filepath === "string") {
                // file
                const filename = file.substring(0, file.length - ".md".length);

                reduced.push({
                    text: metas[file]?.title || niceName(filename),
                    link: `/${as}/${filename}.html`,
                    items: [],
                    position: metas[file]?.position || 999,
                    description: metas[file]?.description,
                });

                return reduced;
            }

            // directory
            const newItem: ItemLink = {
                text: metas[file]?.title || niceName(file),
                items: reduceTree(
                    `${as}/${file}`,
                    `${dirPath}${file}/`,
                    <FilesystemTree>filepath
                ),
                position: metas[file]?.position || 999,
                description: metas[file]?.description,
            };

            // push link when linked
            if (!metas[file]?.nolink) {
                newItem.link = `/${as}/${file}/`;
            }

            reduced.push(newItem);

            return reduced;
        }, []);

    // sort reduced by metas?
    return reduced
        .sort((a: ItemLink, b: ItemLink) => {
            const aPosition = a.position || 999;
            const bPosition = b.position || 999;

            if (aPosition < bPosition) {
                return -1;
            } else if (aPosition > bPosition) {
                return 1;
            }

            return 0;
        })
        .map(({position, ...item}) => item);
};

export const getAllLinks = (as: string, dirPath: string) => reduceTree(as, dirPath, getAllFiles(dirPath));

function getTitle(data: FrontmatterConfig, content: string, filename: string) {
    let title;

    // 1 - custom title from nav.title frontmatter
    title = data?.nav?.title;
    if (title) {
        return title;
    }

    // 2 - title from og:title
    title = (data?.head || []).find(({name}) => name === "og:title")?.content;
    if (title) {
        return title;
    }

    // 3 - first heading from the content
    title = content.split('\n').find(line => line[0] === '#');
    if (title) {
        title = removeMd(title || '').trim();
        if (title) {
            return title;
        }
    }

    // 4 - transform filename
    return niceName(filename);
}

function getDescription(data: FrontmatterConfig, content: FrontmatterContent) {
    // 1 - og:description
    let description = (data?.head || []).find(
        ({name}) => name === "og:description"
    )?.content;

    // 2 - nav.description
    if (!description) {
        description = data?.nav?.description;
    }

    // 3 - first line?
    if (!description) {
        description = content?.content?.[0];
    }

    return description;
}

function getMeta(folder: string, file: string): ObjectMeta {
    const grayMatter = matter.read(`${folder}${file}`, {
        excerpt: true,
        excerpt_separator: "<!-- more -->",
    });

    const {data, content} = grayMatter;
    const nav = data.nav || {};

    if (!content?.length) {
        nav.nolink = true;
    }

    // read title
    if (!nav.title) {
        nav.title = getTitle(
            <FrontmatterConfig>data,
            content,
            file
        )
    }

    // read description
    if (!nav.description) {
        nav.description = getDescription(
            <FrontmatterConfig>data,
            <FrontmatterContent>content
        );
    }

    return nav;
}

export function transformLinkToSidebar(root: string, link: string) {
    const as = link.substring(1, link.length - 1);
    const folder = `${root}${as}/`;
    console.log(`Creating sidebar ${folder}`)

    // allow missing mount points in dev env
    if (process.env.SHOPWARE_DEV) {
        try {
            if (!fs.statSync(folder).isDirectory()) {
                console.error(`WARNING: Should be a directory ${folder}`);
                return [];
            }
        } catch (e) {
            console.error(`WARNING: Missing directory ${folder}\n`, e);
            return [];
        }
    }

    const metas = getMetas(folder, getAllFiles(folder));

    return fs
        .readdirSync(folder)
        .reduce(
            (
                reduced: Array<MenuItemWithLink | AdditionalMenuItemWithContext>,
                file
            ) => {
                // skip files/dirs starting with . or _
                if (file[0] === "." || file[0] === "_") {
                    return reduced;
                }

                if (file === 'node_modules') {
                    return reduced;
                }

                let hasIndex = false;
                if (!fs.statSync(`${folder}${file}`).isDirectory()) {
                    // skip non .md files
                    if (!file.endsWith('.md')) {
                        return reduced;
                    }

                    if (file === 'index.md') {
                        reduced.push({
                            link: `/${as}/`,
                            text: /*metas[file].title || */niceName(as),
                            items: [],
                        });
                    } else {
                        reduced.push({
                            link: `/${as}/${file.substring(0, file.length - '.md'.length)}.html`,
                            text: metas[file].title || niceName(file),
                            items: [],
                        });
                    }

                    return reduced;
                } else if (fs.existsSync(`${folder}${file}/index.md`)) {
                    hasIndex = true;
                    /*meta[`${folder}${file}/index.md`] = getMeta(
                    `${folder}${file}`,
                    `/index.md`
                  );*/
                }

                // collect links
                const links = getAllLinks(`${as}/${file}`, `${folder}${file}/`);

                // skip empty sections
                if (!Object.keys(links).length) {
                    return reduced;
                }

                if (links.length || hasIndex) {
                    reduced.push({
                        link: `/${as}/${file}/`,
                        text: niceName(file),
                        // @ts-ignore
                        items: links,
                    });
                }

                return reduced;
            },
            []
        );
}

export function makeSidebarConfig(
    root: string,
    config: SidebarConfig
): SidebarConfig {
    fs.readdirSync(root).forEach((dir) => {
        // skip hidden files/dirs
        if (dir[0] === "." || dir[0] === "_") {
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
        if (["resources", "public"].includes(dir)) {
            return;
        }

        const links = getAllLinks(dir, `${root}${dir}/`);
        // skip empty sections
        if (!Object.keys(links).length) {
            return;
        }

        // append new config
        config = <SidebarConfig>{
            ...config,
            [`/${dir}/`]: links,
        };
    });

    return config;
}

export const buildSidebarNav = (root: string, links: { link?: string, text: string, items?: [], repo?: string }[], sublinks?: string[]) => {
    // build custom links
    const sidebar = (sublinks || []).reduce((sidebar, link: string) => {
        sidebar[link] = transformLinkToSidebar(root, link);
        return sidebar;
    }, {});

    // append default links from 1st-level navigation
    return links
        .reduce((data, item) => {
            const {link, text, items, repo} = item;

            // build sidebar
            if (link) {
                data.sidebar[link] = transformLinkToSidebar(root, link);
            }

            // add to navigation
            const nav = {
                text,
                link,
            };
            if (link) {
                nav.activeMatch = `^${link}`;
            }
            if (repo) {
                nav.repo = repo;
            }
            if (items) {
                nav.items = items;
            }
            data.nav.push(nav);

            return data;
        }, {sidebar, nav: []})
};
