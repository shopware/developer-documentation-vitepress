<script lang="ts" setup>
import { MenuItemWithLink } from "../../core";
import VPSidebarLink from "./VPSidebarLink.vue";
import { useData } from "vitepress";
import { ref, computed, watch } from "vue";
import { hasActiveSublink } from "../support/utils";
import { useRouter } from 'vitepress';

const router = useRouter()

const props = defineProps<{
  link: string,
  text: string;
  items: MenuItemWithLink[];
  chevron: boolean;
}>();

const { page } = useData();
const hasAnyActiveLink = computed(() => {
  let { relativePath } = page.value;

  // make root
  if (relativePath.endsWith('/index.md')) {
    relativePath = relativePath.substring(0, relativePath.length - 'index.md'.length);
  } else if (relativePath.endsWith('.md')) {
    relativePath = `${relativePath.substring(0, relativePath.length - '.md' . length)}.html`;
  }

  const absolutePath = `/${relativePath}`;
  return absolutePath.startsWith(props.link)
      || hasActiveSublink(props.items, absolutePath);
})

const isExpanded = ref(hasAnyActiveLink.value);
const toggleExpanded = (e) => {
  if (props.link === '#') {
    e.preventDefault();
    e.stopPropagation();
  }

  isExpanded.value = !isExpanded.value;
}

watch(
    () => router.route.data.relativePath,
    (path) => isExpanded.value = hasAnyActiveLink.value,
    { immediate: true });
</script>

<template>
  <section class="VPSidebarGroup"
           :class="{ '--expanded': /*hasActiveLink || */isExpanded }">
    <div class="title">
      <h2 class="title-text">
        <VPSidebarLink
            v-if="link"
            :item="{text, link, items}"
            :chevron="chevron"
            :expanded="isExpanded"
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
      <VPSidebarLink v-else
                     :item="item"
                     :chevron="chevron"
                     :expanded="isExpanded" />
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
  margin-left: .6rem;
}
.group > .VPSidebarGroup > .VPSidebarGroup {
  margin-left: 0;
}
.group > .VPSidebarGroup > a {
  margin-left: 1.2rem;
}
.VPSidebarGroup > a {
  margin-left: 1.8rem;
}
.VPSidebarGroup .VPSidebarGroup .VPSidebarGroup {
  display: none;
}
.VPSidebarGroup .VPSidebarGroup > a {
  display: none;
}
.VPSidebarGroup .VPSidebarGroup.--expanded > a,
.VPSidebarGroup .VPSidebarGroup.--expanded > .VPSidebarGroup {
  display: block;
}
</style>