<template>
  <div v-if="articles.length" class="vt-doc">
    <b class="mb-2 flex">Continue with related topics:</b>
    <PageRef
      v-for="link in articles"
      :page="link.page"
      :title="link.title"
      :sub="link.description"
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
    let id = route.path.replace(/\.[^/.]+$/, ".md").substring(1);
    if (id.endsWith('/')) {
      id = `${id}index.md`;
    }

    const { data } = await axios.post(
      `${similarArticlesHost}/neighbours`,
      {
        id: id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    articles.value = [
      ...articles.value,
      ...data.results.map(({ id, heading, description }) => ({
        page: `/${id.replace(/\.[^/.]+$/, ".html").replace('/index.html', '')}`,
        title: heading,
        description: description,
      })),
    ];
  } catch (e) {
    console.error(e);
  }
});
</script>
