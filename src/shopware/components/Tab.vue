<script setup>
import { useAttrs, computed, ref, onMounted, inject } from 'vue'

const attrs = useAttrs();

const title = ref(attrs.title);

const registerTab = inject('registerTab');

const activeTitle = inject('activeTitle');

const isActive = computed(() => title.value == activeTitle.value);

onMounted(() => 
    registerTab({
        title: title.value,
        icon: attrs.icon
    })
);
</script>

<style lang="scss">
.Tab_slot {
  @apply px-5 pt-3 pb-1;
  background-color: var(--sw-sidebar-bg);
}
</style>

<template>
    <div v-if="isActive" class="Tab_slot">
        <slot></slot>
    </div>
</template>