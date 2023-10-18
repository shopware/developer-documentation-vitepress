<template>
  <a class="btn">
    <SwagIcon v-if="icon && iconAt === 'start'" :icon="icon" :mode="iconMode" />
    <slot />
    <SwagIcon v-if="icon && iconAt === 'end'" :icon="icon" :mode="iconMode" />
  </a>
</template>
<script setup>
const props = defineProps({
  icon: {
    required: false,
    default: null,
  },
  iconAt: {
    required: false,
    default: 'start',
  },
  iconMode: {
    required: false,
    default: 'solid',
  }
});
</script>