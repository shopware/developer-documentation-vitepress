<template>
  <div class="SwagCardSummary c-flat-card" :style="{'--mask-image': maskImage}">
    <SwagIcon class="SwagCardSummary_icon"
              type="solid"
              :icon="icon" />
    <div>
      <h4 class="SwagCardSummary_title"><slot name="title"></slot></h4>
      <div class="SwagCardSummary_links">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.SwagCardSummary {
  @apply p-6 grid gap-4;
  grid-template-columns: 1.25rem auto;
  &_icon {
    --icon-size: 1.25rem;
  }
  &_title {
    font-size: 1.25rem;
  }
  &_links {
    ul {
      @apply p-0 m-0 mt-2.5 grid;
      list-style: none;
    }
    .vp-doc & a:not([class]) {
      @apply flex items-center;
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 500;
      flex-direction: row;
      color: var(--sw-c-blue-vivacious);
      &:after {
        background-color: var(--sw-c-blue-vivacious);
        mask-image: var(--mask-image);
        content: '';
        display: block;
        width: .825rem;
        height: .5rem;
        margin-left: .5rem;
      }
    }
  }
}
</style>

<script setup>
import {meteorPublicPath} from "../utils/meteor";
import {computed} from "vue";
const props = defineProps({
  icon: {
    type: String,
    required: true,
  }
})

const maskImage = computed(() => `url(${meteorPublicPath}/icons/solid/long-arrow-right.svg)`)
</script>