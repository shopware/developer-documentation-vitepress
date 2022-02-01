<template>
  <ul class="sw-navigation list-none">
    <a href="/">
      <li>Home</li>
    </a>
    <a
      v-for="item in sidebar"
      :key="item.key" :href="item.path"
      >
      <li
        v-bind:class="{ active: $page.regularPath === item.path }">
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
    </a>
  </ul>
</template>

<script>
export default {
  name: 'Navigation',

  props: {
    sidebar: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style>
/* Custom CSS Classes */

.sw-navigation a {
  @apply text-slate-700;
}

.sw-navigation li {
  @apply border border-shopware-gray-light px-4 py-2 font-medium;
}

.sw-navigation li.active {
  @apply border-r-0 border-slate-300 bg-white text-shopware;
}

.sw-navigation li:hover {
  @apply border-slate-200 bg-slate-200;
}

.sw-navigation li.active:hover {
  @apply bg-white;
}
</style>