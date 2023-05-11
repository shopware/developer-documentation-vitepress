<template>
  <div class="PageRef">
    <a class="PageRef_link" :href="page" :target="target">
      <div
        class="c-any-card flex gap-3 border-1px border-#eeeeee rounded-md p-4"
      >
        <div v-if="icon" class="flex w-14 items-center">
          <img :src="icon" class="w-14 h-14 object-cover" />
        </div>
        <div v-else-if="video">
          <div class="i-carbon-logo-youtube h-7 w-7 text-shopware" />
        </div>
        <div class="flex-1 ellipsis">
          {{ title }}
          <div
            v-if="sub?.length > 0"
            class="PageRef_sub mt-2 text-gray font-normal text-xs block"
          >
            {{ sub }}
          </div>
        </div>
      </div>
    </a>
  </div>
</template>

<style lang="scss">
.PageRef {
  &_sub {
    max-width: 0;
  }
  &_link {
    color: var(--c-link);
    font-weight: 500;
    &:hover {
      color: var(--c-link--hover)
    }
  }
}
</style>

<script setup>
import {useAttrs, ref} from "vue";
import {useConfig} from "../composables/config";
import {useRoute} from "vitepress";
import {getSidebarItem} from "../utils/sidebar";

const {config} = useConfig();
const attrs = useAttrs();
const route = useRoute();

const getAttr = (attr) => ref(getSidebarItem(config.value.sidebar, route, attrs, attr));

const page = ref(attrs.page);
const icon = ref(attrs.icon || "");
const target = ref(attrs.target || "");
const video = ref(attrs.video === "");

const title = getAttr('title');
const sub = getAttr('sub');
</script>
