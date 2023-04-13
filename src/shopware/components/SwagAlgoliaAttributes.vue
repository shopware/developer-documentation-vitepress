<template>
  <div class="SwagAlgoliaAttributes hidden">
    <span class="SwagAlgoliaAttributes_area">{{ point.repository }}</span>
    <span class="SwagAlgoliaAttributes_version">{{ point.version }}</span>
  </div>
</template>

<script setup lang="ts">
import {computed} from "vue";
import {useConfig} from "../../vitepress/composables/config";
import {useData, useRoute} from "vitepress";

import {getEmbeddingPoint} from "../../shopware/composables/repos";

const {config} = useConfig();
const route = useRoute();
const { theme } = useData()

const relativePath = computed(() => route.data.relativePath)
const embedsConfig = config.value?.swag?.embeds ?? [];

const point = computed(() => getEmbeddingPoint(embedsConfig, route.path));
</script>