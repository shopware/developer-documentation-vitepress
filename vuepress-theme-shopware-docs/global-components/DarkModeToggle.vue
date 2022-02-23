<template>
  <div class="cursor-pointer" @click="toggleDarkMode()">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" v-if="isDarkMode">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#189eff" v-else>
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'DarkModeToggle',

  data: function () {
    return {
      isDarkMode: false
    }
  },
  
  mounted: function () {
    this.isDarkMode = window.localStorage.getItem('theme') === 'dark' || (window.matchMedia('(prefers-color-scheme: dark)').matches && window.localStorage.getItem('theme') !== 'light');
  },

  watch: {
    isDarkMode: function (isDarkMode) {
      if(isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  },

  methods: {
    toggleDarkMode: function () {
      if (!this.isDarkMode) {
        localStorage.setItem('theme' , 'dark');
      } else {
        localStorage.setItem('theme' , 'light');
      }

      this.isDarkMode = !this.isDarkMode;
    }
  }
}
</script>