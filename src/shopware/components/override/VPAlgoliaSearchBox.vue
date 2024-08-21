<script setup lang="ts">
import type { DefaultTheme } from 'vitepress/theme'
import docsearch from '@docsearch/js'
import { onMounted, watch, computed } from 'vue'
import { useRouter, useRoute, useData } from 'vitepress'
import { getEmbeddingPoint } from "vitepress-shopware-docs";

const props = defineProps<{
    algolia: DefaultTheme.AlgoliaSearchOptions
}>()

const router = useRouter()
const route = useRoute()
const { site, localeIndex, lang, theme } = useData()

type DocSearchProps = Parameters<typeof docsearch>[0]

onMounted(update)
watch(localeIndex, update)

const point = computed(() => getEmbeddingPoint(theme.value?.swag?.embeds ?? [], route.path));

function update() {
    const options = {
        ...props.algolia,
        ...props.algolia.locales?.[localeIndex.value]
    }
    const rawFacetFilters = options.searchParameters?.facetFilters ?? []
    const facetFilters = [
        ...(Array.isArray(rawFacetFilters)
                ? rawFacetFilters
                : [rawFacetFilters]
        ).filter((f) => !f.startsWith('lang:')),
        `lang:${lang.value}`
    ]
    initialize({
        ...options,
        searchParameters: {
            ...options.searchParameters,
            facetFilters
        }
    })
}

function initialize(userOptions: DefaultTheme.AlgoliaSearchOptions) {
    // @ts-ignore
    const options = Object.assign<{}, {}, DocSearchProps>({}, userOptions, {
        container: '#docsearch',

        getMissingResultsUrl({ query }: { query: string }) {
            return `https://github.com/shopware/docs/issues/new?title=Missing%20search%20result%20for%20${query}`
        },

        navigator: {
            navigate({ itemUrl }) {
                const { pathname: hitPathname } = new URL(
                    window.location.origin + itemUrl
                )

                // router doesn't handle same-page navigation so we use the native
                // browser location API for anchor navigation
                if (route.path === hitPathname) {
                    window.location.assign(window.location.origin + itemUrl)
                } else {
                    router.go(itemUrl)
                }
            }
        },

        transformItems(items) {
            return items.map((item) => {
                return Object.assign({}, item, {
                    url: getRelativePath(item.url)
                })
            })
        },

        // @ts-expect-error vue-tsc thinks this should return Vue JSX but it returns the required React one
        hitComponent({ hit, children }) {
            return {
                __v: null,
                type: 'a',
                ref: undefined,
                constructor: undefined,
                key: undefined,
                props: { href: hit.url, children }
            }
        },

        // https://www.algolia.com/doc/api-reference/search-api-parameters/
        searchParameters: {
            // requires adding "Attributes for faceting" under Algolia > Index > Configuration
            filters: `version:${point.value.version}`,
            hitsPerPage: 30,
            length: 30,
            offset: 0,
        }
    })

    docsearch(options)
}

function getRelativePath(absoluteUrl: string) {
    const { pathname, hash, origin } = new URL(absoluteUrl)
    const cleanPath = pathname.replace(
        /\.html$/,
        site.value.cleanUrls ? '' : '.html'
    );
    const finalOrigin = origin === window.location.origin ? '' : origin;

    return `${finalOrigin}${cleanPath}${hash}`
}
</script>

<template>
    <div id="docsearch" />
</template>
