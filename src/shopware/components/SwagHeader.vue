<template>
  <div class="SwagHeader" v-if="title" ref="element">
    <div class="container">
      <div class="SwagHeader_row">
        <h1 class="styled">{{ title }}</h1>
        <div class="flex gap-2 mt-2" v-if="$frontmatter?.meta?.label || $frontmatter?.meta?.date">
          <SwagLabel v-if="$frontmatter?.meta?.label" :type="$frontmatter?.meta?.label" />
          <SwagLabel v-if="transformedDate($frontmatter?.meta?.date)">{{ transformedDate($frontmatter?.meta?.date) }}</SwagLabel>
        </div>
      </div>
      <SwagBreadcrumbs/>
    </div>
  </div>
</template>

<style lang="scss">
.SwagHeader {
  @apply pt-10 pb-4 position-relative;
  margin-top: -2rem;
  background-color: var(--sw-c-gray-100);
  z-index: 1;
  overflow: visible;
  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    left: -32px;
    right: -32px;
    top: 0;
    bottom: 0;
    background-color: var(--sw-c-gray-50);
    border-bottom: 1px solid var(--sw-c-gray-100);
    .dark & {
      background-color: var(--sw-c-gray-dark-700);
      border-bottom: 1px solid var(--sw-c-gray-dark-700);
    }
  }

  .container {
    margin: 0 auto;
  }

  &_row {
    @apply flex flex-col md:flex-row gap-2 items-start justify-between;
  }
}
</style>

<script setup lang="ts">
import {computed, onMounted, ref, watch} from "vue";
import {useRoute, useData} from "vitepress";

import SwagBreadcrumbs from "./SwagBreadcrumbs.vue";

const route = useRoute();

const title = computed(() => route.$frontmatter?.title || route.data.title)
const element = ref(null);

const transformedDate = computed(() => (date) => {
  if (!date) {
    return null;
  }
  date = new Date(date);
  return date.getDate()  + "." + (date.getMonth()+1) + "." + date.getFullYear();
});

/*const setLayoutTopHeight = () => {
  const parentElement = element.value?.parentElement;
  if (!parentElement) {
    return;
  }
  parentElement.style.setProperty('--vp-layout-top-height',  `${element.value.offsetHeight}px`);
}

onMounted(() => {
  setLayoutTopHeight();
})
watch(route, () => {
  setLayoutTopHeight();
})*/
</script>