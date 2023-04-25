<template>
  <div class="flex flex-col gap-10">

    <div class="flex flex-col md:flex-row gap-10 content-center items-center md:items-start">

      <div class="md:basis-[calc(66.666667%+2.5rem)] gap-10 flex flex-col">
        <h1 class="accent font-black">
          <slot name="title" v-if="!title"></slot>
          <template v-else>{{ title }}</template>
        </h1>

        <slot name="description" v-if="!description"></slot>
        <div v-html="description" v-else></div>

        <div>
          <slot name="ctas">
              <PageRef v-for="cta in ctas" :page="cta.page" :title="cta.title" :sub="cta.sub"/>
          </slot>
        </div>
      </div>

      <!--<div class="md:basis-2/6">
        <slot name="image">
            <img :src="image" :alt="title" class="w-100" />
        </slot>
      </div>-->

    </div>

    <template v-if="exposed" v-for="(section, i) in exposed">
      <SwagLandingCardList :exposed="section.exposed" :class="i % 2 === 1 ? '--alternative' : ''">
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
import SwagLandingCard from "./SwagLandingCardList.vue";
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