<script lang="ts" setup>
import { MenuItemWithLink } from "../../core";
import VPSidebarLink from "./VPSidebarLink.vue";
import { isActive, isPartiallyActive } from "../support/utils";
import { useData } from "vitepress";
import { ref, computed } from "vue";

const props = defineProps<{
  link: string,
  text: string;
  items: MenuItemWithLink[];
  showPartiallyActive?: boolean;
  chevron: boolean;
}>();

function activeMethod(currentPath: string, matchPath: string) {
  if (props.showPartiallyActive) {
    return isPartiallyActive(currentPath, matchPath);
  }
  return isActive(currentPath, matchPath);
}

const { page } = useData();
const hasActiveLink = computed(() => {
  let { relativePath } = page.value;
  // make root
  if (relativePath.endsWith('/index.md')) {
    relativePath = relativePath.substring(0, relativePath.length - 'index.md'.length);
  }
  const absolutePath = `/${relativePath}`;
  return absolutePath === props.link
      || (relativePath.endsWith('/') && absolutePath.startsWith(props.link))
      || props.items.some((item) => activeMethod(relativePath, item.link));
})

const isExpanded = ref(false);
const toggleExpanded = () => {
  if (props.link !== '#') {
    return;
  }

  isExpanded.value = !isExpanded.value;
}
</script>

<template>
  <section class="VPSidebarGroup"
           :class="{ '--expanded': hasActiveLink || isExpanded }">
    <div class="title">
      <h2 class="title-text" :class="{ active: hasActiveLink || isExpanded }">
        <VPSidebarLink
            v-if="link"
            :item="{text, link, items}"
            :showPartiallyActive="showPartiallyActive"
            :chevron="chevron"
            @click.native="toggleExpanded"
            :link-class="null"/>
        <template v-else>{{ text }}</template>
      </h2>
    </div>

    <template v-for="item in items" :key="item.link">
      <VPSidebarGroup
          v-if="item?.items?.length && (item?.link?.endsWith('/') || item.link === '#')"
          :chevron="true"
          :text="item.text"
          :link="item.link"
          :items="item.items"/>
      <VPSidebarLink v-else :item="item" :showPartiallyActive="showPartiallyActive" :chevron="chevron" />
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
.VPSidebarGroup .VPSidebarGroup > a {
  margin-left: 1.2rem;
  display: none;
}
.VPSidebarGroup .VPSidebarGroup.--expanded > a {
  display: block;
}
</style>