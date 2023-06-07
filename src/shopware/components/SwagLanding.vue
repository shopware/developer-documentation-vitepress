<template>
  <div class="flex flex-col gap-10">

    <div class="grid grid-cols-3 gap-10">

      <div class="flex flex-col col-span-3 xl:col-span-2 leading-7">
        <h1 class="accent font-black styled">
          <slot name="title" v-if="!title"></slot>
          <template v-else>{{ title }}</template>
        </h1>

        <div>
          <slot name="description" v-if="!description"></slot>
          <div v-html="description" v-else></div>
        </div>

        <div class="mt-10">
            <div class="grid gap-6">
              <slot name="ctas">
                  <PageRef v-for="cta in ctas" :page="cta.page" :title="cta.title" :sub="cta.sub"/>
              </slot>
            </div>
        </div>
      </div>

      <div>
        <!-- <slot name="image">
            <img :src="image" :alt="title" class="w-100" />
        </slot> -->
      </div>

    </div>

    <template v-if="exposed" v-for="(section, i) in exposed">
      <SwagLandingCardList
          :exposed="section.exposed"
          :class="i % 2 === 1 ? '--alternative' : ''">
        <template #title>{{ section.title }}</template>
        <template #description>{{ section.description }}</template>
      </SwagLandingCardList>
    </template>

    <slot name="exposed"></slot>
    <slot name="exposed2"></slot>
    <slot name="exposed3"></slot>

  </div>
</template>

<style lang="scss" scoped>
h1 {
  margin-bottom: 0;
  font-weight: 900;
  font-family: 'Poppins';
}
</style>

<script setup lang="ts">
import SwagLandingCardList from "./SwagLandingCardList.vue";

const props = defineProps({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  ctas: {
    type: Array,
    default: () => []
  },
  exposed: {
    type: Array,
    default: () => []
  }
});
</script>