<template>
  <div class="SwagCardSummary c-flat-card">
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
      @apply p-0 m-0 grid gap-0.5;
      list-style: none;
    }
    a {
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 500;
    }
  }
}
</style>

<script setup>
const props = defineProps({
  icon: {
    type: String,
    required: true,
  }
})
</script>