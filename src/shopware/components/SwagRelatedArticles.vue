<template>
  <div v-if="articles.length">
    <b class="mb-2">Continue with related topics:</b>
    <PageRef v-for="link in articles" :page="link"></PageRef>
  </div>
</template>

<script async setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useData, useRoute } from "vitepress";

const articles = ref(["/apps/checkout/item-1", "/apps/checkout/item-2"]);
const route = useRoute();

onMounted(async () => {
  try {
    //const host = "http://172.18.0.1:10002";
    const host = 'http://ai-ml.fly.dev';
    const { data } = await axios.post(`${host}/query`, {
      query: route.path,
    });
    articles.value = [
      ...articles.value,
      ...data.results.map(({source}) => source.substring('/data/docs/src'.length).replace(/\.[^/.]+$/, ""))
    ];
  } catch (e) {
    console.error(e);
  }
});
</script>
