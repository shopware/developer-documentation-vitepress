<script setup lang="ts">
// import SearchBox from '@SearchBox'
// import DarkModeToggle from './DarkModeToggle'
import { toggleDark } from "~/composables";
const { t } = useI18n();

// export default {
//   name: 'Header',

//   components: {
//     // SearchBox,
//     // DarkModeToggle
//   }
// }
// <style>
// .search-box {
//   @apply w-full;
// }

// .search-box input {
//   @apply w-full;
// }
// </style>
</script>

<template>
  <header
    class="fixed w-full h-20 bg-shopware-gray-dark dark:bg-slate-900/60 flex justify-center drop-shadow-lg backdrop-blur-md z-20"
  >
    <div class="w-full md:max-w-screen-2xl mx-auto grid grid-cols-5">
      <router-link class="flex items-center justify-start" to="/">
        <img
          class="h-10"
          src="https://www.gitbook.com/cdn-cgi/image/height=40,fit=contain,dpr=2,format=auto/https%3A%2F%2F1272924779-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-28427.appspot.com%2Fo%2Fspaces%252F-MK3m-IGvXbMka6Y6_g7%252Favatar-rectangle-1603813941220.png%3Fgeneration%3D1603813941884466%26alt%3Dmedia"
          alt=""
        />
      </router-link>

      <div
        class="col-span-3 flex px-8 items-center justify-end gap-10 font-light text-md"
      >
        <div>
          <router-link class="text-black dark:text-white" to="/app"
            >Apps</router-link
          >
        </div>
        <div>
          <router-link class="text-black dark:text-white" to="/theme"
            >Themes</router-link
          >
        </div>
        <div>
          <router-link class="text-black dark:text-white" to="/frontend"
            >Frontends</router-link
          >
        </div>
        <div>
          <router-link class="text-black dark:text-white" to="/integration"
            >Integrations</router-link
          >
        </div>
      </div>

      <div
        class="w-72 flex px-6 items-center dark:text-slate-200 text-sm border-l border-slate-600"
      >
        <!-- <SearchBox /> -->
        <button
          class="icon-btn mx-2 !outline-none"
          :title="t('button.toggle_dark')"
          @click="toggleDark()"
        >
          <div i="carbon-sun dark:carbon-moon" />
        </button>
      </div>
    </div>
  </header>
</template>
