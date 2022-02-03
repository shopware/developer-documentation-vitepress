<template>
  <ul class="list-none m-0 p-0 border-l dark:border-slate-800 anchor-links-list">
    <li
      class="px-6 py-2 leading-5"
      v-for="section in pageHeaders"
      :key="section.slug"
    >
      <a
        :class="getLevelClass(section.level)"
        :href="getAnchorLink(section.slug)"
        >{{ section.title }}</a
      >
    </li>
  </ul>
</template>

<script>
export default {
  name: "AnchorLinks",

  props: {
    page: {
      type: Object,
      default: () => {
        headers: [];
      },
    },
  },

  methods: {
    getAnchorLink(slug) {
      return `#${slug}`;
    },

    getLevelClass(level) {
      return `level-${level}`;
    },
  },

  computed: {
    pageHeaders() {
      return this.page?.headers || [];
    },
  },
};
</script>

<style>
.level-1 {
  @apply font-bold;
}

.level-2 {
  @apply font-medium;
}

.level-3 {
  @apply ml-4;
}

.anchor-links-list a:hover {
  @apply text-shopware;
}
</style>
