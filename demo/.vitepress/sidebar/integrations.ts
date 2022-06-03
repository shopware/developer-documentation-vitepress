import { SidebarGroup } from "../../../src/vitepress/config";

const apps: SidebarGroup[] = [
      {
        text: '',
        items: [
          { 
            text: 'Integrations',
            link: '/integrations/'
          }
        ]
      },
      {
        text: 'ADMIN API',
        items: [
          {
            text: 'Authentication',
            link: '/integrations/authentication/'
          },
          {
            text: 'General Concepts',
            link: '/integrations/general-concepts/'
          },
          {
            text: 'Reading Data',
            link: '/integrations/reading-data/'
          },
          {
            text: 'Writing Data',
            link: '/integrations/writing-data/'
          },
          {
            text: 'Processes',
            link: '/integrations/processes/'
          }
        ]
      },
      {
        text: 'GUIDES',
        items: [
          {
            text: 'Product Data',
            link: '/integrations/product-data/'
          },
          {
            text: 'Media Uploads',
            link: '/integrations/media-uploads/'
          },
          {
            text: 'Customers',
            link: '/integrations/customers/'
          },
          {
            text: 'Automation',
            link: '/integrations/automation/'
          }
        ]
      },
      {
        text: 'REFERENCE',
        items: [
          {
            text: 'Admin API',
            link: '/integrations/reference/admin-api/'
          }
        ]
      }
    ];

export default apps;