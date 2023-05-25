<template>
  <AisInstantSearch class="SwagAlgoliaSearchPage" :index-name="indexName" :search-client="searchClient">
    <div class="flex">
      <AisSearchBox placeholder="Search here…" class="searchbox"/>
      <select>
        <option value="main">latest</option>
        <option value="v6.4">v6.4</option>
        <option value="v6.4">v6.3</option>
      </select>
    </div>

    <AisStats/>

    <AisMenu attribute="version"/>

    <AisRefinementList attribute="version"/>

    <AisHierarchicalMenu :attributes="['version']" />

    <AisCurrentRefinements />

    <AisBreadcrumb :attributes="['lvl0', 'lvl1', 'version', 'repository']"/>

    <!--<AisHitsPerPage />-->

    <AisHits>
      <template v-slot="{ items, sendEvent }">
        <div class="SwagAlgoliaSearchPage_list">
          <a :href="item.url" class="SwagAlgoliaSearchPage_item c-any-card" v-for="item in items"
             :key="item.objectID">
                            <span class="SwagAlgoliaSearchPage_title">{{
                                item.hierarchy.lvl2 || item.hierarchy.lvl1 || item.hierarchy.lvl0
                              }}</span>
            <span class="SwagAlgoliaSearchPage_sub">{{ item.url }}</span>
            <AisHighlight :hit="item" attribute="description"/>
            <AisHighlight :hit="item" attribute="name"/>
          </a>
        </div>
      </template>
    </AisHits>

    <div class="pagination">
      <AisPagination/>
    </div>

    <!--<AisConfigure :hits-per-page.camel="20" :filters="`version:main`" />-->
  </AisInstantSearch>
</template>

<script setup lang="ts">
import {
  AisInstantSearch, AisSearchBox, AisHits, AisHighlight, AisStats, AisRefinementList, AisConfigure, AisHierarchicalMenu, AisMenu, AisCurrentRefinements, AisHitsPerPage, AisBreadcrumb, AisPagination 
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

.SwagAlgoliaSearchPage {
  @apply grid gap-4 my-6;
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