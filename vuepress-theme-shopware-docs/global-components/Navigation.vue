<template>
  <ul class="sw-navigation list-none">
    <router-link to="/">
      <li>Home</li>
    </router-link>
    <router-link v-for="item in sidebar" :key="item.key" :to="item.path">
      <li v-bind:class="{ active: $page.regularPath === item.path }">
        {{ item.title }}
      </li>
      <!-- <ul v-if="$page.regularPath === item.path">
        {{ item.children }}<a
        v-for="subItem in item.children"
        :key="subItem.key" :href="subItem"
        >
          <li
            v-bind:class="{ active: $page.regularPath === subItem.path }">
            {{ subItem.title }}
          </li>
        </a>
      </ul> -->
    </router-link>
  </ul>
</template>

<script>
export default {
  name: "Navigation",

  props: {
    sidebar: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style>
/* Custom CSS Classes */

.sw-navigation a {
  @apply text-slate-700 dark:text-slate-400;
}

.sw-navigation li {
  @apply border border-shopware-gray-light dark:border-slate-900 px-4 py-2 font-medium;
}

.sw-navigation li.active {
  @apply border-r-0 border-slate-300 bg-white text-shopware;
}

.sw-navigation li:hover {
  @apply border-slate-200 dark:border-slate-800 bg-slate-200 dark:bg-slate-800;
}

.sw-navigation li.active:hover {
  @apply bg-white;
}
</style>
