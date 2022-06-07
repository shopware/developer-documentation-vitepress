import { SidebarGroup } from "../../../src/vitepress/config";

const apps: SidebarGroup[] = [
      {
        text: '',
        items: [
          { 
            text: 'Apps',
            link: '/apps/'
          },
          {
            text: 'Developer Sandboxes',
            link: '/apps/sandboxes/'
          },
          {
            text: 'Quick Start Guides',
            link: '/apps/starter-guides/'
          },
          {
            text: 'Headless',
            link: '/apps/headless/'
          }
        ]
      },
      {
        text: 'AREAS',
        items: [
          { 
            text: 'Checkout',
            link: '/apps/checkout/'
          },
          {
            text: 'Payment',
            link: '/apps/payment/'
          },
          {
            text: 'Storefront',
            link: '/maintenance'
          },
          {
            text: 'Flow Builder',
            link: '/maintenance'
          },
          {
            text: 'Custom Data',
            link: '/maintenance'
          },
          {
            text: 'Configuration',
            link: '/maintenance'
          },
          {
            text: 'Administration',
            link: '/maintenance'
          }
        ]
      },
      {
        text: 'REFERENCE',
        items: [
          { 
            text: 'Shopware CLI',
            link: '/setup'
          },
          {
            text: 'App Scripts',
            link: '/maintenance'
          },
          {
            text: 'Admin API',
            link: '/maintenance'
          },
          {
            text: 'Store API',
            link: 'https://shopware.stoplight.io/docs/store-api/YXBpOjgyNjU2MzM-shopware-store-api'
          },
          { 
            text: 'Admin Extension API',
            link: '/setup'
          },
          {
            text: 'Webhooks',
            link: '/maintenance'
          },
        ]
      },
      {
        text: 'APP STORE',
        items: [
          { 
            text: 'Publishing',
            link: '/setup'
          },
          {
            text: 'Guidelines',
            link: '/maintenance'
          }
        ]
      }
    ];

export default apps;