<template>
  <a href="#" class="SwagScrollToTop" @click.prevent="scrollToTop" v-if="false">{{ top }} To the top</a>
</template>

<style lang="scss">
.SwagScrollToTop {
  @apply position-fixed;
  bottom: 1rem;
  right: 1rem;
}
</style>

<script setup lang="ts">
import {ref, toRefs} from "vue";
import {useScroll} from '@vueuse/core'

const el = ref<HTMLElement | null>(document.body)
const {arrivedState} = useScroll(el)
const {left, right, top, bottom} = toRefs(arrivedState)

const scrollToTop = () => window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
</script>