<style lang="scss">
.SwagFooter {
  color: var(--sw-c-gray-500);
  font-weight: 400;
  --bottom-bg: #101d29;
  --bottom-bg--light: var(--sw-c-gray-dark-500);
  .dark & {
    --bottom-bg: var(--sw-c-gray-dark-700);
    --bottom-bg--light: var(--sw-c-gray-dark-500);
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
    font-size: 15px;
    &:hover {
      @apply text-white;
    }
  }

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

    a {
      @apply text-xs;
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
    //grid-template-columns: 1fr;
    @media screen and (min-width: 768px) {
      grid-template-columns: repeat(auto-fit, minmax(72px, 1fr));
      > div {
        grid-column: span 2;
        &:last-child {
          grid-column: span 3;
        }
      }
    }
  }

  .container {
    max-width: 1600px;
    margin: 0 auto;
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

.VPSocialLinks,
.SwagFooter_links {
  @apply mt-12;
  svg {
    width: 1rem;
    fill: var(--c-text);
  }
}

.SwagFooter_links {
  svg {
    fill: #fff;
  }
}

@media (min-width: 960px) {
  .VPContent.has-sidebar + .SwagFooter,
  .VPContent.has-sidebar + * + .SwagFooter {
    padding-left: var(--vp-sidebar-width);
  }
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
                <a href="tel:0080074676260">00 800 746 7626 0</a>
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
          <div>
            <span class="SwagFooter_heading">Newsletter</span>
            <SwagNewsletter />
          </div>
        </div>

        <VPNavBarSocialLinks class="SwagFooter_links"/>
      </div>
    </div>
    <div class="SwagFooter_second grid gap-6">

      <div class="text-center font-light text-xs">Copyright © shopware AG - All rights reserved</div>

      <ul class="flex gap-6 justify-center text-sm">
        <li>
          <a href="https://www.shopware.com/en/gtc/" target="_blank">Terms &amp; Conditions</a>
        </li>
        <li>
          <a href="https://www.shopware.com/en/privacy/" target="_blank">Privacy policy</a>
        </li>
        <li>
          <a href="https://www.shopware.com/en/legal-notice/" target="_blank">Legal notice</a>
        </li>
        <li>
          <a href="#" @click.prevent="openUserCentrics">Cookie settings</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
import VPNavBarSocialLinks from "@node_modules/vitepress/dist/client/theme-default/components/VPNavBarSocialLinks.vue";
import {useData, useRoute} from "vitepress";
import SwagNewsletter from "./SwagNewsletter.vue";

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

const openUserCentrics = () => UC_UI.showSecondLayer();

const footers = [
  {
    title: 'Product',
    items: [
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
      {
        title: 'Extensions',
        url: "/docs/guides/plugins/"
      },
      {
        title: 'Headless Storefront',
        url: "https://frontends.shopware.com/"
      },
    ]
  },
  {
    title: 'Resources',
    items: [
      {
        title: 'User Documentation',
        url: "https://docs.shopware.com/en"
      },
      {
        title: 'Design Documentation',
        url: "https://brand.shopware.com/"
      },
      {
        title: 'E-commerce knowledge',
        url : "https://www.shopware.com/en/ecom-knowledge/"
      },
      {
        title: 'Jump into development',
        url: "https://www.shopware.com/en/community/developers/"
      },
      {
        title: 'Training & Certification',
        url: "https://www.shopware.com/en/academy/"
      },
    ]
  },
  {
    title: 'Community',
    items: [
      {
        title: 'Forum',
        url: "https://forum.shopware.com/?_gl=1*82v1ve*_ga*MTYwMjc5NTkyNC4xNjY1NzI1MjEw*_ga_9JLJ6GGB76*MTY4NTYwMDc3MS4xMjAuMS4xNjg1NjAxODU5LjAuMC4w"
      },
      {
        title: 'Community Day',
        url: "https://scd.shopware.com/en-US/"
      },
      {
        title: 'Stack Overflow',
        url: "https://stackoverflow.com/"
      },
      {
        title: 'Feedback & Issues',
        url: "https://issues.shopware.com/?_gl=1*pgdzzx*_ga*MTYwMjc5NTkyNC4xNjY1NzI1MjEw*_ga_9JLJ6GGB76*MTY4NTYwMDc3MS4xMjAuMS4xNjg1NjAxODYyLjAuMC4w"
      },
    ]
  },
  {
    title: 'GitHub Channels',
    items: [
      {
        title: 'Shopware 5',
        url: "https://github.com/shopware5/shopware/"
      },
      {
        title: 'Shopware 6',
        url: "https://github.com/shopware/platform/"
      },
      {
        title: 'Development Template',
        url: "https://developer.shopware.com/docs/guides/installation/template.html"
      },
      {
        title: 'Contribute to the docs',
        url: "https://github.com/shopware/docs"
      },
      {
        title: 'Contribute to platform',
        url: "https://github.com/shopware/platform/blob/trunk/CONTRIBUTING.md"
      },
    ]
  },
  {
    title: 'News & Updates',
    items: [
      {
        title: 'Blog',
        url: "https://www.shopware.com/en/news/developer-insights/"
      },
      {
        title: 'Shopware TV',
        url: "https://tv.shopware.com/en/?_gl=1%2a1gq0fmi%2a_ga%2aMTYwMjc5NTkyNC4xNjY1NzI1MjEw%2a_ga_9JLJ6GGB76%2aMTY4NTYwMDc3MS4xMjAuMS4xNjg1NjAyMzI5LjAuMC4w"
      },
      {
        title: 'Announcements',
        url: "https://www.shopware.com/en/press/press-releases/"
      },
      {
        title: 'Product Changelog',
        url: "https://www.shopware.com/en/changelog/"
      },

    ]
  }
];
</script>
