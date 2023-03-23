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
    '/my-page': {
      text: 'My page',
      link: '/my-page',
      items: []
    }
  }
})))
</script>