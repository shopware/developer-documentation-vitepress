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
    })
);
</script>

<template>
    <div v-if="isActive" class="px-5 pt-3 pb-1 bg-gray-100 dark:bg-#313131">
        <slot></slot>
    </div>
</template>