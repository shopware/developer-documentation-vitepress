<template>
  <div class="SwagLandingCardListWrapper relative flex flex-col gap-4 py-10">
    <h3 v-if="$slots.title" class="SwagLandingCardListWrapper_title"><slot name="title"></slot></h3>
    <slot v-if="$slots.description" name="description"></slot>
    <div class="gap-10 SwagLandingCardList grid sm:grid-cols-2 md:grid-cols-3 pt-5">
      <slot name="cards">
        <SwagLandingCard v-for="item in exposed" v-bind="item"/>
      </slot>
    </div>
    <slot />
    <slot name="outro"></slot>
  </div>
</template>

<script setup lang="ts">
import SwagLandingCard from "./SwagLandingCard.vue";

defineProps({
  exposed: {
    type: Array,
    required: true,
  }
})
</script>

<style lang="scss">
.SwagLandingCardListWrapper {
  &_title {
    font-size: 1.5rem;
  }
}
</style>