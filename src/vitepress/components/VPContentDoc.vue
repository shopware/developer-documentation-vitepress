<script lang="ts" setup>
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import VPContentDocOutline from './VPContentDocOutline.vue'
import VPContentDocFooter from './VPContentDocFooter.vue'
import SwagRelatedArticles from '../../shopware/components/SwagRelatedArticles.vue'
import SwagAlgoliaAttributes from "../../shopware/components/SwagAlgoliaAttributes.vue";
import { VTLink, VTIconGitHub, VTIconStackOverflow } from "../../core"
import { useConfig } from '../composables/config'
import {getEmbeddingPoint} from "../../shopware/composables/repos";

const { page, frontmatter, theme } = useData()
const { config } = useConfig()

const route = useRoute();

const repoUrl = computed(() => {
  const embeddingPoint = getEmbeddingPoint(config.value?.swag?.embeds ?? [], route.path)

  const repo = embeddingPoint.repository;
  const branch = embeddingPoint.branch || "main";
  const dst = embeddingPoint.dst || "/";
  let folder = embeddingPoint.folder || "main";
  if (folder !== '.') {
    folder = `/${folder}`;
  } else {
    folder = '';
  }

  return `https://github.com/shopware/${repo}/edit/${branch}${folder}/${page.value.relativePath.substring(dst.length - 1)}`;
});

const pageClass = computed(() => {
  const { relativePath } = page.value
  return relativePath.slice(0, relativePath.indexOf('/'))
})
</script>

<template>
  <div
    class="VPContentDoc"
    :class="{ 'has-aside': frontmatter.aside !== false && page.headers.length, 'is-wide': frontmatter.wide === true }"
  >
    <div class="container">
      <div class="aside" v-if="frontmatter.aside !== false && page.headers.length">
        <div class="aside-container">
          <slot name="aside-top" />
          <VPContentDocOutline
            v-if="page.headers.length && frontmatter.outline !== false"
          />
          <slot name="aside-mid" />
          <slot name="aside-bottom" />
        </div>
      </div>
      <div class="content">
        <slot name="content-top" />
        <main>
          <SwagAlgoliaAttributes />

          <Content class="vt-doc" :class="pageClass" />

          <SwagRelatedArticles></SwagRelatedArticles>

          <p
            class="edit-link"
            v-if="config.editLink && frontmatter.editLink !== false"
          >
            <VTIconGitHub class="vt-icon" />
            <VTLink :href="repoUrl" :no-icon="true">{{
              config.editLink.text
            }}</VTLink>
          </p>

          <p
            class="edit-link"
            v-if="theme.editLink && frontmatter.stackOverflowLink !== false"
          >
            <VTIconStackOverflow class="vt-icon" />
            <VTLink :href="'https://stackoverflow.com/questions/ask?tags=shopware'"
                    :no-icon="true">Ask a question on StackOverflow
            </VTLink>
          </p>
        </main>
        <slot name="content-bottom" />
        <VPContentDocFooter v-if="frontmatter.footer !== false" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.VPContentDoc {
  padding: 32px 24px 96px;
}

.vt-doc {
  margin-bottom: 54px;
}

.content {
  margin: 0 auto;
  max-width: 768px; /* was 688px */
  position: relative;
}

.aside {
  position: relative;
  display: none;
  flex-shrink: 0;
  padding-left: 64px;
  width: 320px;
}

.aside-container {
  position: sticky;
  width: 224px;
  top: calc(var(--vt-nav-height) + var(--vt-banner-height, 0px) + 24px);
  bottom: 0;
}

.aside-container::-webkit-scrollbar {
  display: none;
}

.edit-link {
  margin: 0 0 16px;
  /* text-align: center; */
}
.edit-link:last-child {
  margin: 0 0 32px;
}

.edit-link .vt-link {
  font-size: 14px;
  color: var(--vt-c-brand);
  font-weight: 500;
}

.vt-icon {
  width: 18px;
  height: 18px;
  color: var(--vt-c-brand);
  display: inline-block;
  margin-right: 8px;
  position: relative;
  top: -1px;
}

@media (min-width: 768px) {
  .VPContentDoc {
    padding: 48px 32px 96px;
  }
}

@media (min-width: 960px) {
  .VPContentDoc {
    padding: 64px 64px 96px;
  }
}

@media (min-width: 1280px) {
  .VPContentDoc {
    padding: 64px 0 96px 64px;
  }
  .VPContentDoc/*:not(.has-sidebar.has-aside)*/ {
    /*padding-left: calc((100vw - 688px) / 2);*/
  }
  .VPContentDoc.has-aside:not(.has-sidebar) {
    padding-left: calc((100vw - 688px - 320px) / 2);
  }
  .VPContentDoc.is-wide {
    padding-left: 64px;
    padding-right: 64px;
  }
  .VPContentDoc.is-wide .container {
    margin: 0 auto;
    max-width: 100%;
  }
  .VPContentDoc.is-wide .content {
    max-width: 100%;
  }
  .container {
    display: flex;
  }
  .content {
    min-width: 620px;
    margin: 0;
    order: 1;
  }
  .VPContentDoc:not(.has-aside) .content {
    min-width: 688px;
  }
  .aside {
    display: block;
    order: 2;
  }
}

@media (min-width: 1440px) {
  .VPContentDoc {
    padding: 64px 0 96px 96px;
  }
  .aside {
    padding-left: 96px;
  }
}
</style>
