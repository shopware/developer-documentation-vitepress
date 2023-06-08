<style lang="scss">
.SwagFooter {
  color: var(--sw-c-gray-500);
  font-weight: 400;

  &_first {
    @apply grid gap-8 pt-24 pb-12;
    background-color: var(--sw-c-blue-midnight);
    background-color: #142332;

    .dark & {
      background-color: var(--sw-c-gray-dark-800);
    }
  }

  &_second {
    @apply py-8;
    background-color: #101d29;

    .dark & {
      background-color: var(--sw-c-gray-dark-700);
    }
  }

  &_logo {
    height: 2rem;
  }

  &_heading {
    color: white;
    @apply text-lg mb-4 flex;
    font-weight: 600;
  }

  &_icons {
    @apply flex justify-end gap-4;
  }

  &_columns {
    @apply grid gap-8;
    grid-template-columns: 280px repeat(auto-fit, minmax(160px, 1fr));
    /*> :first-child {
      grid-column: span 2;
    }*/
  }

  &_links .VPSocialLink {
    color: inherit;
  }

  .container {
    max-width: 1440px;
    margin: 0 auto;
    padding-left: 2rem;
    padding-right: 2rem;
  }

  ul {
    list-style-type: none;
    @apply m-0 p-0;
    li {
      @apply mb-2;
    }
  }

  a {
    @apply transition-all;
    &:hover {
      @apply text-white;
    }
  }
}

.VPContent.has-sidebar + .SwagFooter,
.VPContent.has-sidebar + * + .SwagFooter {
  padding-left: var(--vp-sidebar-width);
}
</style>

<template>
  <div class="SwagFooter">
    <div class="SwagFooter_first">
      <div class="container">
        <div class="SwagFooter_columns">
          <div>
            <span class="SwagFooter_heading">
              <img src="../assets/shopware-logo.svg" class="SwagFooter_logo"/>
            </span>

            <ul>
              <li>
                <a href="mailto:info@shopware.com">info@shopware.com</a>
              </li>
              <li>
                <a href="tel:0080074676260">Worldwide: 00 800 746 7626 0</a>
              </li>
            </ul>
          </div>
          <div v-for="section in footers">
            <span class="SwagFooter_heading">{{ section.title }}</span>
            <ul>
              <li v-for="item in section.items">
                <a :href="item.url || '#'" v-bind="itemProps(item)">{{ item.title }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="SwagFooter_second grid gap-4">

      <VPNavBarSocialLinks class="SwagFooter_links"/>

      <ul class="flex gap-6 justify-center text-sm">
        <li>
          <a href="#">Terms &amp; Conditions</a>
        </li>
        <li>
          <a href="#">Privacy policy</a>
        </li>
        <li>
          <a href="#">Legal notice</a>
        </li>
        <li>
          <a href="#">Cookie settings</a>
        </li>
      </ul>
      <div class="text-center font-extralight text-xs">Copyright © shopware AG - All rights reserved</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import VPNavBarSocialLinks from "@node_modules/vitepress/dist/client/theme-default/components/VPNavBarSocialLinks.vue";
import {useData, useRoute} from "vitepress";

const {theme} = useData();
const route = useRoute();

const itemProps = (item) => {
  if (!(item.url?.startsWith('http://') || item.url?.startsWith('https://'))) {
    return {};
  }

  return {
    target: '_blank',
    rel: 'nofollow noopener noreferrer',
  };
}

const footers = [
  {
    title: 'Product',
    items: [
      {
        title: 'Extensions',
        url: "/docs/guides/plugins/"
      },
      {
        title: 'Headless Storefront',
        url: "https://frontends.shopware.com/"
      },
      {
        title: 'APIs',
        url: "/docs/guides/integrations-api"
      },
      {
        title: 'SDKs',
        url: "https://shopware.github.io/admin-extension-sdk/"
      },
      {
        title: 'B2B Suite',
        url: "/docs/products/extensions/b2b-suite/"
      },
    ]
  },
  {
    title: 'Resources',
    items: [
      {
        title: 'E-commerce knowledge',
        url : "https://www.shopware.com/en/ecom-knowledge/"
      },
      {
        title: 'Training & Certification',
        url: "https://www.shopware.com/en/academy/"
      },
      {
        title: 'User Documentation',
        url: "https://docs.shopware.com/en"
      },
      {
        title: 'Design Documentation',
        url: "https://shopware.design/beta/"
      },
      {
        title: 'Get started as developer',
        url: "https://www.shopware.com/en/community/developers/"
      },
    ]
  },
  {
    title: 'Community',
    items: [
      {
        title: 'Community Day',
        url: "https://scd.shopware.com/en-US/en-US"
      },
      {
        title: 'Forum',
        url: "https://forum.shopware.com/?_gl=1*82v1ve*_ga*MTYwMjc5NTkyNC4xNjY1NzI1MjEw*_ga_9JLJ6GGB76*MTY4NTYwMDc3MS4xMjAuMS4xNjg1NjAxODU5LjAuMC4w"
      },
      {
        title: 'Feedback & Issues',
        url: "https://issues.shopware.com/?_gl=1*pgdzzx*_ga*MTYwMjc5NTkyNC4xNjY1NzI1MjEw*_ga_9JLJ6GGB76*MTY4NTYwMDc3MS4xMjAuMS4xNjg1NjAxODYyLjAuMC4w"
      },
      {
        title: 'StackOverflow',
        url: "https://stackoverflow.com/"
      },
    ]
  },
  {
    title: 'GitHub Channels',
    items: [
      {
        title: 'Development Template',
        url: "https://github.com/shopware/development/"
      },
      {
        title: 'Shopware 5',
        url: "https://github.com/shopware/shopware/"
      },
      {
        title: 'Shopware 6',
        url: "https://github.com/shopware/platform/"
      },
      {
        title: 'Contribute to platform',
        url: "https://github.com/shopware/platform/blob/trunk/CONTRIBUTING.md"
      },
      {
        title: 'Contribute to docs',
        url: "https://github.com/shopware/docs"
      },

    ]
  },
  {
    title: 'News & Updates',
    items: [
      {
        title: 'Product Changelog',
        url: "https://www.shopware.com/en/changelog/"
      },
      {
        title: 'Blog',
        url: "https://www.shopware.com/en/news/developer-insights/"
      },
      {
        title: 'Announcements',
        url: "https://www.shopware.com/en/press/press-releases/"
      },
      {
        title: 'Shopware TV',
        url: "https://tv.shopware.com/en/?_gl=1%2a1gq0fmi%2a_ga%2aMTYwMjc5NTkyNC4xNjY1NzI1MjEw%2a_ga_9JLJ6GGB76%2aMTY4NTYwMDc3MS4xMjAuMS4xNjg1NjAyMzI5LjAuMC4w"
      },
    ]
  }
];
</script>
