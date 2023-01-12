<script lang="ts" setup>
import type { DefaultTheme } from 'vitepress/theme'
import { ref, watchEffect } from 'vue'
import { useData } from 'vitepress'
import { isActive, isPartiallyActive } from '../support/utils.js'
import VPIconPlusSquare from './icons/VPIconPlusSquare.vue'
import VPIconMinusSquare from './icons/VPIconMinusSquare.vue'
import VPSidebarLink from './VPSidebarLink.vue'
import { MenuItemWithLink } from "../../core";
import {SidebarGroup} from "../config";

const props = defineProps<{
  text?: string
  link: string
  items: DefaultTheme.SidebarItem[]
  collapsible?: boolean
  collapsed?: boolean
  showPartiallyActive?: boolean
}>()

const collapsed = ref(false)
watchEffect(() => {
  collapsed.value = !!(props.collapsible && props.collapsed)
})

function activeMethod(currentPath: string, matchPath?: string) {
  if (props.showPartiallyActive) {
    return isPartiallyActive(currentPath, matchPath);
  }
  return isActive(currentPath, matchPath);
}

const { page } = useData()
watchEffect(() => {
  const { relativePath } = page.value;
  if(props.items.some((item) => {
    return activeMethod(relativePath, item.link);
  })){
    collapsed.value = false
  }
})

function toggle() {
  if (props.collapsible) {
    collapsed.value = !collapsed.value
  }
}

function hasActiveLink(items: SidebarGroup["items"]) {
  const {relativePath} = page.value;
  return false;
  // return items.some((item) => isPartiallyActive(relativePath, item.link));
}
</script>

<template>
  <section class="VPSidebarGroup" :class="{ collapsible, collapsed }">
    <div
      v-if="text"
      class="title"
      :role="collapsible ? 'button' : undefined"
      @click="toggle"
    >
      <h2 class="title-text" :class="{ active: hasActiveLink() }">
        <VPSidebarLink
            v-if="link"
            :item="{text, link}"
            :showPartiallyActive="showPartiallyActive"
            :link-class="null"/>
        <template v-else>{{ text }}</template>
      </h2>
      <div class="action">
        <VPIconMinusSquare class="icon minus" />
        <VPIconPlusSquare class="icon plus" />
      </div>
    </div>

    <div class="items">
      <template v-for="item in items" :key="item.link">
        <VPSidebarLink :item="item" :showPartiallyActive="showPartiallyActive" />
      </template>
    </div>
  </section>
</template>

<style scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  z-index: 2;
}

.title-text {
  padding-top: 6px;
  padding-bottom: 6px;
  line-height: 20px;
  font-size: 14px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.action {
  display: none;
  position: relative;
  margin-right: -8px;
  border-radius: 4px;
  width: 32px;
  height: 32px;
  color: var(--vp-c-text-3);
  transition: color 0.25s;
}

.VPSidebarGroup.collapsible .action {
  display: block;
}

.VPSidebarGroup.collapsible .title {
  cursor: pointer;
}

.title:hover .action {
  color: var(--vp-c-text-2);
}

.icon {
  position: absolute;
  top: 8px;
  left: 8px;
  width: 16px;
  height: 16px;
  fill: currentColor;
}

.icon.minus { opacity: 1; }
.icon.plus  { opacity: 0; }

.VPSidebarGroup.collapsed .icon.minus { opacity: 0; }
.VPSidebarGroup.collapsed .icon.plus  { opacity: 1; }

.items {
  overflow: hidden;
}

.VPSidebarGroup.collapsed .items {
  margin-bottom: -22px;
  max-height: 0;
}

@media (min-width: 960px) {
  .VPSidebarGroup.collapsed .items {
    margin-bottom: -14px;
  }
}
</style>
