import { SidebarGroup } from "vitepress-shopware-docs/src/vitepress/config";

const apps: SidebarGroup[] = [
      {
        text: 'APP DEVELOPMENT',
        items: [
          { 
            text: 'Home',
            link: '/apps/'
          },
          {
            text: 'Getting started',
            link: '/apps/apps'
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
            text: 'Admin Extension API',
            link: '/setup'
          },
          {
            text: 'App Scripts',
            link: '/maintenance'
          },
          {
            text: 'Webhooks',
            link: '/maintenance'
          },
          {
            text: 'Admin API',
            link: '/maintenance'
          },
          {
            text: 'Store API',
            link: '/maintenance'
          }
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