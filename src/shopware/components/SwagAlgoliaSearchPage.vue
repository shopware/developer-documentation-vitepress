<template>
  <AisInstantSearch class="SwagAlgoliaSearchPage" :index-name="indexName" :search-client="searchClient">
    <div class="SwagAlgoliaSearchPage_sidebar">
      <AisSearchBox placeholder="Search here…" class="searchbox"/>

      <!--<AisMenu attribute="version"/>-->

      <!--<AisMenu attribute="repository"/>-->

      <!--<AisRefinementList attribute="version"/>-->

      <AisHierarchicalMenu :attributes="['version', 'hierarchy.lvl0']"/>

      <!--<AisCurrentRefinements/>-->

      <!--<AisHitsPerPage />-->
    </div>

    <div class="SwagAlgoliaSearchPage_content">

      <AisStats/>

      <!--<AisBreadcrumb :attributes="['lvl0', 'lvl1', 'version', 'repository']"/>-->

      <AisHits>
        <template v-slot="{ items, sendEvent }">

          <div class="SwagAlgoliaSearchPage_list">
            <a :href="item.url" class="SwagAlgoliaSearchPage_item c-any-card" v-for="item in items"
               :key="item.objectID">
              <span class="SwagAlgoliaSearchPage_title">
                {{ item.hierarchy.lvl2 || item.hierarchy.lvl1 || item.hierarchy.lvl0 }}
              </span>
              <span class="SwagAlgoliaSearchPage_sub">{{ item.url }}</span>
              <AisHighlight :hit="item" attribute="repository"/>
              <AisHighlight :hit="item" attribute="version"/>
            </a>
          </div>
        </template>
      </AisHits>

      <div class="pagination">
        <AisPagination/>
      </div>
    </div>

    <!--<AisConfigure :hits-per-page.camel="20" :filters="`version:main`" />-->
  </AisInstantSearch>
</template>

<script setup lang="ts">
import {
  AisInstantSearch,
  AisSearchBox,
  AisHits,
  AisHighlight,
  AisStats,
  AisRefinementList,
  AisConfigure,
  AisHierarchicalMenu,
  AisMenu,
  AisCurrentRefinements,
  AisHitsPerPage,
  AisBreadcrumb,
  AisPagination
} from 'vue-instantsearch/vue3/es';
import algoliasearch from 'algoliasearch/lite';
import 'instantsearch.css/themes/algolia-min.css';
import {useData} from "vitepress";

const {theme} = useData()
const {appId, indexName, apiKey} = theme.value.algolia;
const searchClient = algoliasearch(appId, apiKey);
</script>

<style lang="scss">
.ais-Pagination-list {
  list-style: none;
}

.VPPage {
  max-width: 1440px;
  padding: 0 2rem;
  margin: 0 auto;
}

.ais-HierarchicalMenu-count {
  @apply ml-2;
}

.SwagAlgoliaSearchPage {
  @apply grid md:flex gap-10 my-6;

  &_sidebar {
    @apply md:w-56 md:flex-none;
    @apply grid gap-4;
    @apply self-start;
  }

  &_content {
    @apply md:flex-1 md:min-w-0;
    @apply grid gap-4;
    @apply self-start;
  }

  &_list {
    @apply grid gap-4;
  }

  &_item {
    @apply p-4 flex flex-col;
  }

  &_sub {
    @apply text-xs;
    color: var(--c-text);
  }
}
</style>