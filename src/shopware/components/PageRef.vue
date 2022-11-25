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
          <div i-carbon-logo-youtube class="h-7 w-7 text-shopware" />
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

const {config} = useConfig();
const attrs = useAttrs();
const route = useRoute();

const transformRelativeRoute = (url) => {
  if (url.startsWith('/')) {
    return url;
  }

  let parentPath = route.path;
  if (!parentPath.endsWith('/')) {
    // remove last path, we are not in directory at the moment
    parentPath = parentPath.split('/').reverse().slice(1).reverse().join('/');
  } else {
    // remove last /
    parentPath = parentPath.substring(0, parentPath.length - 1);
  }

  if (url.startsWith('./')) {
    // remove . from url, keep the same level
    return `${parentPath}${url.substring(1)}`;
  }

  const splitPath = parentPath.split('/');
  const countTwoDots = url.split('/').filter(part => part === '..').length;

  return `${splitPath.slice(0, splitPath.length - countTwoDots)}${url.substring('../'.length * countTwoDots)}`;
}

const getSidebarItem = (attr) => {
  // hardcoded title or sub/description
  if (attrs[attr]) {
    return attrs[attr];
  }

  const url = attrs.page;
  // cannot auto-resolve attrs for external or empty urls
  if (!url || url.startsWith('https://') || url.startsWith('http://') || url.startsWith('//')) {
    return attrs[attr];
  }

  const absolute = transformRelativeRoute(url);
  const levels = absolute.substring(1).split('/');

  const [firstLevel, secondLevel] = levels;
  const firstLevelItem = config.value.sidebar[`/${firstLevel}/`];

  const secondLevelItem = firstLevelItem?.find(({text}) => text.toLowerCase() === secondLevel.toLowerCase() || text.toLowerCase() === `${secondLevel.toLowerCase()}.html`);

  if (!secondLevelItem) {
    // @T00D00 - make it dynamic
    return 'Cannot find second level item!';
  }

  const mapper = {
    title: 'text',
  };

  return `${secondLevelItem[mapper[attr]] || attr}`;
  // return `Building ${url}->${attr} | ${secondLevelItem[mapper[attr]] || attr}`;
}

const getAttr = (attr) => ref(getSidebarItem(attr));

const page = ref(attrs.page);
const icon = ref(attrs.icon || "");
const target = ref(attrs.target || "");
const video = ref(attrs.video === "");

const title = getAttr('title');
const sub = getAttr('sub');
</script>
