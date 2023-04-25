<template>
  <a v-if="parent"
     class="flex mb-4"
     :href="parent.link">Go back to {{ parent.text }}</a>
</template>

<script setup lang="ts">
import {useConfig} from "../../shopware/composables/config";
import {useRoute} from "vitepress";
import {getSidebarsWithMainKey, flattenSidebar} from "../../shopware/support/sidebar";
import {computed, watch} from "vue";

const {config} = useConfig();
const route = useRoute();

const sidebarConfig = config.value.sidebar;

const relativePath = computed(() => route.data.relativePath)
const sidebarsConfig = computed(() => getSidebarsWithMainKey(sidebarConfig, relativePath.value));

const parent = computed(() => {
  const [sidebars, key, nextKey] = sidebarsConfig.value;
  if (!nextKey) {
    return null;
  }

  const realUrl = '/' + relativePath.value
      .replace('/index.md', '/')
      .replace('.md', '.html');

  const flattened = flattenSidebar(sidebars[nextKey]);
  const filtered = flattened.filter(item => realUrl !== item.link && realUrl.startsWith(item.link));

  return filtered[0] ?? null;
})
</script>