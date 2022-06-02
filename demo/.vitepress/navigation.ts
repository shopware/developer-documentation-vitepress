import type { NavItem } from "../../src/vitepress/config";

const nav: NavItem[] = [
    {
      activeMatch: "^/apps/",
      text: "Apps",
      link: '/apps/'
    },
    {
      text: "Themes",
      link: "/themes",
    },
    {
      text: "Frontends",
      link: "/themes",
    },
    {
      text: "Integrations",
      link: "/themes",
    },
    {
      text: "Resources",
      activeMatch: `^/(api)`,
      items: [
        {
            text: "HTTP APIs",
            items: [
                {
                    text: "Store API",
                    link: "/resources/api/store-api-reference",
                },
                {
                    text: "Admin API",
                    link: "/resources/api/admin-api-reference",
                }
            ]
        },
        {
            text: "Administration",
            items: [
                {
                    text: "Admin Extension API",
                    link: "/resources/api/store-api-reference",
                },
                {
                    text: "Meteor Icon Kit",
                    link: "/resources/meteor-icon-kit",
                },
                {
                    text: "Component Library",
                    link: "/resources/meteor-icon-kit",
                }
            ]
        },
        {
            text: "Learning",
            items: [
                {
                    text: "Academy",
                    link: "https://academy.shopware.com/",
                },
                {
                  text: "YouTube",
                  link: "https://www.youtube.com/user/shopwareAG"
                }
            ]
        }
      ]
    },
  ];

export default nav;