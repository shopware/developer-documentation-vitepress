<template>
  <p
      class="edit-link"
      v-if="theme.editLink && frontmatter.stackOverflowLink !== false"
  >
    <!--<VTIconStackOverflow class="vt-icon"/>-->
    <a target="_blank"
       :href="'https://stackoverflow.com/questions/ask?tags=shopware'">
      Ask a question on StackOverflow
    </a>
  </p>
</template>

<script setup lang="ts">
import {useData} from "vitepress";
import VTIconStackOverflow from "./VTIconStackOverflow.vue";
//import VTLink from "../../core/components/VTLink.vue";
//import VPLink from "vitepress/theme";

const {page, frontmatter, theme} = useData()
</script>