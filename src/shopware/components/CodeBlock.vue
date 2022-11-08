<script setup>
import { useAttrs, ref } from 'vue'

let attrs = useAttrs();

let title = ref(attrs.title);
</script>

<template>
    <div class="mb-14">
        <div v-if="title" class="flex gap-3 items-center font-mono text-xs bg-gray-100 dark:bg-#313131 py-3 px-5 rounded-md">
            <div i-carbon-document class="h-6 w-6" />
            {{ title }}
        </div>
        <div class="mb--7 mt--4">
            <slot></slot>
        </div>
    </div>
</template>
