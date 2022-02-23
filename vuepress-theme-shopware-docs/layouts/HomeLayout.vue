<template>
  <div class="w-full bg-shopware-gray-light dark:bg-slate-900">

    <div class="absolute left-0 top-0 w-screen h-screen opacity-50">
      <img class="w-full" src="https://tailwindcss.com/_next/static/media/docs-dark@30.77f062b5fd90f0d2cd4752cd9a8649c8.avif" alt="">
    </div>

    <Header />
    <!-- Start Header -->

    <div class="w-full md:max-w-screen-2xl mx-auto grid grid-cols-5">
      <div class="px-16 py-6 col-span-3">
        <main>
          <Content/>
        </main>
      </div>
      <div class="flex justify-center col-span-2">
        <div class="mt-56 w-10/12 h-fit">

        </div>
      </div>
    </div>

  </div>
</template>


<script>
import Navigation from '../global-components/Navigation'
import Header from '../global-components/Header'
import AnchorLinks from '../global-components/AnchorLinks'

export default {
  name: 'Layout',

  components: { Header, Navigation, AnchorLinks },

  data: () => {
    return {
      sidebar: [],
      page: null
    }
  },

  mounted: function (ctx) {
    this.sidebar = this.$site.themeConfig.sidebar['/'];
    this.page = this.$page;
  }
}
</script>

<style>
@import "../styles/index.css";
</style>