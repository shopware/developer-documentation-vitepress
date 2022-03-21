<template>
  <div class="w-full min-h-full bg-shopware-gray-light dark:bg-slate-900">
    <div class="fixed z-1 left-0 top-0 w-screen h-screen opacity-50">
      <img
        class="w-full"
        src="https://tailwindcss.com/_next/static/media/docs-dark@30.77f062b5fd90f0d2cd4752cd9a8649c8.avif"
        alt=""
      />
    </div>

    <Header />
    <!-- Start Header -->

    <div class="relative w-full md:max-w-screen-2xl mx-auto z-2">
      <div class="w-full px-4 md:px-16 py-6 col-span-3 pt-24">
        <main class="w-full">
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>

<script>
// import Navigation from '../global-components/Navigation'
// import Header from '../global-components/Header'
// import AnchorLinks from '../global-components/AnchorLinks'

export default {
  name: "HomeLayout",

  // components: { Header, Navigation, AnchorLinks },

  data: () => {
    return {
      sidebar: [],
      page: null,
    };
  },

  mounted: function (ctx) {
    this.sidebar = []; // this.$site.themeConfig.sidebar["/"];
    this.page = this.$page;
  },
};
</script>

<style>
/* @import "../styles/index.css"; */
</style>
