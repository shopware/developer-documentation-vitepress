<script setup lang="ts">
const props = defineProps<{
  text: string;
  type?: string;
}>();
</script>

<template>
  <span
    class="bg-green-700 text-white text-xs inline-block h-18px px-6px align-top rounded-full"
  >
    {{ text }}
  </span>
</template>
