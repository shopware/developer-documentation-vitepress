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
    <div class="Tabs_buttons">
        <button
            v-for="(tab, index) in tabs"
            @click="active = index"
            class="Tabs_button"
            v-bind:class="[index == active ? '--active' : '']">
            <SwagIcon v-if="tab.icon" :icon="tab.icon" />
            {{ tab.title }}
        </button>
    </div>

    <div class="Tabs_slot">
        <slot :active="active"></slot>
    </div>
</template>

<style lang="scss">
.Tabs {
  &_buttons {
    @apply flex gap-3;
  }
  &_button {
    @apply rounded-t-md px-4 py-3 text-sm border-t border-l border-r transition;
    @apply text-gray-400 dark:text-gray-500 border-transparent;
    @apply flex items-center gap-[1em];

    &.--active {
      @apply text-gray-900 dark:text-gray-200 border-gray-300 mb--1px;
      @apply dark:border-gray-600;
    }
  }

  &_slot {
    @apply rounded-b-md rounded-tr-md overflow-hidden mb-4 border border-gray-300;
    @apply dark:border-gray-600;
    margin-block-start: 0 !important;
  }

  &_button,
  &_slot {
    background-color: var(--sw-sidebar-bg);
  }
}
</style>