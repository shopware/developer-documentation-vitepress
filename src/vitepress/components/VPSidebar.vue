<script lang="ts" setup>
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import { computed } from "@vue/reactivity";
import { useData } from "vitepress";
import { nextTick, ref, watchEffect, watchPostEffect } from "vue";
import { useSidebar } from "../composables/sidebar";
import { isPartiallyActive } from "../support/utils";
import VPSidebarGroup from "./VPSidebarGroup.vue";
import { SidebarGroup } from "../config";
import { MenuItemWithLink } from "src/core";

const { sidebar, hasSidebar } = useSidebar()

const props = defineProps<{
  open: boolean
}>()

// a11y: focus Nav element when menu has opened
let navEl = ref<(Element & { focus(): void }) | null>(null)

function lockBodyScroll() {
  disableBodyScroll(navEl.value!, { reserveScrollBarGap: true })
}

function unlockBodyScroll() {
  clearAllBodyScrollLocks()
}

watchPostEffect(async () => {
  if (props.open) {
    lockBodyScroll()
    await nextTick()
    navEl.value?.focus()
  } else {
    unlockBodyScroll()
  }
})

const {page} = useData();

function hasActiveLink(items: SidebarGroup["items"]) {
  const {relativePath} = page.value;
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
      class="VPSidebar flex"
      :class="{ open, 'has-additional-menu': shouldShowAdditionalMenu }"
      ref="navEl"
      @click.stop
  >
    <div class="VPSidebarNav__wrapper">
      <nav
          class="VPSidebarNav"
          aria-labelledby="sidebar-aria-label"
          tabindex="-1"
      >
        <slot name="top"/>
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
        <slot name="bottom"/>
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
          <VPSidebarGroup :text="group.text" :items="group.items"/>
        </div>
      </nav>
    </div>
  </aside>
</template>

<style scoped>
.VPSidebar {
  position: fixed;
  top: var(--vp-layout-top-height, 0px);
  bottom: 0;
  left: 0;
  z-index: var(--vp-z-index-sidebar);
  padding: 32px 32px 96px;
  width: calc(100vw - 64px);
  max-width: 320px;
  background-color: var(--sw-sidebar-bg);
  opacity: 0;
  box-shadow: var(--vp-c-shadow-3);
  overflow-x: hidden;
  overflow-y: auto;
  transform: translateX(-100%);
  transition: opacity 0.5s, transform 0.25s ease;
}

.VPSidebar.open {
  opacity: 1;
  visibility: visible;
  transform: translateX(0);
  transition: opacity 0.25s,
              transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
}

.dark .VPSidebar {
  box-shadow: var(--vp-shadow-1);
}

@media (min-width: 960px) {
  .VPSidebar {
    z-index: 1;
    padding-top: var(--vp-nav-height-desktop);
    padding-bottom: 128px;
    width: var(--vp-sidebar-width);
    max-width: 100%;
    background-color: var(--vp-c-bg-alt);
    opacity: 1;
    visibility: visible;
    box-shadow: none;
    transform: translateX(0);
  }
}

@media (min-width: 1620px) {
  .VPSidebar {
    padding-left: max(32px, calc((100% - (var(--vp-layout-max-width) - 64px)) / 2));
    width: calc((100% - (var(--vp-layout-max-width) - 64px)) / 2 + var(--vp-sidebar-width) - 32px);
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

.nav {
  outline: 0;
}

.group + .group {
  margin-top: 32px;
  border-top: 1px solid var(--vp-c-divider-light);
  padding-top: 10px;
}

@media (min-width: 960px) {
  .group {
    padding-top: 10px;
    width: calc(var(--vp-sidebar-width) - 64px);
  }

  .group + .group {
    margin-top: 24px;
  }
}
</style>
