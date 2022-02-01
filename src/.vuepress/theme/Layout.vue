<template>
  <div class="w-full bg-shopware-gray-light">

    <Header />
    <!-- Start Header -->


    <div class="w-full pt-20 md:max-w-screen-2xl mx-auto grid grid-cols-5 bg-shopware-gray-light">
      <div class="border-r border-slate-300 pl-5 py-6 text-sm">
        <nav>
          <Navigation :sidebar="sidebar" />
        </nav>
      </div>
      <div class="col-span-3 bg-white px-16 py-6">
        <main>
          <Content/>
        </main>
      </div>
      <div class="bg-white py-16 text-sm">
        <AnchorLinks v-if="!$frontmatter.hideAnchorNavigation" :page="page" />
      </div>
    </div>

  </div>
</template>


<script>
import SearchBox from '@SearchBox'
import Navigation from './global-components/Navigation'
import Header from './global-components/Header'
import AnchorLinks from './global-components/AnchorLinks'

export default {
  name: 'Layout',

  components: { Header, Navigation, AnchorLinks, SearchBox },

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

<style lang="stylus">
@import "./styles/prism.css"; /* Hack, because plugin is not loaded*/
</style>

<style>

h1, h2, h3, h4, h5, h6 {
  @apply font-semibold text-slate-800;
}

h1 {
  @apply text-3xl pt-2 pb-1 my-6;
}

h2 {
  @apply text-2xl pt-2 pb-1 my-5 border-b;
}

h3 {
  @apply text-xl pt-2 pb-1 my-4;
}

h4 {
  @apply text-lg pt-2 pb-1 my-3;
}

h5 {
  @apply pt-2 pb-1 my-2;
}

p {
  @apply leading-7 py-1 my-1;
}

ul {
  @apply list-disc pl-5 py-1 my-1;
}

ul ul {
  @apply py-0 my-0;
}

ol, p, ul {
  @apply leading-7 text-slate-800 break-words;
}

code {
  @apply break-words
}

main a {
  @apply text-shopware no-underline;
}

main a:hover {
  @apply underline;
}

.header-anchor {
    font-size: .85em;
    margin-left: -0.87em;
    padding-right: 0.23em;
    margin-top: 0.125em;
    @apply float-left opacity-0 text-shopware;
}

.header-anchor:hover {
  @apply underline;
}

*:hover > .header-anchor {
    @apply opacity-100;
}

table {
  border-collapse: collapse;
  margin: 1rem 0;
  display: block;
  overflow-x: auto;
}

tr {
    border-top: 1px solid #dfe2e5;
}

tr:nth-child(2n) {
    background-color: #f6f8fa;
}

td, th {
    border: 1px solid #dfe2e5;
    padding: 0.6em 1em;
}
</style>