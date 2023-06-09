<template>
  <div class="SwagLandingCardListWrapper relative flex flex-col gap-4 leading-7 py-10">
    <h3 v-if="$slots.title"><slot name="title"></slot></h3>
    <slot v-if="$slots.description" name="description"></slot>
    <div class="gap-10 SwagLandingCardList grid sm:grid-cols-2 md:grid-cols-3 pt-5">
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
    @apply bg-#f5f7f9 dark:bg-#1e1e20;
    z-index: -1;
    position: absolute;
    top: 0;
    bottom: 0;
    left: -1000%;
    right: -1000%;
    content: '';
    display: block;
    background-color: var(--sw-c-gray-50);
    .dark & {
      background-color: var(--sw-c-gray-dark-800);
    }
  }

  &.--alternative {
    &::before {
      display: none;
    }
  }
}
</style>