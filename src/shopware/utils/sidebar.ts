import {Route} from "vitepress";
import {AdditionalMenuItemWithContext, SidebarConfig} from "../../vitepress/config";
import {SetupContext} from "@vue/runtime-core";
import {getSidebarsWithMainKey} from "../../vitepress/support/sidebar";

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
        const partialLink = `/${parts.slice(0, i).join('/')}`.split('#')[0];
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

export const trimDatetime = value => {
    if (value?.match(/^\d\d\d\d-\d\d-\d\d - /)) {
        return value.substring('XXXX-XX-XX - '.length);
    }

    return value;
}

export const getSidebarItem = (sidebar: SidebarConfig, route: Route, attrs: SetupContext['attrs'], attr: string) => {
    const item = getExactSidebarItem(sidebar, route, attrs, attr);

    if (item || !attrs.page || attrs.page.endsWith('/')) {
        return item;
    }

    // fallback to index
    return getExactSidebarItem(sidebar, route, {
        ...attrs,
        page: `${attrs.page.replace('.html', '')}/`
    }, attr);
}

export const getExactSidebarItem = (sidebar: SidebarConfig, route: Route, attrs: SetupContext['attrs'], attr: string) => {
    // hardcoded title or sub/description
    if (attrs[attr] || typeof attrs[attr] === 'string') {
        return trimDatetime(attrs[attr]);
    }

    // @ts-ignore
    const page: string = attrs.page;
    // cannot auto-resolve attrs for external or empty urls
    if (!page || page.startsWith('https://') || page.startsWith('http://') || page.startsWith('//')) {
        return trimDatetime(attrs[attr]);
    }

    // get correct sidebar
    let absolute = transformRelativeRoute(route, page);
    const [sidebars, key] = getSidebarsWithMainKey(sidebar, absolute);

    if (!key) {
        return null;
    }

    // force .html extension
    if (absolute.endsWith('.md')) {
        absolute = absolute.replace('.md', '.html');
    } else if (!absolute.endsWith('/') && !absolute.endsWith('.html')) {
        absolute = `${absolute}.html`;
    }

    // find link in the sidebar
    let finalLink = traverse(
        sidebars[key],
        absolute
    );

    if (!finalLink) {
        return null;
    }

    const mapper = {
        title: 'text',
    };

    return trimDatetime(finalLink[mapper[attr]] || null);
}