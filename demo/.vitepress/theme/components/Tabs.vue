<script setup>

import { provide, computed, ref } from 'vue'

const tabs = ref([]);

const active = ref(0)

const registerTab = function (tab) {
    tabs.value.push(tab);
}

const activeTitle = computed(() => tabs.value[active.value]?.title);

provide('registerTab', registerTab);

provide('activeTitle', activeTitle)

</script>

<template>
    <div class="flex gap-3">
        <button
            v-for="(tab, index) in tabs"
            @click="active = index"
            class="rounded-t-md bg-gray-100 dark:bg-#313131 px-3 py-2 text-sm"
            v-bind:class="[index == active ? 'text-gray-900 dark:text-gray-200' : 'text-gray-400 dark:text-gray-500']">
            {{ tab.title }}
        </button>
    </div>

    <div class="rounded-b-md rounded-tr-md overflow-hidden mb-4">
        <slot :active="active"></slot>
    </div>
</template>