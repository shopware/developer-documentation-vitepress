<template>
  <p
      class="edit-link"
      v-if="theme.editLink && frontmatter.stackOverflowLink !== false"
  >
    <!--<VTIconStackOverflow class="vt-icon"/>-->
    <VTLink :href="'https://stackoverflow.com/questions/ask?tags=shopware'"
            :no-icon="true">Ask a question on StackOverflow
    </VTLink>
  </p>
</template>

<script setup lang="ts">
import {useData} from "vitepress";
import VTIconStackOverflow from "../../core/components/icons/VTIconStackOverflow.vue";
import VTLink from "../../core/components/VTLink.vue";

const {page, frontmatter, theme} = useData()
</script>