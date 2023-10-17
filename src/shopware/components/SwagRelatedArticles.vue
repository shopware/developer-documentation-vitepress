<template>
    <div v-if="articles.length" class="vt-doc --similar-articles mb-8">
        <h2 class="e-heading">Continue with related topics:</h2>
        <div class="grid gap-6">
            <PageRef
                    v-for="link in articles"
                    :key="link.page"
                    :page="link.page"
                    :title="link.title"
                    :sub="link.description || ''"
                    :show-url="true"
            />
        </div>
    </div>
</template>

<script async setup>
import {ref, onMounted, watch} from "vue";
import {useData, useRoute} from "vitepress";
import {useConfig} from "../composables/config";
import {useSidebar} from "../composables/sidebar-vp";
import {getSidebarsWithMainKey} from '../support/sidebar'
import PageRef from "./PageRef.vue";

const articles = ref([]);
const route = useRoute();
const {config} = useConfig();
const { sidebar } = useSidebar();
const { page } = useData();
const similarArticlesHost = config.value.swag?.similarArticles?.host;
const { frontmatter } = useData()

const shouldFetchRelated = () => !frontmatter.value?.swag || !('related' in frontmatter.value.swag) || frontmatter.value.swag.related;

const fetchSimilarArticles = async () => {
  if (!shouldFetchRelated()) {
      articles.value = [];
      return;
  }
  if (!similarArticlesHost) {
    return;
  }
  try {
    articles.value = [];
    let id = route.path.replace(/\.[^/.]+$/, ".md").substring(1);
    if (id.endsWith('/')) {
      id = `${id}index.md`;
    }

    if (!id.length) {
      articles.value = [];
      return;
    }

    const [sidebars, key] = getSidebarsWithMainKey(config.value.sidebar, page.value.relativePath);

    const payload = {
      id: id,
      collection: config.value.swag?.similarArticles?.collection,
    };

    // filter inclusions and exclusions by sidebar
    const filters = config.value.swag?.similarArticles?.filter;
    if (filters && key && key in filters) {
      payload.filters = filters[key];
    } else if ("default" in filters) {
      payload.filters = filters.default;
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
        page: `/${id.replace(/\.[^/.]+$/, ".html").replace('/index.html', '/').replace('##', '#/')}`,
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
