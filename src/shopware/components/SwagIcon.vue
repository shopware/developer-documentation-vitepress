<template>
    <span class="SwagIcon" :style="iconStyle"></span>
</template>

<style lang="scss">
.SwagIcon {
  background-color: currentColor;
  -webkit-mask: var(--icon-src) no-repeat center;
  mask: var(--icon-src) no-repeat center;
  display: block;
  width: 2rem;
  height: 2rem;
}
</style>

<script lang="ts" setup>
// :id="`meteor-icon-kit_${type}-${icon}`"
import {computed, PropType} from "vue";

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

const publicPath = import.meta.env.MODE === 'development' && !('STORYBOOK' in import.meta.env)
    ? `${(new URL(import.meta.url)).pathname.replace('/vitepress-shopware-docs/src/shopware/components/SwagIcon.vue', '/')}@shopware-ag/meteor-icon-kit`
    : '';

const iconStyle = computed(() => ({'--icon-src': `url("${publicPath}/icons/${props.type}/${props.icon}.svg")`}))
</script>