<template>
    <div class="SwagLandingCard c-any-card">
        <a :href="page" v-if="icon">
            <SwagIcon class="SwagLandingCard__icon" :icon="icon"/>
        </a>
        <div>
            <a :href="page">
                <h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                    <slot name="title">{{ title }}</slot>
                </h5>
            </a>
            <a :href="page" class="SwagLandingCard_sub font-normal text-xs">
                <slot name="sub">{{ sub }}</slot>
            </a>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.SwagLandingCard {
  @apply basis-1/3 hover:scale-110 rounded-l-[0.375rem] border-1px border-#eeeeee rounded-md flex flex-row items-center gap-4 p-4;
  &_sub {
    margin: 0;
    line-height: 133%;
    @apply text-gray-700 dark:text-gray-400;
  }

  &__icon {
    background-color: var(--c-link);
    width: 3rem;
    height: 3rem;
  }

  &:hover {
    .SwagLandingCard__icon {
      background-color: var(--c-link--hover);
    }
  }
}
</style>

<script setup lang="ts">
const props = defineProps({
    page: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    sub: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    }
});
</script>