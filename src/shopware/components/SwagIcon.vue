<template>
    <span class="SwagIcon" :style="iconStyle"></span>
</template>

<style lang="scss">
.SwagIcon {
  background-color: currentColor;
  -webkit-mask: var(--icon-src) no-repeat center;
  mask: var(--icon-src) no-repeat center;
  display: block;
  width: var(--icon-size, 2rem);
  height: var(--icon-size, 2rem);
}
</style>

<script lang="ts" setup>
import {computed, PropType} from "vue";
import {meteorPublicPath} from "../utils/meteor";

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

const iconStyle = computed(() => ({'--icon-src': `url("${meteorPublicPath}/icons/${props.type}/${props.icon}.svg")`}))
</script>