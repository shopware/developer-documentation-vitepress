import fs from "fs-extra";
import matter from "gray-matter";
import removeMd from "remove-markdown";
import {AdditionalMenuItemWithContext} from "../../vitepress/config";
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

interface MetaWithTree {
    meta: MetaCollection;
    tree: FilesystemTree;
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

const removeExtension = (name: string) => {
    if (!name.endsWith(".md")) {
        return name;
    }

    return name.substring(0, name.length - ".md".length);
}

const getTitleFromFilename = (name: string): string => {
    name = removeExtension(name);
    let lastName = name.split('/').reverse()[0];

    // replace index with folder name
    if (lastName === 'index') {
        lastName = name.split('/').reverse()[1] || lastName;
    }

    return lastName
        // replace - and _
        .replace(/([\-_])/g, " ")
        // replace double spaces
        .replace(/\s{2,}/g, " ")
        .trim()
        // uppercase the first character
        .replace(/^./, (str) => str.toUpperCase());
};

const getMetas = (folder: string): MetaWithTree => {
    const tree: FilesystemTree = getAllFiles(folder);

    return {
        meta: Object.keys(tree)
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
            }, <MetaCollection>{}),
        tree,
    };
};

const reduceTree = (as: string, dirPath: string) => {
    // use metas to sort items correctly
    const {
        meta: metas,
        tree
    } = getMetas(dirPath);

    const reduced = Object.keys(tree)
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
                reduced.push({
                    text: metas[file]?.title || getTitleFromFilename(`${as}/${file}`),
                    link: `/${as}/${removeExtension(file)}.html`,
                    items: [],
                    position: metas[file]?.position || 999,
                    description: metas[file]?.description,
                });

                return reduced;
            }

            // get sub-metas
            const {
                metas: subMetas,
                items: subItems,
            } = reduceTree(`${as}/${file}`, `${dirPath}${file}/`);

            // directory
            const newItem: ItemLink = {
                text: metas[file]?.title || getTitleFromFilename(`/${as}/${file}`),
                items: subItems,
                link: 'index.md' in subMetas ? `/${as}/${file}/` : '#',
                position: metas[file]?.position || 999,
                description: metas[file]?.description,
            };

            // push link when linked
            if (!metas[file]?.nolink) {
                const {meta: indexMetas} = getMetas(`${dirPath}${file}/`);
                if ("index.md" in indexMetas) {
                    // only when it has index.md
                    newItem.link = `/${as}/${file}/`;
                }
            }

            reduced.push(newItem);

            return reduced;
        }, []);

    // sort reduced by metas?
    const items = reduced
        .sort((a: ItemLink, b: ItemLink) => {
            let aPosition = a.position || 999;
            let bPosition = b.position || 999;

            // move directories to the top
            if (a.link?.endsWith('#') || a.link?.endsWith('/')) {
                aPosition -= 2000;
            }
            if (b.link?.endsWith('#') || b.link?.endsWith('/')) {
                bPosition -= 2000;
            }

            if (aPosition < bPosition) {
                return -1;
            } else if (aPosition > bPosition) {
                return 1;
            }

            return 0;
        })
        .map(({position, ...item}) => item);

    return {
        items,
        metas,
        tree,
    };
};

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
    title = content.split("\n").find((line) => line[0] === "#");
    if (title) {
        title = removeMd(title || "").trim();
        if (title) {
            return title;
        }
    }

    // 4 - transform filename
    return getTitleFromFilename(filename);
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
        nav.title = getTitle(<FrontmatterConfig>data, content, `${folder}${file}`);
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
    console.log(`Creating sidebar ${folder}`);

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

    const {meta: metas} = getMetas(folder);

    // handle root-index files differently
    let index = null;
    let inIndex = [];

    let items = fs
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

                if (file === "node_modules") {
                    return reduced;
                }

                // skip versioned folders
                const versionRegex = /^v\d+\.\d+$/;
                if (file.match(versionRegex)) {
                    return reduced;
                }

                let hasIndex = false;
                if (!fs.statSync(`${folder}${file}`).isDirectory()) {
                    // skip non .md files
                    if (!file.endsWith(".md")) {
                        return reduced;
                    }

                    if (file === "index.md") {
                        // special handling for root index
                        index = {
                            link: `/${as}/`,
                            text: getTitleFromFilename(as),
                            items: [],
                        };
                        /*reduced.push({
                                        link: `/${as}/`,
                                        text: getTitleFromFilename(as),
                                        items: [],
                                    });*/
                    } else {
                        // special handle root links
                        inIndex.push({
                            link: `/${as}/${removeExtension(file)}.html`,
                            text: metas[file].title || getTitleFromFilename(file),
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
                const dirPath = `${folder}${file}/`;
                const {items: links} = reduceTree(`${as}/${file}`, dirPath);

                // skip empty sections
                if (links.length || hasIndex) {
                    reduced.push({
                        link: hasIndex ? `/${as}/${file}/` : '#',
                        text: getTitleFromFilename(file),
                        // @ts-ignore
                        items: links,
                    });
                }

                return reduced;
            },
            []
        );

    if (!index && inIndex.length) {
        // manually create missing index
        index = {
            link: "#",
            text: getTitleFromFilename(as),
            items: [],
        };
    }

    if (!index) {
        return items;
    }

    if (inIndex.length) {
        // add discovered root-items
        index.items = inIndex;
    }

    // prepend index items to discovered items
    return [index, ...items];
}

export const buildSidebarNav = (
    root: string,
    links: { link?: string; text: string; items?: []; repo?: string }[],
    sublinks?: string[]
) => {
    // build custom links
    const sidebar = (sublinks || []).reduce((sidebar, link: string) => {
        sidebar[link] = transformLinkToSidebar(root, link);
        return sidebar;
    }, {});

    // append default links from 1st-level navigation
    return links.reduce(
        (data, item) => {
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
        },
        {sidebar, nav: []}
    );
};
