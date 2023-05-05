<template>
    <div>
        <slot/>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    options: {}
});

import {computed, provide} from "vue";
import {configSymbol} from "../../shopware/composables/config";

provide(configSymbol, computed(() => ({
    nav: [],
    sidebar: {
        '/': [
            {
                text: 'Root',
                link: '/',
                items: [
                    {
                        text: 'My',
                        link: '/my/',
                        items: [
                            {
                                text: 'Route',
                                link: '/my/route.html',
                                items: []
                            }
                        ]
                    }
                ]
            }
        ],
        '/my/': [
            {
                text: 'My',
                link: '/my/',
                items: [
                    {
                        text: 'Route',
                        link: '/my/route.html',
                        items: []
                    }
                ]
            }
        ]
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