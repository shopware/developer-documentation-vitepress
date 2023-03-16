<script lang="ts" setup>
import { useData } from "vitepress";
import { computed, ref, onMounted } from "vue";
import { MenuItemWithLink } from "../../core";
import { isActive } from "../support/utils";
import {VTIconChevronRight, VTIconChevronDown} from "../../core";

const props = withDefaults(defineProps<{
  item: MenuItemWithLink;
  linkClass?: string;
  chevron?: boolean;
  expanded?: boolean;
}>(), {
  linkClass: 'link-text'
});

const { page } = useData();
// const closeSideBar = inject("close-sidebar") as () => {};

const hasActive = computed(() => isActive(page.value.relativePath, props.item.link))

const root = ref(null);
onMounted(() => {
  if (!hasActive.value || !root.value) {
    return;
  }

  root.value.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
});
</script>

<template>
  <a
    :class="{ link: true, active: hasActive }"
    :href="item.link"
    ref="root"
  >
    <p :class="linkClass">
      <template v-if="chevron && item.items?.length">
        <VTIconChevronRight v-if="!expanded" class="vt-link-icon" />
        <VTIconChevronDown v-else class="vt-link-icon" />
      </template>
      {{ item.text }}
    </p>
  </a>
</template>

<style scoped>
.link {
  display: block;
  padding: 6px 0;
}

@media (min-width: 960px) {
  .link {
    padding: 4px 0;
  }
}

.link:hover .link-text {
  color: var(--vt-c-brand-text-1);
  transition: color 0.25s;
}

.link.active .link-text,
.title-text .link.active {
  font-weight: 600;
  color: var(--vt-c-brand);
  transition: color 0.25s;
}

.link-text {
  line-height: 20px;
  font-size: 13px;
  font-weight: 500;
  color: var(--vt-c-text-2);
  transition: color 0.5s;
}

.vt-link-icon {
  margin-left: 0;
  width: 16px;
  height: 16px;
}
</style>
