<template>
  <div class="SwagHeader c-outflow" v-if="title" ref="element">
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
  @apply pt-10 pb-4;
  margin-top: -2rem;
  background-color: var(--sw-c-gray-100);

  &::before {
    border-bottom: 1px solid var(--sw-c-gray-100);
    .dark & {
      border-bottom: 1px solid var(--sw-c-gray-dark-700);
    }
  }

  .container {
    margin: 0 auto;
  }

  &.c-outflow {
    z-index: 0;
  }

  &_row {
    @apply flex flex-col md:flex-row gap-2 items-start justify-between;
  }

  & + .container {
    position: relative;
    --vp-layout-top-height: 180px;
    & main.main {
      > div > div {
        @apply mt-10;
        > h1:first-child {
          @apply hidden;
        }
      }
    }

    /*& .aside-container {
      padding-top: 2.5rem;
      position: sticky;
      top: 0;
    }*/
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