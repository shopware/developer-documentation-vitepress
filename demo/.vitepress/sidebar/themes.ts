import { SidebarGroup } from "../../../src/vitepress/config";
import {readSidebar} from "../../../src/core/composables/Sidebar";

const themes: SidebarGroup[] = readSidebar('themes', './demo/themes/');

/*const themes: SidebarGroup[] = [
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
    ];*/

export default themes;