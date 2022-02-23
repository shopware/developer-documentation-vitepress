<template>
  <div class="w-full bg-shopware-gray-light dark:bg-slate-900">

    <Header />
    <!-- Start Header -->

    <div class="w-full pt-20 md:max-w-screen-2xl mx-auto grid grid-cols-5 bg-shopware-gray-light dark:bg-slate-900">
      <div class="border-r border-slate-300 dark:border-slate-800 pl-5 py-6 text-sm">
        <nav v-if="!($frontmatter.sidebar !== undefined && $frontmatter.sidebar === false)">
          <Navigation :sidebar="sidebar" />
        </nav>
      </div>
      <div class="col-span-4 bg-white dark:bg-slate-900 px-16 py-6">
        <main>
          <Content/>
        </main>
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

h1 {
    @apply text-4xl font-extrabold mb-8;
    background-image: url('https://www.shopware.com/media/image/24/73/97/gradient-wavey-rectangle.jpg');
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    background-position: center;
    background-size: cover;
}
</style>