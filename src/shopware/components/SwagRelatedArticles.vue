<template>
  <div v-if="articles.length">
    <b class="mb-2">Continue with related topics:</b>
    <PageRef
      v-for="link in articles"
      :page="link.page"
      :title="link.title"
    ></PageRef>
  </div>
</template>

<script async setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useData, useRoute } from "vitepress";
import { useConfig } from "../../vitepress/composables/config";

const articles = ref([]);
const route = useRoute();
const { config } = useConfig();
const similarArticlesHost = config.value.swag?.similarArticlesHost;

onMounted(async () => {
  if (!similarArticlesHost) {
    return;
  }
  try {
    const { data } = await axios.post(`${similarArticlesHost}/query`, {
      query: route.path,
    });
    articles.value = [
      ...articles.value,
      ...data.results.map(({ source, heading }) => ({
        page: source
          .substring("/data/docs/src".length)
          .replace(/\.[^/.]+$/, ".html"),
        title: heading,
      })),
    ];
  } catch (e) {
    console.error(e);
  }
});
</script>
