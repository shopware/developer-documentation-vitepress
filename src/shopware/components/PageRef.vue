<template>
  <a class="PageRef"
     :href="page"
     v-bind="autoBind">
    <div
      class="c-any-card flex gap-3 border-1px border-#eeeeee rounded-md p-4"
    >
      <div v-if="icon" class="flex w-14 items-center">
        <img :src="icon" class="w-14 h-14 object-cover" />
      </div>
      <div v-else-if="video">
        <div class="i-carbon-logo-youtube h-7 w-7 text-shopware" />
      </div>
      <div class="flex-1">
        <span class="PageRef_title c-any-card_title">{{ title }}</span>
        <div
          v-if="sub?.length > 0"
          class="PageRef_sub c-any-card_description mt-2 block"
        >
          {{ sub }}
        </div>
      </div>
    </div>
  </a>
</template>

<script setup>
import {useAttrs, ref} from "vue";
import {useConfig} from "../composables/config";
import {useRoute} from "vitepress";
import {getSidebarItem} from "../utils/sidebar";
import {useExternalLink} from "../composables/external";

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

const autoBind = useExternalLink({target, page: page.value});
</script>
