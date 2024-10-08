import fs from "fs-extra";
import matter from "gray-matter";
import removeMd from "remove-markdown";
import {AdditionalMenuItemWithContext} from "../../vitepress/config";
import {MenuItemWithLink} from "vitepress-shopware-docs";
import semver from 'semver'

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
    collapsed?: boolean|null;
    meta?: object;
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

const endWithSlash = text => text.endsWith('/') ? text : `${text}/`;
const startWithSlash = text => text.startsWith('/') ? text : `/${text}`;
const surroundWithSlash = text => endWithSlash(startWithSlash(text));
const stripSlashes = text => {
    if (text.endsWith('/')) {
        text = text.substring(0, text.length - 1);
    }
    if (text.startsWith('/')) {
        text = text.substring(1);
    }
    return text;
};

const getCollapsed = (depth, items) => depth < 1 || !items.length ? null : true;
// const getCollapsed = (depth, items) => null;

const getAllFiles = function (dirPath: string): ObjectOfFiles {
    const objectOfFiles: ObjectOfFiles = {};

    let files;
    try {
        files = fs.readdirSync(dirPath);
    } catch (e) {
        console.error(e);
        return objectOfFiles;
    }

    files.forEach(function (file: string) {
        // skip files and dirs starting with . or _
        if ([".", "_"].includes(file[0])) {
            return;
        }

        if (fs.existsSync(`${dirPath}${file}`) && fs.statSync(`${dirPath}${file}`).isDirectory()) {
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
    if (name === '') {
        return 'Index';
    }

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

const itemsSorter = (a: ItemLink, b: ItemLink) => {
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
};

const nullifyLink = item => {
    if (item.link === '#') {
        delete item.link;
    }

    return item;
};

const isFileExcluded = (file: string) => {
    const versionRegex = /^v\d+\.\d+(rc)?$/;

    return file === 'node_modules'
        || ['.', '_'].includes(file.substring(0, 1))
        || file.match(versionRegex);
};

const isFileGloballyExcluded = (file: string, dir: string, ignore = []) => {
    return ignore.find(match => {
        const reg = new RegExp(match.replace('*', '(.*)'));

        return match.endsWith('/')
            ? reg.test(dir)
            : reg.test(`${dir}${file}`);
    })
};

const reduceTree = (as: string, dirPath: string, depth = 1, ignore: string[] = []) => {
    // use metas to sort items correctly
    const {
        meta: metas,
        tree
    } = getMetas(dirPath);

    const reduced = ignore.includes(`/${as}/`)
        ? [] // hide ignored
        : Object.keys(tree)
        .reduce((reduced: ItemLink[], file, i) => {
            // hide common files
            if (isFileExcluded(file)) {
                return reduced;
            }

            if (isFileGloballyExcluded(file, endWithSlash(as), ignore)) {
                console.log('EXCLUDED', as, file);
                return reduced;
            }

            // hide entry
            if (metas[file]?.hidden) {
                return reduced;
            }

            // add custom links (menu items)
            if (metas[file]?.items.length) {
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
                    link: `${surroundWithSlash(as)}${removeExtension(file)}.html`,
                    items: [],
                    position: metas[file]?.position || 999,
                    description: metas[file]?.description,
                    collapsed: getCollapsed(depth, []),
                    meta: metas[file]?.meta || {}
                });

                return reduced;
            }

            // get sub-metas
            const {
                metas: subMetas,
                items: subItems,
            } = reduceTree(`${endWithSlash(as)}${file}`, `${dirPath}${file}/`, depth + 1, ignore);

            // directory
            const newItem: ItemLink = nullifyLink({
                text: metas[file]?.title || getTitleFromFilename(`/${as}/${file}`),
                items: subItems,
                link: 'index.md' in subMetas ? `${surroundWithSlash(as)}${file}/` : '#',
                position: metas[file]?.position || 999,
                description: metas[file]?.description,
                collapsed: getCollapsed(depth, subItems),
                meta: metas[file]?.meta || {}
            });

            // push link when linked
            if (!metas[file]?.nolink) {
                const {meta: indexMetas} = getMetas(`${dirPath}${file}/`);
                if ("index.md" in indexMetas) {
                    // only when it has index.md
                    newItem.link = `${surroundWithSlash(as)}${file}/`;
                }
            }

            reduced.push(newItem);

            return reduced;
        }, []);

    // sort reduced by metas?
    const items = reduced
        .sort(itemsSorter)
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

    // 2 - title from title frontmatter (ADR)
    title = data?.title;
    if (title) {
        return title;
    }

    // 3 - title from og:title
    title = (data?.head || []).find(({name}) => name === "og:title")?.content;
    if (title) {
        return title;
    }

    // 4 - first heading from the content
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

function getPosition(data: FrontmatterConfig) {
    // 1 - nav.position
    let position = data?.nav?.position;
    if (position) {
        return position;
    }

    // 2 - transform from date
    let date = data?.date;
    if (date) {
        return parseInt(`${date}`.replace(/-/g, ''));
    }

    return null;
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

    // read position
    if (!nav.position) {
        let position = getPosition(<FrontmatterConfig>data);
        if (position) {
            nav.position = position;
        }
    }

    // add custom items
    nav.items = data.items || [];

    // add custom meta
    nav.meta = data.meta || {};

    return nav;
}

export function transformLinkToSidebar(root: string, link: string, ignore: string[] = []) {
    // usually, this starts with alpha and ends with alpha character
    // except for when the link is "/"
    const as = link === '/'
        ? '' :
        link.substring(1, link.length - 1);

    const folder = `${root}${as.length ? endWithSlash(as) : as}`;
    console.log(`\nCreating sidebar ${folder}`);

    // allow missing mount points in dev env
    if (process.env.SHOPWARE_DEV) {
        try {
            if (!fs.statSync(folder).isDirectory()) {
                console.error(`WARNING: Should be a directory ${folder}`);
                return [];
            }
        } catch (e) {
            console.error(`WARNING: Missing directory ${folder}\n`);
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
                if (isFileExcluded(file)) {
                    return reduced;
                }

                if (isFileGloballyExcluded(file, folder, ignore)) {
                    console.log('EXCLUDED', folder, file);
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
                        const items = metas['index.md']?.items || [];
                        index = {
                            link: surroundWithSlash(as),
                            text: getTitleFromFilename(as),
                            items: items,
                            collapsed: getCollapsed(0, items),
                            meta: metas['index.md']?.meta || {},
                            position: metas['index.md']?.position,
                        };
                    } else {
                        // special handle root links
                        inIndex.push({
                            link: `${surroundWithSlash(as)}${removeExtension(file)}.html`,
                            text: metas[file].title || getTitleFromFilename(file),
                            items: [],
                            collapsed: getCollapsed(0, []),
                            meta: metas[file]?.meta || {},
                            position: metas[file]?.position,
                        });
                    }

                    return reduced;
                } else if (fs.existsSync(`${folder}${file}/index.md`)) {
                    hasIndex = true;
                }

                // collect links
                const dirPath = `${folder}${file}/`;
                const {items: links} = reduceTree(`${endWithSlash(as)}${file}`, dirPath, 1, ignore);

                // skip empty sections
                if (links.length || hasIndex) {
                    reduced.push(nullifyLink({
                        link: hasIndex ? `${surroundWithSlash(as)}${file}/` : '#',
                        text: getTitleFromFilename(file),
                        // @ts-ignore
                        items: links,
                        collapsed: getCollapsed(0, links),
                        meta: metas[file]?.meta || {},
                        position: metas[file]?.position,
                    }));
                }

                return reduced;
            },
            []
        );

    if (!index && inIndex.length) {
        // manually create missing index
        index = nullifyLink({
            link: "#",
            text: getTitleFromFilename(as),
            items: [],
            collapsed: getCollapsed(1, inIndex),
            meta: {},
            position: 0,
        });
    }

    if (items) {
        if (index?.meta?.orientation === 'descending') {
            const makeDescending = items => items
                .sort((a, b) => {
                    const first = a.text.substring('v6.'.length)
                    const second = b.text.substring('v6.'.length)
                    return semver.valid(first) && semver.valid(second) ? (semver.lt(first, second) ? 1 : -1) : -a.text.localeCompare(b.text)
                })
                .map(item => {
                    item.items = makeDescending(item.items);
                    return item;
                });
            items = makeDescending(items);
        } else {
            items = items.sort(itemsSorter);
        }
    }

    if (!index) {
        return items;
    }

    // when index has hardcoded links, replace the "generate: true" item with auto-generated items
    if (index.items.length) {
        return index.items.reduce((reduced, item) => {
            if (item.generate) {
                reduced.push(...items);
            } else {
                reduced.push(item);
            }

            return reduced;
        }, []);
    }

    //let hardcoded = index.items;
    if (inIndex.length) {
        // add discovered root-items
        index.items = inIndex;
    }

    // prepend index items to discovered items
    return [
        //...hardcoded,
        index,
        ...items,
    ];
}

export const buildSidebarNav = (
    root: string,
    links: { link?: string; text: string; items?: []; repo?: string }[],
    sublinks?: string[],
    ignore?: string[]
) => {
    // build custom links
    const sidebar = (sublinks || []).reduce((sidebar, link: string) => {
        sidebar[link] = transformLinkToSidebar(root, link, ignore);
        return sidebar;
    }, {});

    // append default links from 1st-level navigation
    return links.reduce(
        (data, item) => {
            const {link, text, items, repo} = item;

            // skip external links
            const isExternal = link?.startsWith('https://') || link?.startsWith('http://');

            // skip non-dir links
            const isDir = link?.endsWith('/');

            // build sidebar
            if (!isExternal && link && isDir) {
                data.sidebar[link] = transformLinkToSidebar(root, link, ignore);
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
