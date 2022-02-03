<template>
  <header class="fixed w-full h-20 bg-shopware-gray-dark dark:bg-slate-900/80 flex justify-center drop-shadow-lg backdrop-blur-md">
    <div class="w-full md:max-w-screen-2xl mx-auto grid grid-cols-5">
      <div class="flex items-center justify-start">
        <img class="h-10" src="https://www.gitbook.com/cdn-cgi/image/height=40,fit=contain,dpr=2,format=auto/https%3A%2F%2F1272924779-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-28427.appspot.com%2Fo%2Fspaces%252F-MK3m-IGvXbMka6Y6_g7%252Favatar-rectangle-1603813941220.png%3Fgeneration%3D1603813941884466%26alt%3Dmedia" alt="">
      </div>

      <div class="col-span-3 flex px-16 text-shopware items-center justify-start gap-10 font-light">
        <div><router-link to="/app">Apps</router-link></div>
        <div><router-link to="/admin/guide">Themes</router-link></div>
        <div><router-link to="#">Custom Frontends</router-link></div>
        <div class="font-bold"><router-link to="/">Integrations</router-link></div>
      </div>

      <div class="w-72 flex px-6 items-center text-slate-200 text-sm border-l border-slate-600">
        <SearchBox />
        <DarkModeToggle />
      </div>
    </div>

  </header>
</template>

<script>
import SearchBox from '@SearchBox'
import DarkModeToggle from './DarkModeToggle'

export default {
  name: 'Header',

  components: {
    SearchBox,
    DarkModeToggle
  }
}
</script>

<style>
.search-box {
  @apply w-full;
}

.search-box input {
  @apply w-full;
}
</style>