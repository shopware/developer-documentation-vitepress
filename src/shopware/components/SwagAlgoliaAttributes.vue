<template>
  <div class="SwagAlgoliaAttributes hidden">
    <span class="SwagAlgoliaAttributes_area">{{ point.repository }}</span>
    <span class="SwagAlgoliaAttributes_version">{{ point.version }}</span>
    <span class="SwagAlgoliaAttributes_section">{{ section }}</span>
  </div>
</template>

<script setup lang="ts">
import {computed} from "vue";
import {useConfig} from "../../shopware/composables/config";
import {useData, useRoute} from "vitepress";

import {getEmbeddingPoint, getSection} from "../../shopware/composables/repos";

const {config} = useConfig();
const route = useRoute();
const { theme } = useData()

const relativePath = computed(() => route.data.relativePath)
const embedsConfig = config.value?.swag?.embeds ?? [];
const sectionsConfig = config.value?.swag?.sections ?? [];

const point = computed(() => getEmbeddingPoint(embedsConfig, route.path));
const section = computed(() => getSection(sectionsConfig, route.path));
</script>