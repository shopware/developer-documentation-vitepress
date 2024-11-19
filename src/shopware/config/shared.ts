export const resourcesMenu = ({ design, developer } = { design: 'https://shopware.design/', developer: 'https://developer.shopware.com/' }) => ({
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
            text: "Meteor",
            items: [
                {
                    text: "Meteor Admin SDK",
                    // link: "/resources/admin-extension-sdk/",
                    link: 'https://shopware.github.io/admin-extension-sdk/',
                    repo: 'shopware/meteor',
                },
                {
                    text: "Meteor Component Library",
                    // link: "/resources/meteor-component-library/",
                    link: 'https://shopware.github.io/meteor-component-library/',
                    repo: 'shopware/meteor',
                },
                {
                    text: "Meteor Icon Kit",
                    //link: "/resources/meteor-icon-kit/",
                    link: `${developer}resources/meteor-icon-kit/`,
                    repo: 'shopware/meteor',
                },
            ]
        },
        {
            text:"Design",
            items: [
                {
                    text: "shopware.design",
                    link: design,
                },
            ]
        },
        {
            text: "Releases",
            items: [
                {
                    text: "Release notes",
                    link: `${developer}release-notes/`,
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
});