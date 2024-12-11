<script setup>

import { provide, computed, ref } from 'vue'

const tabs = ref({});

const active = ref(null)

const registerTab = function (tab, id) {
    if (!id) {
        id = `${Object.keys(tabs.value).length}`;
    } else {
        tab.id = id;
    }

    if (!Object.keys(tabs.value).length || id === window.location.hash.substring(1)) {
        active.value = id;
    }

    tabs.value[id] = tab;
}

const activeTitle = computed(() => tabs.value[active.value]?.title);

provide('registerTab', registerTab);

provide('activeTitle', activeTitle)

</script>

<template>
    <div class="Tabs_buttons">
        <component
            :is="tab.id ? 'a' : 'button'"
            v-bind="tab.id ? {href: `#${index}`} : {}"
            v-for="(tab, index) in tabs"
            @click.prevent.stop="active = index"
            class="Tabs_button"
            :class="[index === active ? '--active' : '']">
            <SwagIcon v-if="tab.icon" :icon="tab.icon" />
            {{ tab.title }}
        </component>
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
    background-color: var(--vp-c-gutter);
  }
}
</style>