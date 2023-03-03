import {Route} from "vitepress";
import {AdditionalMenuItemWithContext, SidebarConfig} from "../../vitepress/config";
import {SetupContext} from "@vue/runtime-core";

export const transformRelativeRoute = (route: Route, url: string) => {
    if (!url || url.startsWith('https://') || url.startsWith('http://') || url.startsWith('/')) {
        return url;
    }

    let parentPath = route.path;
    if (!parentPath.endsWith('/')) {
        // remove last path, we are not in directory at the moment
        parentPath = parentPath.split('/').reverse().slice(1).reverse().join('/');
    } else {
        // remove last /
        parentPath = parentPath.substring(0, parentPath.length - 1);
    }

    if (url.startsWith('./')) {
        // remove . from url, keep the same level
        return `${parentPath}${url.substring(1)}`;
    }

    const splitPath = parentPath.split('/');
    const countTwoDots = url.split('/').filter(part => part === '..').length;

    return `${splitPath.slice(0, splitPath.length - countTwoDots).join('/')}/${url.substring('../'.length * countTwoDots)}`;
}

const flatten = (items: AdditionalMenuItemWithContext[], flattened = []) => items.reduce((flattened, item) => flatten(item.items || [], [item, ...flattened]), flattened)

const traverse = (items: AdditionalMenuItemWithContext[], url: string) => {
    // flatten so we are level-independent
    const flattenItems = flatten(items);

    // find links that matches parts the most
    let matchedItems: AdditionalMenuItemWithContext[] = [];
    const parts = url.substring(1).split('/');
    for (let i = parts.length; i >= 0; i--) {
        const partialLink = `/${parts.slice(0, i).join('/')}`;
        matchedItems = flattenItems.filter(({link}) => link === partialLink || link === `${partialLink}.html`);
        if (matchedItems.length) {
            break;
        }
    }

    // sort by the most matched
    matchedItems = matchedItems.sort((a, b) => {
        if (a.link.length > b.link.length) {
            return 1;
        } else if (a.link.length < b.link.length) {
            return -1;
        }

        return 0;
    })

    return matchedItems[0] || null;
}

export const getSidebarItem = (sidebar: SidebarConfig, route: Route, attrs: SetupContext['attrs'], attr: string) => {
    // hardcoded title or sub/description
    if (attrs[attr] || typeof attrs[attr] === 'string') {
        return attrs[attr];
    }

    // @ts-ignore
    const page: string = attrs.page;
    // cannot auto-resolve attrs for external or empty urls
    if (!page || page.startsWith('https://') || page.startsWith('http://') || page.startsWith('//')) {
        return attrs[attr];
    }

    const absolute = transformRelativeRoute(route, page);
    const [firstLevel] = absolute.substring(1).split('/');

    // @ts-ignore
    const firstLevelItems = sidebar[`/${firstLevel}/`];

    let finalLink = traverse(
        firstLevelItems || [],
        absolute
    );

    const mapper = {
        title: 'text',
    };

    if (!finalLink) {
        return null;
    }

    return `${finalLink[mapper[attr]] || null/* || attr*/}`;
}