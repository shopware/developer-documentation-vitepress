<template>
  <div>

    <Header />

    <div class="w-full pt-20 flex justify-center bg-shopware-gray-light">
      
      <div class="w-full md:max-w-screen-2xl flex">

        <nav class="fixed">

          <div class="w-72 flex-none border-r border-slate-300 pl-5 text-sm">
            
              <Navigation :sidebar="sidebar" />

          </div>
        
        </nav>

        <main>

          <div class="grow bg-white ml-72 px-16 py-6">
            
            <div class="relative bg-white py-16 sm:py-16 lg:py-16">
              <div class="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
                <p class="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                  Build Apps with Shopware
                </p>
                <p class="mt-5 max-w-prose mx-auto text-xl text-gray-500">
                  Shopware offers powerful extension development tools to help you build your own Shopware apps.
                </p>
                <div class="mt-12">
                  <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    <div class="pt-6">
                      <div class="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                        <div class="-mt-6">
                          <div>
                            <span class="inline-flex items-center justify-center p-3 bg-shopware rounded-md shadow-lg">
                              <!-- Heroicon name: outline/cloud-upload -->
                              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                              </svg>
                            </span>
                          </div>
                          <h3 class="mt-8 text-lg font-medium text-gray-900 tracking-tight">Fully compatible</h3>
                          <p class="mt-5 text-base text-gray-500">
                            Apps can be installed on any runtime, cloud and on-premise.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div class="pt-6">
                      <div class="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                        <div class="-mt-6">
                          <div>
                            <span class="inline-flex items-center justify-center p-3 bg-shopware rounded-md shadow-lg">
                              <!-- Heroicon name: outline/lock-closed -->
                              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                              </svg>
                            </span>
                          </div>
                          <h3 class="mt-8 text-lg font-medium text-gray-900 tracking-tight">Setup in minutes</h3>
                          <p class="mt-5 text-base text-gray-500">
                            Just start from one of our boilerplates and you're ready to go.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div class="pt-6">
                      <div class="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                        <div class="-mt-6">
                          <div>
                            <span class="inline-flex items-center justify-center p-3 bg-shopware rounded-md shadow-lg">
                              <!-- Heroicon name: outline/refresh -->
                              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                              </svg>
                            </span>
                          </div>
                          <h3 class="mt-8 text-lg font-medium text-gray-900 tracking-tight">A vibrant community</h3>
                          <p class="mt-5 text-base text-gray-500">
                            Share your ideas, ask questions and get help from our community.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div class="pt-6">
                      <div class="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                        <div class="-mt-6">
                          <div>
                            <span class="inline-flex items-center justify-center p-3 bg-shopware rounded-md shadow-lg">
                              <!-- Heroicon name: outline/shield-check -->
                              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                              </svg>
                            </span>
                          </div>
                          <h3 class="mt-8 text-lg font-medium text-gray-900 tracking-tight">App Store</h3>
                          <p class="mt-5 text-base text-gray-500">
                            Make your app available for merchants worldwide.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div class="pt-6">
                      <div class="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                        <div class="-mt-6">
                          <div>
                            <span class="inline-flex items-center justify-center p-3 bg-shopware rounded-md shadow-lg">
                              <!-- Heroicon name: outline/cog -->
                              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            </span>
                          </div>
                          <h3 class="mt-8 text-lg font-medium text-gray-900 tracking-tight">Headless</h3>
                          <p class="mt-5 text-base text-gray-500">
                            Choose whatever technology suits your needs and requirements.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div class="pt-6">
                      <div class="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                        <div class="-mt-6">
                          <div>
                            <span class="inline-flex items-center justify-center p-3 bg-shopware rounded-md shadow-lg">
                              <!-- Heroicon name: outline/server -->
                              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                              </svg>
                            </span>
                          </div>
                          <h3 class="mt-8 text-lg font-medium text-gray-900 tracking-tight">Powerful</h3>
                          <p class="mt-5 text-base text-gray-500">
                            Extend APIs, exchange data or manipulate the cart calculation.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </main>

      </div>

    </div>

  </div>
</template>


<script>
import SearchBox from '@SearchBox'
import Header from './global-components/Header';
import Navigation from './global-components/Navigation';

export default {
  name: 'Layout',

  components: { Header, Navigation, SearchBox },

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
  @apply border border-shopware-gray-light px-4 py-2 font-medium;
}

.sw-navigation li.active {
  @apply border-r-0 border-slate-300 bg-white text-shopware;
}

.sw-navigation li:hover {
  @apply border-slate-200 bg-slate-200;
}

.sw-navigation li.active:hover {
  @apply bg-white;
}

</style>

