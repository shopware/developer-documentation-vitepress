import { SidebarGroup } from "../../../src/vitepress/config";

const apps: SidebarGroup[] = [
      {
        text: '',
        items: [
          { 
            text: 'Themes',
            link: '/themes/'
          },
          {
            text: 'Create a Theme',
            link: '/themes/create-theme'
          }
        ]
      },
      {
        text: 'CONCENPTS',
        items: [
          {
            text: 'Configuration',
            link: '/themes/configuration/'
          },
          {
            text: 'Inheritance',
            link: '/themes/inheritance/'
          },
          {
            text: 'Styling',
            link: '/themes/styling/'
          },
          {
            text: 'Assets',
            link: '/themes/assets/'
          },
        ]
      },
      {
        text: 'REFERENCE',
        items: [
          {
            text: 'Twig Functions',
            link: '/themes/reference/twig-functions/'
          },
          {
            text: 'Data Loading',
            link: '/themes/reference/data-loading/'
          }
        ]
      },
      {
        text: 'THEME STORE',
        items: [
          {
            text: 'Publish your Theme',
            link: '/themes/publish/'
          },
          {
            text: 'Guidelines',
            link: '/themes/guidelines/'
          }
        ]
      }
    ];

export default apps;