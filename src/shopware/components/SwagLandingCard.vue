<template>
  <a :href="page" class="SwagLandingCard c-any-card" v-bind="autoBind">
    <div class="h-36 overflow-hidden bg-gradient-to-r" :class="gradient">
      <img v-if="image" :src="image" class="w-full h-full object-cover" />
      <img src="../assets/shopware-placeholder.svg" v-else class="w-full h-full object-cover" />
    </div>
    <div class="flex items-center">
      <!--<div v-if="icon || $slots.icon" class="p-4">
        <a :href="page">
          <slot name="icon">
            <SwagIcon class="SwagLandingCard_icon" :icon="icon" :type="iconType" />
          </slot>
        </a>
      </div>-->
      <div class="p-4 grid gap-2">
        <div class="SwagLandingCard_title c-any-card_title tracking-tight">
          <slot name="title">{{ title }}</slot>
        </div>
        <div class="SwagLandingCard_description c-any-card_description">
          <slot name="sub">{{ sub }}</slot>
        </div>
      </div>
    </div>
  </a>
</template>

<style lang="scss" scoped>
.SwagLandingCard {
  @apply flex flex-col;

  &_icon {
    background-color: var(--c-link);
    width: 3rem;
    height: 3rem;
  }

  &:hover {
    .SwagLandingCard_icon {
      background-color: var(--c-link--hover);
    }
  }
}
</style>

<script setup lang="ts">
import {useExternalLink} from "../composables/external";

const props = defineProps({
  page: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  sub: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  icon: {
    type: String,
    required: false,
  },
  iconType: {
    type: String,
    default: "regular",
  },
});

let childGradients = [
  "from-sky-500 to-indigo-500",
  "from-indigo-500 to-purple-500",
  "from-purple-500 to-pink-500",
  "from-pink-500 to-red-500",
  "from-red-500 to-yellow-500",
  "from-yellow-500 to-green-500",
  "from-green-500 to-teal-500",
  "from-teal-500 to-blue-500",
  "from-blue-500 to-sky-500",
  "from-indigo-500 to-sky-500",
  "from-purple-500 to-indigo-500",
  "from-pink-500 to-purple-500",
  "from-red-500 to-pink-500",
  "from-yellow-500 to-red-500",
  "from-green-500 to-yellow-500",
  "from-teal-500 to-green-500",
  "from-blue-500 to-teal-500",
  "from-sky-500 to-blue-500",
];

let gradient = childGradients[props?.page?.length % childGradients.length || 0];

const autoBind = useExternalLink({page: props.page});
</script>
