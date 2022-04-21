import type { NavItem } from "vitepress-shopware-docs/src/vitepress/config";

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
                    link: "/resources/admin-extension-api",
                },
                {
                    text: "Admin API",
                    link: "/resources/admin-extension-api",
                }
            ]
        },
        {
            text: "Administration",
            items: [
                {
                    text: "Admin Extension API",
                    link: "/resources/admin-extension-api",
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
        }
      ]
    },
  ];

export default nav;