export const resourcesMenu = {
    text: "Resources",
    activeMatch: `^/(api)`,
    items: [
        {
            text: "HTTP APIs",
            items: [
                {
                    text: "Store API",
                    // link: "/resources/api/store-api-reference",
                    link: 'https://shopware.stoplight.io/docs/store-api/',
                    repo: 'shopware/store-api-reference',
                },
                {
                    text: "Admin API",
                    //link: "/resources/api/admin-api-reference",
                    link: 'https://shopware.stoplight.io/docs/admin-api/',
                    repo: 'shopware/admin-api-reference',
                }
            ]
        },
        {
            text: "Administration",
            items: [
                {
                    text: "Admin Extension SDK",
                    // link: "/resources/admin-extension-sdk/",
                    link: 'https://shopware.github.io/admin-extension-sdk/',
                    repo: 'shopware/admin-extension-sdk',
                },
                {
                    text: "Component Library",
                    // link: "/resources/meteor-component-library/",
                    link: 'https://shopware.github.io/meteor-component-library/',
                    repo: 'shopware/meteor-component-library',
                }
            ]
        },
        {
            text:"Design",
            items: [
                {
                    text: "Meteor Icon Kit",
                    //link: "/resources/meteor-icon-kit/",
                    link: 'https://shopware.github.io/meteor-icon-kit/',
                    repo: 'shopware/meteor-icon-kit',
                },
                {
                    text: "shopware.design",
                    //link: "/resources/meteor-icon-kit/",
                    link: 'https://shopware.design/beta/',
                },
            ]
        },
        {
            text: "Learning",
            items: [
                {
                    text: "End-user Guide",
                    link: "https://docs.shopware.com/",
                },
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
};