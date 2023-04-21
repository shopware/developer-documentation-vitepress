<template>
    <div class="SwagLandingCard c-any-card basis-1/3 hover:scale-110 rounded-l-[0.375rem] border-1px border-#eeeeee rounded-md">
        <div class="flex flex-col items-center gap-4">
            <a href="#">
                <img class="rounded-t-lg" :src="image" alt=""/>
            </a>
            <div class="p-4">
                <a href="#">
                    <h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                        <slot name="title"></slot>
                        {{ title }}
                    </h5>
                </a>
                <p class="SwagLandingCard_sub font-normal text-gray-700 dark:text-gray-400 text-xs">
                    <slot name="sub"></slot>
                    {{ sub }}
                </p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.SwagLandingCard {
  &_sub {
    margin: 0;
    line-height: 133%;
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
    }
});
</script>