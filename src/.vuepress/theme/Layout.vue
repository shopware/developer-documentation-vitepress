<template>
  <div>
    <header class="w-full h-20 bg-shopware-gray-dark flex justify-center drop-shadow drop-shadow-lg">
      
      <div class="w-full flex justify-between md:max-w-screen-2xl">
        <div class="w-72 flex px-6 items-center border-r border-slate-600">
          <img class="h-10" src="https://www.gitbook.com/cdn-cgi/image/height=40,fit=contain,dpr=2,format=auto/https%3A%2F%2F1272924779-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-28427.appspot.com%2Fo%2Fspaces%252F-MK3m-IGvXbMka6Y6_g7%252Favatar-rectangle-1603813941220.png%3Fgeneration%3D1603813941884466%26alt%3Dmedia" alt="">
        </div>
        <div class="w-56 flex items-center text-slate-200 text-sm">
          <SearchBox />
        </div>
      </div>

    </header>

    <div class="w-full flex justify-center bg-shopware-gray-light">
      
      <div class="w-full md:max-w-screen-2xl flex">

        <nav>

          <div class="w-72 flex-none border-r border-slate-300 pl-5 text-sm">
            
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

          </div>
        
        </nav>

        <main>

          <div class="grow bg-white px-16 py-6">
            
            <Content/>

          </div>

        </main>

      </div>

    </div>

  </div>
</template>


<script>
import SearchBox from '@SearchBox'

export default {
  name: 'Layout',

  components: { SearchBox },

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
// @import "./styles/prism.css"; /* Hack, because plugin is not loaded*/
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

.search-box {
  @apply w-full;
}

.search-box input {
  @apply w-full;
}

/* Custom CSS Classes */

.sw-navigation a {
  @apply text-slate-700;
}

.sw-navigation li {
  @apply px-4 py-2 font-medium;
}

.sw-navigation li.active {
  @apply border border-r-0 border-slate-300 bg-white text-shopware;
}

.sw-navigation li:hover {
  @apply bg-slate-200;
}

.sw-navigation li.active:hover {
  @apply bg-white;
}

</style>