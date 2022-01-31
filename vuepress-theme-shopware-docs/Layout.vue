<template>
  <div class="min-h-screen flex flex-col">
    <header
      class="w-full h-20 bg-shopware-gray-dark flex justify-center drop-shadow drop-shadow-lg"
    >
      <div class="w-full flex justify-between md:max-w-screen-2xl">
        <div class="w-72 flex px-6 items-center border-r border-slate-600">
          <img
            class="h-10"
            src="https://www.gitbook.com/cdn-cgi/image/height=40,fit=contain,dpr=2,format=auto/https%3A%2F%2F1272924779-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-28427.appspot.com%2Fo%2Fspaces%252F-MK3m-IGvXbMka6Y6_g7%252Favatar-rectangle-1603813941220.png%3Fgeneration%3D1603813941884466%26alt%3Dmedia"
            alt=""
          />
        </div>
        <div class="w-56 flex items-center text-slate-200 text-sm">
          <SearchBox />
        </div>
      </div>
    </header>

    <div class="w-full flex flex-1 justify-center bg-shopware-gray-light">
      <div class="w-full md:max-w-screen-2xl flex">
        <nav>
          <div class="w-72 flex-none border-r border-slate-300 pl-5 text-sm">
            <ul class="sw-navigation list-none text-shopware">
              <a href="/">
                <li>Home</li>
              </a>
              <a v-for="item in sidebar" :key="item.key" :href="item.path">
                <li v-bind:class="{ active: $page.regularPath === item.path }">
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

        <main class="flex">
          <div class="flex flex-grow bg-white px-16 py-6">
            <Content />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBox from "@SearchBox";
export default {
  name: "Layout",
  components: { SearchBox },
  data: () => {
    return {
      sidebar: [],
      page: null,
    };
  },
  mounted: function (ctx) {
    console.error("config", this.$site);
    this.sidebar = this.$site.themeConfig?.sidebar["/"];
    this.page = this.$page;
  },
};
</script>
