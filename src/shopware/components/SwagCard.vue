<template>
  <a :href="page"
     v-bind="autoBind"
     class="SwagCard c-any-card p-5">
    <div class="flex items-center">
      <span class="text-lg font-semibold mt-2 mb-4 accent flex gap-2">
        <!--<div class="i-carbon-model-alt h-7 w-7 text-shopware"/>-->
        <slot name="title"></slot>
      </span>
    </div>
    <div class="SwagCard_description c-any-card_description">
      <slot name="description"></slot>
    </div>
    <!--<p class="mt-4"><a class="text-sm" :href="link">→ learn more</a></p>-->
  </a>
</template>

<script setup lang="ts">
import {useExternalLink} from "../composables/external";

const props = defineProps({
  page: {
    type: String,
    required: true,
  }
});

const autoBind = useExternalLink({page: props.page});
</script>

<style lang="scss">
.SwagCard {
  @apply flex flex-col content-start flex-wrap;
}
</style>