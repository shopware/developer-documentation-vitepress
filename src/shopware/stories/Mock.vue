<template>
  <div>
    <slot/>
  </div>
</template>

<script setup lang="ts">
import {computed, provide} from "vue";
import {configSymbol} from "../../vitepress/composables/config";

provide(configSymbol, computed(() => ({
  nav: [],
  sidebar: {
    '/my/': {
      text: 'My',
      link: '/my/',
      items: []
    }
  },
  swag: {
    similarArticlesHost: 'https://knowledge-index.shopware.com',
    similarArticlesFilter: {}
  }
})))
</script>