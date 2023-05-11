<template>
    <div v-if="Object.keys(versions).length" class="SwagSidebarVersionSwitcher">
        <!-- Version: -->
        <select
                class="SwagSidebarVersionSwitcher_select"
                v-model="selectedVersion">
            <option v-for="(title, value) in versions" :value="value">{{ title }}</option>
        </select>
    </div>
</template>

<style lang="scss">
.SwagSidebarVersionSwitcher {
  @apply mb-4 lg:mb-0;
  &_select {
    @apply bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5;
    @apply focus:ring-blue-500 focus:border-blue-500;
    @apply dark:bg-#272727 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white;
    @apply dark:focus:ring-blue-500 dark:focus:border-blue-500
  }
}
</style>

<script setup lang="ts">
import {ref, watch, computed} from "vue";
import {useConfig} from "../composables/config";
import {useRoute, useRouter} from "vitepress";
import {flattenSidebar} from "../support/sidebar";

const {config} = useConfig();
const route = useRoute();
const router = useRouter();

const sidebarConfig = config.value.sidebar;

const versionSwitcherConfig = config.value?.swag?.versionSwitcher ?? {};
const versionPaths = versionSwitcherConfig?.paths ?? [];
const versions = computed(() => versionPaths.find(paths => Object.keys(paths).find(key => route.path.startsWith(`/${key}`))) ?? {});

const versionMatch = computed(() => Object.keys(versions.value)
    .filter(key => route.path.startsWith(`/${key}`))
    .sort((a, b) => {
        if (a.length > b.length) {
            return -1;
        } else if (a.length < b.length) {
            return 1;
        }

        return 0;
    }));

const selectedVersion = ref(versionMatch.value[0] ?? null);

watch(
    () => route.path,
    (value) => selectedVersion.value = versionMatch.value[0] ?? null,
);

watch(
    selectedVersion,
    (newValue, oldValue) => {
        // skip navigation to other pages
        if (!newValue || !oldValue || oldValue === newValue) {
            return;
        }

        // find the closest value in the new sidebar
        let relativePath = '/' + route.data.relativePath
            .replace('/index.md', '/')
            .replace('.md', '.html')
            .substring(oldValue?.length + 1);

        // compare docs/v6.4 and docs with /docs/v6.4/foo and /docs/foo
        const newSidebar = flattenSidebar(sidebarConfig[`/${newValue}/`] ?? [])
            .filter(({link}) => link && link !== '#' && relativePath.startsWith(link.substring(newValue.length + 1)));

        // prioritize longer links
        const newLinks = newSidebar
            .sort((a, b) => {
                if (a.link.length > b.link.length) {
                    return -1;
                } else if (a.link.length < b.link.length) {
                    return 1;
                }

                return 0;
            });

        const link = newLinks[0]?.link ?? ('/' + newValue + '/');
        router.go(link);
    }
)
</script>