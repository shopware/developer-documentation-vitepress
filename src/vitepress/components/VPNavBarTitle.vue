<script setup lang="ts">
import { useData } from 'vitepress'
import { useSidebar } from '../composables/sidebar.js'
import VPImage from './VPImage.vue'
import { withBase } from "vitepress";

const { site, theme } = useData()
const { hasSidebar } = useSidebar()
</script>

<template>
  <div class="flex items-center">
    <a class="VPNavBarTitle" :href="withBase('/')" :class="{ 'has-sidebar': hasSidebar }">
      <img
          src="./../assets/shopware-docs.svg"
          alt="Shopware"
          class="VPNavBarImage"
      />
    </a>
    <a :href="withBase('/installation.html')"
    ><span class="accent text-xl">EA</span></a
    >
  </div>
</template>

<style scoped>
.VPNavBarTitle {
  flex-shrink: 0;
  border-bottom: 1px solid transparent;
  color: var(--vt-c-brand);
}

.VPNavBarImage {
  width: 90%;
  height: 40px;
}

@media (min-width: 960px) {
  .VPNavBarTitle.has-sidebar {
    margin-right: 32px;
    width: calc(var(--vp-sidebar-width) - 64px);
    border-bottom-color: var(--vp-c-divider-light);
    background-color: var(--vp-c-bg-alt);
  }
}

.title {
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--vp-nav-height);
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  transition: opacity 0.25s;
}

.title:hover {
  opacity: 0.6;
}

@media (min-width: 960px) {
  .title {
    flex-shrink: 0;
  }
}

:deep(.logo) {
  margin-right: 8px;
  height: 24px;
}
</style>
