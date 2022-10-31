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
            class="rounded-t-md bg-gray-100 dark:bg-#313131 px-4 py-3 text-sm border-t border-l border-r transition"
            v-bind:class="[index == active ? 'text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-600 mb--1px' : 'text-gray-400 dark:text-gray-500 border-transparent']">
            {{ tab.title }}
        </button>
    </div>

    <div class="rounded-b-md rounded-tr-md overflow-hidden mb-4 border border-gray-300 dark:border-gray-600">
        <slot :active="active"></slot>
    </div>
</template>