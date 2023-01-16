<script lang="ts" setup>
import { nextTick, ref, watchEffect, watchPostEffect } from 'vue'
import { useConfig } from '../composables/config'
import { useSidebar } from '../composables/sidebar'
import VPSidebarGroup from './VPSidebarGroup.vue'
import { useData } from "vitepress";
import { isPartiallyActive } from "../support/utils";
import { SidebarGroup } from "../config";
import { MenuItemWithLink } from "src/core";

const { sidebar, hasSidebar } = useSidebar()
const { config } = useConfig()

const props = defineProps<{
  open: boolean
}>()

// A11y: Focus Nav element when menu has opened
let navEl = ref<(Element & { focus(): void }) | null>(null)
watchPostEffect(async () => {
  if (props.open) {
    await nextTick()
    navEl.value?.focus()
  }
})

const { page } = useData();

function hasActiveLink(items: SidebarGroup["items"]) {
  const { relativePath } = page.value;
  return items.some((item) => isPartiallyActive(relativePath, item.link));
}

const currentActiveGroup = ref();
const currentActiveGroupElement = ref();
const shouldShowAdditionalMenu = ref();

watchEffect(async () => {
  currentActiveGroup.value = sidebar.value.findLast((group: SidebarGroup) =>
    hasActiveLink(group.items)
  );
  currentActiveGroupElement.value = currentActiveGroup.value?.items?.find(
    (item: MenuItemWithLink) =>
      isPartiallyActive(page.value.relativePath, item.link)
  );
  shouldShowAdditionalMenu.value = !!currentActiveGroupElement.value?.items?.length;
});
</script>

<template>
  <aside
    v-if="hasSidebar"
    ref="navEl"
    class="VPSidebar"
    :class="{ open, 'has-additional-menu': shouldShowAdditionalMenu }"
    @click.stop
  >
    <div class="VPSidebarNav__wrapper">
      <nav
        class="VPSidebarNav"
        aria-labelledby="sidebar-aria-label"
        tabindex="-1"
      >
        <slot name="top" />
        <span id="sidebar-aria-label" class="visually-hidden"
        >Sidebar Navigation</span
        >
        <div v-for="group in sidebar" :key="group.text" class="group">
          <VPSidebarGroup
            :link="group.link"
            :text="group.text"
            :items="group.items"
            :showPartiallyActive="
              currentActiveGroup && currentActiveGroup.text === group.text
            "
          />
        </div>
        <slot name="bottom" />
      </nav>
      <nav
        class="VPSidebarNav"
        aria-labelledby="sidebar-aria-label"
        tabindex="-1"
        v-if="currentActiveGroupElement"
      >
              <span id="sidebar-aria-label" class="visually-hidden"
              >{{ currentActiveGroupElement.text }} section navigation</span
              >
        <h2
          v-if="shouldShowAdditionalMenu"
          class="font-bold pb-3 uppercase"
        >
          {{ currentActiveGroupElement.text }}
        </h2>
        <div
          v-if="shouldShowAdditionalMenu"
          v-for="group in currentActiveGroupElement.items"
          :key="group.text"
          class="group"
        >
          <VPSidebarGroup :text="group.text" :items="group.items" />
        </div>
      </nav>
    </div>
  </aside>
</template>

<style scoped>
.VPSidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: var(--vp-z-index-sidebar);
  padding: 0 32px 96px;
  width: calc(100vw - 64px);
  max-width: var(--vp-sidebar-width-mobile);
  opacity: 0;
  background-color: var(--sw-sidebar-bg);
  box-shadow: var(--vt-c-shadow-3);
  overflow-x: hidden;
  overflow-y: auto;
  transform: translateX(-100%);
  transition: background-color 0.5s, opacity 0.5s, transform 0.3s ease;
  /* -ms-overflow-style: none; */
  /* scrollbar-width: none; */
}

.VPSidebarNav {
  padding-top: 24px;
  outline: 0;
}
.VPSidebarNav__wrapper {
  position: relative;
}

/* .VPSidebar::-webkit-scrollbar {
  display: none;
} */

@media (min-width: 960px) {
  .VPSidebar {
    top: calc(var(--vt-nav-height) + var(--vt-banner-height, 0px));
    z-index: 1;
    border-right: 1px solid var(--sw-sidebar-border);
    width: var(--vp-sidebar-width-small);
    max-width: 100%;
    opacity: 1;
    visibility: visible;
    box-shadow: none;
    transform: translateX(0);
    transition: border-color 0.5s, background-color 0.5s;
  }
}

@media (min-width: 1620px) {
  .VPSidebar {
    padding: 0 32px 96px calc((100% - var(--vp-screen-max-width)) / 2);
    width: calc(
      (100% - var(--vp-screen-max-width)) / 2 + var(--vp-sidebar-width-small)
    );
    transition: padding 0.3s linear;
  }

  .has-additional-menu {
    --nav-left: -100px;
  }
  .VPSidebarNav:nth-child(1) {
    position: relative;
    left: var(--nav-left, 0);
    transition: left 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  }

  .VPSidebarNav:nth-child(2) {
    position: absolute;
    left: 200%;
    top: 0;
    width: 100%;
    transition: left 0.6s cubic-bezier(0.19, 1, 0.22, 1);
  }
  .has-additional-menu .VPSidebarNav:nth-child(2) {
    left: 50%;
  }
}

.VPSidebar.open {
  opacity: 1;
  visibility: visible;
  transform: translateX(0);
  transition: background-color 0.5s, opacity 0.25s,
    transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
}

.dark .VPSidebar {
  box-shadow: var(--vt-shadow-1);
}

.group + .group {
  padding-top: 24px;
}

@media (min-width: 960px) {
  .group + .group {
    padding-top: 16px;
  }
}
</style>
