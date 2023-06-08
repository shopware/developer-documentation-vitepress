<template>
  <div class="SwagHeader c-outflow" v-if="title">
    <h1 class="styled">{{ title }}</h1>
    <SwagBreadcrumbs/>
  </div>
</template>

<style lang="scss">
.SwagHeader {
  @apply pt-10 pb-4;
  margin-top: -2rem;
  background-color: var(--sw-c-gray-100);
  &.c-outflow {
    z-index: 0;
  }
  & + main,
  & + * + main {
    > div > div {
      @apply mt-10;
      > h1:first-child {
        @apply display-none;
      }
    }
  }
}
</style>

<script setup lang="ts">
import {computed} from "vue";
import {useRoute} from "vitepress";

import SwagBreadcrumbs from "./SwagBreadcrumbs.vue";
const route = useRoute();

const title = computed(() => route.$frontmatter?.title || route.data.title)
</script>