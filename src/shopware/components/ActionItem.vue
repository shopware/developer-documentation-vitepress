<template>
    <div>
        <h3 class="text-21px mb-4">{{ heading }}</h3>
        <p class="text-thin text-14px leading-6 text-#607182">
            <slot></slot>
        </p>
    </div>
</template>

<script setup>

import { useAttrs } from 'vue'

const attrs = useAttrs();

let heading = attrs.heading;
let text = attrs.text;
</script>

<style>
h3 {
    font-weight: 500;
}
</style>