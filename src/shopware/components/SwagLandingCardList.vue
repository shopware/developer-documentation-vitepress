<template>
  <div class="SwagLandingCardListWrapper relative flex flex-col gap-4 leading-7">
    <h3><slot name="title"></slot></h3>
    <slot name="description"></slot>
    <div class="gap-10 SwagLandingCardList pt-5 pb-10 grid sm:grid-cols-2 md:grid-cols-3">
      <slot name="cards">
        <SwagLandingCard v-for="item in exposed" v-bind="item"/>
      </slot>
    </div>
    <slot name="outro"></slot>
  </div>
</template>

<script setup lang="ts">
import SwagLandingCard from "./SwagLandingCard.vue";

const props = defineProps({
  exposed: {
    type: Array,
    required: true,
  }
})
</script>

<style lang="scss">
.SwagLandingCardListWrapper {
  isolation: isolate;

  &::before {
    z-index: -1;
    position: absolute;
    top: 0;
    bottom: 0;
    left: -100%;
    right: -100%;
    content: '';
    display: block;
    @apply bg-#f5f7f9 dark:bg-#1e1e20;
  }

  &.--alternative {
    &::before {
      display: none;
    }
  }
}
</style>