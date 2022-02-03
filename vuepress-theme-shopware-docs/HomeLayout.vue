<template>
  <div class="w-full bg-shopware-gray-light dark:bg-slate-900">

    <div class="absolute left-0 top-0 w-screen h-screen opacity-20">
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

/* code {
  @apply break-words
} */

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