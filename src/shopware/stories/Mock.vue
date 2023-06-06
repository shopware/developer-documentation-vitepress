<template>
    <div class="Mock">
        <slot/>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    options: {}
});

import {computed, provide} from "vue";
import {configSymbol} from "../../shopware/composables/config";
import {useData} from "vitepress";

const {theme} = useData();

provide(configSymbol, computed(() => ({
    nav: [],
    sidebar: {
        ...theme.value.sidebar,
    },
    swag: {
        similarArticles: {
            host: 'https://knowledge-index.shopware.com',
            filter: {}
        }
    }
})))

// remove previously added classes
document.documentElement.getAttribute('data-mock-class')?.split(' ')?.forEach(name => document.documentElement.classList.remove(name));

if (props.options?.theme) {
    document.documentElement.classList.add(props.options.theme);
    document.documentElement.setAttribute('data-mock-class', props.options.theme);
}
</script>