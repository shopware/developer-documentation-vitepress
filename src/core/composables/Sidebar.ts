import fs from "fs-extra";
import path from "path";
import matter from "gray-matter";
import removeMd from "remove-markdown";
import { SidebarConfig, SidebarGroup } from "../../vitepress/config";

const getAllFiles = function (dirPath: string) {
  const objectOfFiles = {};
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

const niceName = (name: string) =>
  name
    // replace - and _
    .replace(/([\-_])/g, " ")
    // insert a space before all caps
    .replace(/([A-Z])/g, " $1")
    .trim()
    // uppercase the first character
    .replace(/^./, (str) => str.toUpperCase());

const getMetas = (folder, tree) => {
  return (
    Object.keys(tree)
      //.filter(file => file !== 'index.md')
      .reduce((reduced, file) => {
        if (typeof tree[file] === "string") {
          // file
          reduced[file] = getMeta(folder, file);
        } else if (tree[file]["index.md"]) {
          // dir with index
          reduced[file] = getMeta(`${folder}${file}/`, "index.md");
        }

        return reduced;
      }, {})
  );
};

const reduceTree = (as: string, dirPath: string, tree: object) => {
  // use metas to sort items correctly
  const metas = getMetas(dirPath, tree);

  const reduced = Object.keys(tree)
    // .filter(file => file !== 'index.md')
    .reduce((reduced, file, i) => {
      // hide entry
      if (metas[file]?.hidden) {
        return reduced;
      }

      // add custom links
      if (metas[file]?.links) {
        metas[file].links.forEach((link) => {
          if (!link.items) {
            link.items = [];
          }
          reduced.push(link);
        });

        return reduced;
      }

      // should be added by directory?
      if (file === "index.md") {
        return reduced;
      }

      if (typeof tree[file] === "string") {
        // file
        const filename = file.substring(0, file.length - ".md".length);

        reduced.push({
          text: metas[file]?.title || niceName(filename),
          link: `/${as}/${filename}.html`,
          items: [],
          position: metas[file]?.position || 999,
        });
      } else {
        // directory
        const newItem = {
          text: metas[file]?.title || niceName(file),
          items: reduceTree(`${as}/${file}`, `${dirPath}${file}/`, tree[file]),
          position: metas[file]?.position || 999,
        };

        // push link when linked
        if (!metas[file]?.nolink) {
          newItem.link = `/${as}/${file}/`;
        }

        reduced.push(newItem);
      }

      return reduced;
    }, []);

  // sort reduced by metas?
  return reduced
    .sort((a, b) => {
      if (a.position < b.position) {
        return -1;
      } else if (a.position > b.position) {
        return 1;
      }

      return 0;
    })
    .map(({ position, ...item }) => item);
};

export const getAllLinks = (as: string, dirPath: string) =>
  reduceTree(as, dirPath, getAllFiles(dirPath));

function getMeta(folder, file) {
  const content = matter.read(`${folder}${file}`, {
    excerpt: true,
    excerpt_separator: "<!-- more -->",
  });

  const { data, excerpt, path } = content;
  const contents = removeMd(excerpt)
    .trim()
    .split(/\r\n|\n|\r/);

  const nav = data.nav || {};

  if (!content?.content?.length) {
    nav.nolink = true;
  }

  return nav;
}

export function readSidebar(as: string, folder = "./src/", root = false) {
  const meta = {};
  const sidebar = fs
    .readdirSync(folder)
    .reduce((reduced: SidebarGroup[], file) => {
      if (!fs.statSync(`${folder}${file}`).isDirectory()) {
        meta[`${folder}${file}`] = getMeta(folder, file);

        return reduced;
      } else if (fs.existsSync(`${folder}${file}/index.md`)) {
        meta[`${folder}${file}/index.md`] = getMeta(
          `${folder}${file}`,
          `/index.md`
        );
      }

      if (file[0] === ".") {
        return reduced;
      }

      // collect links
      const links = getAllLinks(`${as}/${file}`, `${folder}${file}/`);

      // skip empty sections
      if (!Object.keys(links).length) {
        return reduced;
      }

      reduced.push({
        link: `/${as}/${file}/`,
        text: niceName(file), //`${file}`,// file.toUpperCase(),
        items: links,
      });

      return reduced;
    }, []);

  return sidebar;
}

export function makeSidebarConfig(
  root: string,
  config: SidebarConfig
): SidebarConfig {
  fs.readdirSync(root).forEach((dir) => {
    // skip hidden files/dirs
    if (dir[0] === ".") {
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
