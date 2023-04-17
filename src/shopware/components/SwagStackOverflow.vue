<template>
  <p
      class="edit-link-button"
      v-if="theme.editLink && frontmatter.stackOverflowLink !== false"
  >
    <VTIconStackOverflow class="edit-link-icon"/>
    <a target="_blank"
       :href="'https://stackoverflow.com/questions/ask?tags=shopware'">
      Ask a question on StackOverflow
    </a>
  </p>
</template>

<style lang="scss">
.edit-link-icon {
  margin-right: 8px;
  width: 14px;
  height: 14px;
  fill: currentColor;
}

.edit-link-button {
  display: flex;
  align-items: center;
  border: 0;
  line-height: 32px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand);
  transition: color 0.25s;
  &:hover {
    color: var(--vp-c-brand-dark);
  }
}
</style>

<script setup lang="ts">
import {useData} from "vitepress";
import VTIconStackOverflow from "./VTIconStackOverflow.vue";
//import VTLink from "../../core/components/VTLink.vue";
//import VPLink from "vitepress/theme";

const {page, frontmatter, theme} = useData()
</script>