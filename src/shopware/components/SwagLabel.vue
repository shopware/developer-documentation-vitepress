<template class="SwagLabel">
  <span class="SwagLabel" :class="label ? `--type-${label}` : ''">
    <template v-if="label">{{ labels[label] || label }}</template>
    <slot v-else />
  </span>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    required: false,
  }
});
const labels = {
  rc: 'RELEASE CANDIDATE',
  sec: 'SECURITY UPDATE',
  pre: 'PRE-RELEASE',
};
</script>

<style lang="scss">
.SwagLabel {
  @apply rounded-sm text-xs p-2 px-3 inline-block;
  background-color: var(--sw-c-gray-200);
  background-color: #E2E8F0;
  color: var(--sw-c-gray-dark-100);
  color: #475569;
  font-weight: 500;
  .dark & {
    background-color: var(--sw-c-gray-dark-600);
    color: var(--sw-c-gray-600);
  }
  &.--danger {
    background-color: #FBE5EA;
    color: #C80F24;
    /*.dark & {
      background-color: var(--sw-c-gray-dark-600);
      color: var(--sw-c-gray-600);
    }*/
  }
  &.--type-rc {
    background-color: var(--sw-c-blue-vivacious-100);
    color: var(--sw-c-blue-vivacious-900);
    .dark & {
      background-color: var(--sw-c-blue-vivacious-900);
      color: var(--sw-c-blue-vivacious-50);
    }
  }
  &.--type-sec {
    background-color: var(--sw-c-pink-100);
    color: var(--sw-c-pink-900);
    .dark & {
      background-color: var(--sw-c-pink-900);
      color: var(--sw-c-pink-50);
    }
  }
}
</style>