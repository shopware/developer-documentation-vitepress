<template>
  <div class="flex flex-col gap-10">

    <div class="flex md:flex-row gap-10 content-center">

      <div class="md:basis-4/6 gap-10 flex flex-col">
        <h1 class="accent font-black">
          <slot name="title" v-if="!title"></slot>
          <template v-else>{{ title }}</template>
        </h1>

        <slot name="description" v-if="!description"></slot>
        <div v-html="description" v-else></div>

        <div>
          <slot name="ctas" v-if="!ctas?.length"></slot>
          <template v-else>
            <PageRef v-for="cta in ctas" :page="cta.page" :title="cta.title" :sub="cta.sub"/>
          </template>
        </div>
      </div>

      <div>
      <img class="md:basis-2/6" :src="image" alt="" />
          <slot name="im"></slot>
          {{ image }}
      </div>

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
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: true,
  },
  ctas: {
    type: Array,
    required: false,
    default: []
  },
  exposed: {
    type: Array,
    required: false,
    default: []
  }
});
</script>