import { SidebarConfig, SidebarGroup } from '../config'
import { ensureStartingSlash } from './utils'

/**
 * Get the `SidebarConfig` from sidebar option. This method will ensure to get
 * correct sidebar config from `MultiSideBarConfig` with various path
 * combinations such as matching `guide/` and `/guide/`. If no matching config
 * was found, it will return empty array.
 */
export function getSidebar(
  sidebar: SidebarConfig | undefined,
  path: string
): SidebarGroup[] {
  if (Array.isArray(sidebar)) {
    return sidebar
  }

  const [sidebars, key] = getSidebarsWithMainKey(sidebar, path);

  if (!sidebars) {
    return [];
  }

  return sidebars[key];
}

export function getSidebarsWithMainKey(
    sidebar: SidebarConfig | undefined,
    path: string
) {
  path = ensureStartingSlash(path)

  const sidebars = {};
  for (const dir in sidebar) {
    // make sure the multi sidebar key starts with slash too
    if (path.startsWith(ensureStartingSlash(dir))) {
      sidebars[dir] = sidebar[dir];
    }
  }

  if (!Object.keys(sidebars).length) {
    return [null, null, null]
  }

  const keys = Object.keys(sidebars).sort(function(a, b){
    return b.length - a.length;
  });
  const maxKey = keys[0];
  const nextKey = keys[1] ?? null;

  return [sidebars, maxKey, nextKey];
}

export function touch(object, callback) {
  callback(object);
  return object;
}

export function flattenSidebar(items) {
  return items.reduce((reduced, item) => touch(reduced, reduced => reduced.push(item, ...flattenSidebar(item.items || []))), []);
}
