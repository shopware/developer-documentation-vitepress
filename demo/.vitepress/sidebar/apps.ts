import { SidebarGroup } from "../../../src/vitepress/config";

const apps: SidebarGroup[] = [
      {
        text: 'APP DEVELOPMENT',
        items: [
          { 
            text: 'Home',
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
            link: '/setup'
          },
          {
            text: 'Payment',
            link: '/maintenance'
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
            link: '/maintenance'
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