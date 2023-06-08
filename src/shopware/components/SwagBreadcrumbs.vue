<template>
    <nav class="SwagBreadcrumbs hidden lg:flex" aria-label="Breadcrumb"
         v-if="breadcrumbs.length > 1">
        <ol class="SwagBreadcrumbs_ol">
            <li v-for="(breadcrumb, i) in breadcrumbs" class="SwagBreadcrumbs_li">
                <svg v-if="i > 0" aria-hidden="true" class="w-6 h-6 text-gray-400" fill="currentColor"
                     viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"></path>
                </svg>
                <span v-if="!breadcrumb.link"
                      class="SwagBreadcrumbs_span">{{
                    breadcrumb.text
                    }}</span>
                <a v-else
                   :href="breadcrumb.link"
                   :class="[breadcrumb.color ? 'SwagBreadcrumbs_button' : 'SwagBreadcrumbs_link', breadcrumb.color]">{{
                    breadcrumb.text
                    }}</a>
            </li>
        </ol>
    </nav>
</template>

<style lang="scss">
.SwagBreadcrumbs {
  li:not(:first-child) .SwagBreadcrumbs_link {
    @apply ml-1 md:ml-2;
  }

  &_ol {
    @apply inline-flex items-center space-x-1 md:space-x-3;
    max-width: 100%;
  }

  &_li {
    @apply flex items-center;
    &:nth-child(n+5) {
      min-width: 0;
    }
  }

  &_span,
  &_link {
    @apply text-sm font-medium text-gray-700;
    @apply dark:text-gray-400 hover:dark:text-white;
  }

  &_link {
    @apply hover:text-blue-600;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &_button {
    @apply inline-flex items-center px-3 py-1.5 ml-2 text-sm font-normal text-center text-white rounded-lg;
    @apply bg-gradient-to-r;
    @apply focus:ring-4 focus:outline-none focus:ring-gray-100;
    @apply focus:dark:ring-gray-700;
  }
}

// workaround - make those colors always available
.from-blue-500 {
  @apply from-blue-500;
}

.to-blue-700 {
  @apply to-blue-700;
}

.from-purple-500 {
  @apply from-purple-500;
}

.to-purple-700 {
  @apply to-purple-700;
}
</style>

<script setup lang="ts">
import {computed} from "vue";
import {useData, useRoute} from "vitepress";
import {useConfig} from "../composables/config";
import {getSidebarsWithMainKey, flattenSidebar} from "../support/sidebar";

const {theme, page} = useData()
const relativePath = computed(() => page.value.relativePath);
const colorCoding = theme.value.swag?.colorCoding || [];

const {config} = useConfig();
const sidebarConfig = config.value.sidebar;
const sidebarsConfig = computed(() => getSidebarsWithMainKey(sidebarConfig, relativePath.value));

const realUrl = computed(() => '/' + relativePath.value
    .replace('/index.md', '/')
    .replace('.md', '.html'));

const getCurrentTree = (items, url) => {
    if (items.length === 0) {
        return [];
    }

    let found = false;
    return items.reduce((reduced, item) => {
        if (found) {
            return reduced;
        }

        // break on exact match
        if (item.link === url) {
            found = true;
            reduced.push({
                text: item.text,
                link: item.link,
            });
            return reduced;
        }

        // break when no matches
        const sub = getCurrentTree(item.items || [], url);
        if (!sub.length) {
            return reduced;
        }

        // push current item along with children items
        found = true;
        reduced.push(
            {
                text: item.text,
                link: item.link,
            },
            ...sub
        );
        return reduced;
    }, []);
}

const breadcrumbs = computed(() => {
    const [sidebars, key] = sidebarsConfig.value;

    if (!key) {
        return [];
    }

    const tree = getCurrentTree(
        /*sidebarConfig['/'] ?? */sidebars[key],
        realUrl.value
    );

    // try with root sidebar so we get the full tree
    const flattened = flattenSidebar(tree);

    // find the deepest item that matches
    // then return all parents
    // const filtered = flattened.filter(({link}) => realUrl.value.startsWith(link));

    return flattened
        //.slice(1)
        .map(({link, text}) => ({link, text}))
        .map(breadcrumb => {
            const colorCode = colorCoding.find(colorCode => colorCode.link === breadcrumb.link);
            if (colorCode) {
                breadcrumb.color = colorCode.color;
            }
            return breadcrumb;
        });
});

// get current page + parent pages from the sidebar
/*const breadcrumbs = computed(() => [
    {
        title: 'Guides',
        link: '/docs/guides/',
    },
    {
        title: 'Plugins',
        link: '/docs/guides/plugins/',
    },
    {
        title: 'Apps',
        link: '/docs/guides/plugins/apps/',
    },
]));*/
</script>