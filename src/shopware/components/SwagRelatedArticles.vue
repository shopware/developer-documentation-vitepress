<template>
  <div v-if="articles.length" class="vt-doc --similar-articles">
    <h2>Continue with related topics:</h2>
    <PageRef
        v-for="link in articles"
        :key="link.page"
        :page="link.page"
        :title="link.title"
        :sub="''"
    ></PageRef>
  </div>
</template>

<script async setup>
import {ref, onMounted, watch} from "vue";
import {useData, useRoute} from "vitepress";
import {useConfig} from "../../vitepress/composables/config";
import {useSidebar} from "../../vitepress/composables/sidebar";
import { getSidebarsWithMainKey } from '../../vitepress/support/sidebar'

const articles = ref([]);
const route = useRoute();
const {config} = useConfig();
const { sidebar, hasSidebar } = useSidebar();
const { page } = useData();
const similarArticlesHost = config.value.swag?.similarArticlesHost;

const fetchSimilarArticles = async () => {
  if (!similarArticlesHost) {
    return;
  }
  try {
    let id = route.path.replace(/\.[^/.]+$/, ".md").substring(1);
    if (id.endsWith('/')) {
      id = `${id}index.md`;
    }

    const [sidebars, key] = getSidebarsWithMainKey(config.value.sidebar, page.value.relativePath);

    const payload = {
      id: id,
    };

    // filter inclusions and exclusions by sidebar
    const filters = config.value.swag?.similarArticlesFilter;
    if (filters && key && key in filters) {
      payload.filters = filters[key];
    }

    const response = await fetch(
        `${similarArticlesHost}/neighbours`,
        {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        },
    );
    const data = await response.json();
    articles.value = data.results.map(({id, heading, description}) => ({
      page: `/${id.replace(/\.[^/.]+$/, ".html").replace('/index.html', '')}`,
      title: heading,
      description: description,
    }));
  } catch (e) {
    console.error(e);
  }
};

// can't use immediate: true because of SSR?
watch(
    () => route.path,
    fetchSimilarArticles,
)

// due to immediate: false
onMounted(fetchSimilarArticles)
</script>
