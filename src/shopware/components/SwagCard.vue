<template>
  <a :href="page"
     class="SwagCard c-any-card rounded-lg p-5">
    <div class="flex items-center">
      <span class="text-lg font-semibold mt-2 mb-4 accent flex gap-2">
        <div class="i-carbon-model-alt h-7 w-7 text-shopware"/>
        <slot name="title"></slot>
      </span>
    </div>
    <div class="SwagCard__description text-sm">
      <slot name="description"></slot>
    </div>
    <!--<p class="mt-4"><a class="text-sm" :href="link">→ learn more</a></p>-->
  </a>
</template>

<script setup lang="ts">
const props = defineProps({
  page: {
    type: String,
    required: true,
  }
});
</script>

<style lang="scss">
.SwagCard {
  cursor: pointer;
  @apply flex flex-col content-start flex-wrap;
  /*display: flex;
  flex-direction: column;
  align-content: flex-start;
  flex-wrap: wrap;*/

  &__description {
    color: var(--c-text);
  }
}
</style>