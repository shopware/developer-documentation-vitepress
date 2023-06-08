<template>
  <a href="#"
     class="SwagScrollToTop btn --secondary"
     @click.prevent="scrollToTop"
     :class="{'--visible': !top}">
    <SwagIcon class="SwagScrollToTop_icon" icon="double-chevron-up-s" />
  </a>
</template>

<style lang="scss">
.SwagScrollToTop {
  @apply position-fixed display-none transition transition-all;
  bottom: 1rem;
  right: 1rem;
  opacity: 0;
  visibility: hidden;
  @media screen and (min-width: 960px) {
    @apply block;
    &.--visible {
      visibility: visible;
      opacity: 0.666;
      z-index: 10;
      &:hover {
        opacity: 1;
      }
    }
  }
  &.SwagScrollToTop {
    @apply p-3;
  }
  &_icon {
    width: 1.375rem;
    height: 1.375rem;
  }
}
</style>

<script setup lang="ts">
import {ref} from "vue";
import SwagIcon from "./SwagIcon.vue";

const top = ref(true);
if (typeof window !== 'undefined') {
  addEventListener('scroll', (e: Event) => top.value = window.scrollY === 0);
}

const scrollToTop = () => window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
</script>