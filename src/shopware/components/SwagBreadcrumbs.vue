<template>
    <nav class="SwagBreadcrumbs hidden lg:flex mb-6" aria-label="Breadcrumb"
         v-if="breadcrumbs.length > 1">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <!--<li class="inline-flex items-center">
                <a href="#" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                    <svg aria-hidden="true" class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                    Home
                </a>
            </li>-->
            <li v-for="(breadcrumb, i) in breadcrumbs">
                <div class="flex items-center">
                    <svg v-if="i > 0" aria-hidden="true" class="w-6 h-6 text-gray-400" fill="currentColor"
                         viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clip-rule="evenodd"></path>
                    </svg>
                    <span v-if="!breadcrumb.link"
                          class="SwagBreadcrumbs__span">{{
                        breadcrumb.text
                        }}</span>
                    <a v-else
                       :href="breadcrumb.link"
                       :class="[breadcrumb.color ? 'SwagBreadcrumbs__button' : 'SwagBreadcrumbs__link', breadcrumb.color]">{{
                        breadcrumb.text
                        }}</a>
                </div>
            </li>
            <!--<li aria-current="page">
                <div class="flex items-center">
                    <svg aria-hidden="true" class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                    <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400" :class="breadcrumb.color">{{ breadcrumb.title }}</span>
                </div>
            </li>-->
        </ol>
    </nav>
</template>

<style lang="scss">
.SwagBreadcrumbs {
  li:not(:first-child) .SwagBreadcrumbs__link {
    @apply ml-1 md:ml-2;
  }

  &__span,
  &__link {
    @apply text-sm font-medium text-gray-700;
    @apply dark:text-gray-400 dark:hover:text-white;
  }

  &__link {
    @apply hover:text-blue-600;
  }

  &__button {
    @apply inline-flex items-center px-3 py-1.5 ml-2 text-sm font-normal text-center text-white rounded-lg;
    @apply bg-gradient-to-r;
    @apply focus:ring-4 focus:outline-none focus:ring-gray-100;
    @apply dark:focus:ring-gray-700;
  }
}

// workaround - make those colors always available
.from-blue-500 {
  @apply from-blue-500;
}

.from-indigo-500 {
  @apply from-indigo-500;
}

.to-indigo-700 {
  @apply to-indigo-700;
}

.to-blue-700 {
  @apply to-blue-700;
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
    return items.reduce((reduced, item) => {
        // break on exact match
        if (item.link === url) {
            reduced.push({
                text: item.text,
                link: item.link,
            });
            return reduced;
        }
        const found = getCurrentTree(item.items || [], url);
        if (!found.length) {
            return reduced;
        }

        // push current item along with children items
        reduced.push(
            {
                text: item.text,
                link: item.link,
            },
            ...found
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
        sidebarConfig['/'] ?? sidebars[key],
        realUrl.value
    );

    // try with root sidebar so we get the full tree
    const flattened = flattenSidebar(tree);

    // find the deepest item that matches
    // then return all parents
    // const filtered = flattened.filter(({link}) => realUrl.value.startsWith(link));

    return flattened
        .slice(1)
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