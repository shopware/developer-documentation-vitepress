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

</style>

<template>
  <div class="SwagFooter" v-if="route.path === '/'">
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
                <a :href="item.href || '#'">{{ item.title }}</a>
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
//import VPNavBarSocialLinks from "../../../node_modules/vitepress/dist/client/theme-default/components/VPNavBarSocialLinks.vue";
import {useData, useRoute} from "vitepress";

const {theme} = useData();
const route = useRoute();

const footers = [
  {
    title: 'Product',
    items: [
      {
        title: 'Product Tour',
      },
      {
        title: 'Shopware Cloud',
      },
      {
        title: 'Technologies',
      },
      {
        title: 'Roadmap',
      },
      {
        title: 'Migration',
      },
      {
        title: 'AI ecommerce',
      },
      {
        title: 'Spatial commerce',
      },
      {
        title: 'Guided Shopping',
      },
      {
        title: 'Flow Builder',
      },
      {
        title: 'Rule Builder',
      },
      {
        title: 'B2B Suite',
      },
      {
        title: 'Shopping Experiences',
      },
    ]
  },
  {
    title: 'Solutions',
    items: [
      {
        title: 'B2B',
      },
      {
        title: 'Omnichannel',
      },
      {
        title: 'Headless Commerce',
      },
      {
        title: 'Automation',
      },
      {
        title: 'Shopware Frontends',
      },
      {
        title: 'Fashion',
      },
      {
        title: 'Food',
      },
      {
        title: 'Interior',
      },
    ]
  },
  {
    title: 'Customers',
    items: [
      {
        title: 'Brands',
      },
      {
        title: 'Case Studies',
      },
      {
        title: 'Showcases',
      },
    ]
  },
  {
    title: 'Resources',
    items: [
      {
        title: 'Webinars',
      },
      {
        title: 'Webinars & livestreams'
      },
      {
        title: 'Forums',
      },
      {
        title: 'Documentation',
      },
      {
        title: 'Gartner',
      },
      {
        title: 'Forrester',
      },
      {
        title: 'Find an agency partner',
      },
      {
        title: 'Find a hosting partner',
      },
      {
        title: 'Become a partner',
      },
      {
        title: 'Ecommerce knowledge',
      },
      {
        title: 'How to',
      },
      {
        title: 'Voice of the customer: PhiAcademy',
      },
      {
        title: 'Shopware TV',
      },
    ]
  },
  {
    title: 'Community',
    items: [
      {
        title: 'Meetups',
      },
      {
        title: 'Fairs & converences',
      },
      {
        title: 'Community Day',
      },
      {
        title: 'Get started as developer',
      },
    ]
  }
];
</script>