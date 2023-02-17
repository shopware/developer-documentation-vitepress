<template>
  <div>
    <a :href="page" :target="target">
      <div
        class="flex gap-3 border-1px border-#eeeeee rounded-md p-4 shadow-md bg-#fdfdfd mb-6 hover:shadow-lg hover:border-#e8e8e8 dark:border-#444 dark:bg-#222 dark:hover:border-#333 dark:hover:bg-#212121"
      >
        <div v-if="icon" class="flex w-14 items-center">
          <img :src="icon" class="w-14 h-14 object-cover" />
        </div>
        <div v-else-if="video">
          <div class="i-carbon-logo-youtube h-7 w-7 text-shopware" />
        </div>
        <div class="flex-1">
          {{ title }}
          <div
            v-if="sub?.length > 0"
            class="mt-2 text-gray font-normal text-xs block"
          >
            {{ sub }}
          </div>
        </div>
      </div>
    </a>
  </div>
</template>

<script setup>
import {useAttrs, ref} from "vue";
import {useConfig} from "../../vitepress/composables/config";
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
