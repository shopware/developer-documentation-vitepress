<template>
  <div v-if="Object.keys(versions).length" class="SwagSidebarVersionSwitcher">
    Version:
    <select
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        v-model="selectedVersion">
      <option v-for="(title, value) in versions" :value="value">{{ title }}</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import {useConfig} from "../../vitepress/composables/config";
import {useRoute} from "vitepress";

const {config} = useConfig();
const route = useRoute();

const versionSwitcherConfig = config.value?.swag?.versionSwitcher ?? {};
const versionPaths = versionSwitcherConfig?.paths ?? [];
const versions = versionPaths.find(paths => Object.keys(paths).find(key => route.path.startsWith(`/${key}`))) ?? {};

const versionMatch = Object.keys(versions ?? {})
    .filter(key => route.path.startsWith(`/${key}`))
    .sort((a, b) => {
      if (a.length > b.length) {
        return -1;
      } else if (a.length < b.length) {
        return 1;
      }

      return 0;
    })

const selectedVersion = ref(versionMatch[0] ?? null);

watch(
    selectedVersion,
    value => {
      console.log('version changed', value);
      // navigate to correct path, try to find:
      // - the same article
      // - the nearest section
      // - root
    }
)
</script>