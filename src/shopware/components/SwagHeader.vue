<template>
  <div class="SwagHeader c-outflow" v-if="title" ref="element">
    <div class="container">
      <h1 class="styled">{{ title }}</h1>
      <SwagBreadcrumbs/>
    </div>
  </div>
</template>

<style lang="scss">
.SwagHeader {
  @apply pt-10 pb-4;
  margin-top: -2rem;
  background-color: var(--sw-c-gray-100);

  .container {
    margin: 0 auto;
  }

  &.c-outflow {
    z-index: 0;
  }

  & + .container {
    position: relative;
    & main.main {
      > div > div {
        @apply mt-10;
        > h1:first-child {
          @apply display-none;
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
import {useRoute} from "vitepress";

import SwagBreadcrumbs from "./SwagBreadcrumbs.vue";

const route = useRoute();

const title = computed(() => route.$frontmatter?.title || route.data.title)
const element = ref(null);

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