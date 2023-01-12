<script lang="ts" setup>
import type { DefaultTheme } from 'vitepress/theme'
import { type Ref, computed, inject, ref, watchEffect } from 'vue'
import { useData } from 'vitepress'
import { useSidebar } from '../composables/sidebar.js'
import { isActive, isPartiallyActive } from '../support/utils.js'
import VPLink from './VPLink.vue'

const props = withDefaults(
  defineProps<{
    item: DefaultTheme.SidebarItem;
    depth?: number;
    showPartiallyActive?: boolean;
    linkClass?: string;
  }>(),
  {
    depth: 1,
    linkClass: 'link-text'
  }
)

const { page, frontmatter } = useData()
const maxDepth = computed<number>(
  () => frontmatter.value.sidebarDepth || Infinity
)

const active = computed(() =>
  isActive(page.value.relativePath, props.item.link)
)

const { isSidebarEnabled } = useSidebar()
const closeSideBar = inject('close-sidebar') as () => void
const isSidebarOpen = inject('is-sidebar-open') as Ref<boolean>

function activeMethod(currentPath: string, matchPath: string) {
  if (props.showPartiallyActive) {
    return isPartiallyActive(currentPath, matchPath);
  }
  return isActive(currentPath, matchPath);
}

const link = ref<InstanceType<typeof VPLink> | null>(null)
watchEffect(() => {
  if (isSidebarOpen.value && active.value) {
    link.value?.$el?.focus()
  }
})
</script>

<template>
  <VPLink
    class="link"
    :class="{ active: activeMethod(page.relativePath, item.link) }"
    :style="{ paddingLeft: 16 * (depth - 1) + 'px' }"
    :href="item.link"
    :tabindex="isSidebarEnabled || isSidebarOpen ? 0 : -1"
    @click="closeSideBar"
    ref="link"
  >
    <span v-html="item.text" :class="linkClass" :class="{ light: depth > 1 }"></span>
  </VPLink>
  <template
    v-if="'items' in item && depth < maxDepth"
    v-for="child in item.items"
    :key="child.link"
  >
    <VPSidebarLink :item="child" :depth="depth + 1" />
  </template>
</template>

<style scoped>
.link {
  display: block;
  margin: 4px 0;
  color: var(--vp-c-text-2);
  transition: color 0.5s;
}

.link:hover {
  color: var(--vp-c-text-1);
}

.link.active {
  color: var(--vp-c-brand);
}

.link.active .link-text,
.title-text .link.active {
  font-weight: 600;
  color: var(--vt-c-brand);
  transition: color 0.25s;
}

.link :deep(.icon) {
  width: 12px;
  height: 12px;
  fill: currentColor;
}

.link-text {
  line-height: 20px;
  font-size: 14px;
  font-weight: 500;
}

.link-text.light {
  font-size: 13px;
  font-weight: 400;
}
</style>
