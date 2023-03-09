<script lang="ts" setup>
import { MenuItemWithLink } from "../../core";
import VPSidebarLink from "./VPSidebarLink.vue";
import { isActive, isPartiallyActive } from "../support/utils";
import { useData } from "vitepress";

const props = defineProps<{
  link: string,
  text: string;
  items: MenuItemWithLink[];
  showPartiallyActive?: boolean;
}>();

function activeMethod(currentPath: string, matchPath: string) {
  if (props.showPartiallyActive) {
    return isPartiallyActive(currentPath, matchPath);
  }
  return isActive(currentPath, matchPath);
}

const { page } = useData();
function hasActiveLink() {
  const { relativePath } = page.value;
  return props.items.some((item) => activeMethod(relativePath, item.link));
}
</script>

<template>
  <section class="VPSidebarGroup">
    <div class="title">
      <h2 class="title-text" :class="{ active: hasActiveLink() }">
        <VPSidebarLink
            v-if="link"
            :item="{text, link}"
            :showPartiallyActive="showPartiallyActive"
            :link-class="null"/>
        <template v-else>{{ text }}</template>
      </h2>
    </div>

    <template v-for="item in items" :key="item.link">
      <VPSidebarGroup
          v-if="item.items && item.link?.endsWith('/')"
          :text="item.text"
          :link="item.link"
          :items="item.items"/>
      <VPSidebarLink v-else :item="item" :showPartiallyActive="showPartiallyActive" />
    </template>
  </section>
</template>

<style scoped>
.title {
  padding: 6px 0;
}

@media (min-width: 960px) {
  .title {
    padding: 4px 0;
  }
}

.title-text {
  line-height: 20px;
  font-size: 13px;
  font-weight: 600;
  color: var(--vt-c-text-1);
  transition: color 0.5s;
  text-transform: uppercase;
}
</style>

<style>
.VPSidebarGroup .VPSidebarGroup {
  margin-left: .5rem;
}
.VPSidebarGroup .VPSidebarGroup > a {
  margin-left: .5rem;
}
</style>