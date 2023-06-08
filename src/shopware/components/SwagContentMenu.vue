<template>
  <div class="SwagContentMenu grid md:grid-cols-2 gap-6 mb-8">
      <PageRef v-for="item in items" v-bind="item" :key="item.page" />
  </div>
</template>

<script setup lang="ts">
import PageRef from "./PageRef.vue";

import {useRoute} from "vitepress";
import {useConfig} from "../composables/config";
import {useAttrs, computed} from "vue";
import {getExactSidebarItem} from "../utils/sidebar";

const {config} = useConfig();
const attrs = useAttrs();
const route = useRoute();

const items = computed(() => {
    const items = getExactSidebarItem(config.value.sidebar, route, {page: route.path}, 'items');
    if (!items?.length) {
        return [];
    }

    return items.map((item) => ({
        title: item.text,
        page: item.link,
    }));
});
</script>