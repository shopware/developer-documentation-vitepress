<script setup>
import { useAttrs, computed, ref, onMounted, inject } from 'vue'

const attrs = useAttrs();
const props = defineProps({
  icon: {
    type: String,
    required: false
  }
});

const title = ref(attrs.title);

const registerTab = inject('registerTab');

const activeTitle = inject('activeTitle');

const isActive = computed(() => title.value == activeTitle.value);

onMounted(() => 
    registerTab({
        title: title.value,
        icon: props.icon,
    }, attrs.id)
);
</script>

<style lang="scss">
.Tab_slot {
  @apply px-5 pt-3 pb-1;
  background-color: var(--vp-c-gutter);
}
</style>

<template>
    <div v-if="isActive" class="Tab_slot">
        <slot></slot>
    </div>
</template>