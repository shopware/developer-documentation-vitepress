import { SidebarGroup } from "../../../src/vitepress/config";

const apps: SidebarGroup[] = [
      {
        text: '',
        items: [
          { 
            text: 'Frontends',
            link: '/frontends/'
          },
          { 
            text: 'Best Practices',
            link: '/frontends/best-practices/'
          }
        ]
      },
      {
        text: 'STORE API',
        items: [
          {
            text: 'Authentication',
            link: '/frontends/store-api/authentication/'
          },
          {
            text: 'Login & Registration',
            link: '/frontends/store-api/login-registration/'
          },
          {
            text: 'Navigation',
            link: '/frontends/store-api/navigation/'
          },
          {
            text: 'Product',
            link: '/frontends/store-api/product/'
          },
          {
            text: 'Cart',
            link: '/frontends/store-api/cart/'
          },
          {
            text: 'Checkout',
            link: '/frontends/store-api/checkout/'
          },
          {
            text: 'Payment',
            link: '/frontends/store-api/payment/'
          }
        ]
      },
      {
        text: 'FRONTENDS',
        items: [
          {
            text: 'Overview',
            link: '/frontends/'
          },
          {
            text: 'Setup',
            link: '/frontends/setup/'
          },
          {
            text: 'Customization',
            link: '/frontends/customization/'
          },
          {
            text: 'Examples',
            link: '/frontends/examples/'
          }
        ]
      }
    ];

export default apps;