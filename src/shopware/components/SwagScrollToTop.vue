<template>
  <a href="#" class="SwagScrollToTop" @click.prevent="scrollToTop" :class="{'hidden': top}">To the top</a>
</template>

<style lang="scss">
.SwagScrollToTop {
  @apply position-fixed;
  bottom: 1rem;
  right: 1rem;
  mix-blend-mode: difference;
}
</style>

<script setup lang="ts">
import {ref} from "vue";

const top = ref(true);
addEventListener('scroll', (e: Event) => top.value = window.scrollY === 0);

const scrollToTop = () => window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
</script>