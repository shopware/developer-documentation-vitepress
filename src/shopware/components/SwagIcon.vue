<template>
    <span class="SwagIcon" :style="{'--icon-src': `url(${publicPath}/icons/${type}/${icon}.svg)`}"></span>
</template>

<style lang="scss">
.SwagIcon {
  background-color: currentColor;
  -webkit-mask: var(--icon-src) no-repeat center;
  mask: var(--icon-src) no-repeat center;
  display: block;
}
</style>

<script lang="ts" setup>
// :id="`meteor-icon-kit__${type}-${icon}`"
import {PropType} from "vue";

enum IconTypeEnum {
    REGULAR = "regular",
    SOLID = "solid"
}

const props = defineProps({
    icon: {
        type: String,
        required: true,
    },
    type: {
        type: String as PropType<IconTypeEnum>,
        required: false,
        default: 'regular',
    }
});

const publicPath = import.meta.env.MODE === 'development'
    ? '/@fs/www/developer-portal/node_modules/@shopware-ag/meteor-icon-kit'
    : '';
</script>