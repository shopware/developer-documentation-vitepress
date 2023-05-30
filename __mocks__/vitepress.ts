import {computed} from "vue";

export const withBase = () => {
}

export const useData = () => {
    return {
        page: computed(() => ({
            relativePath: 'my/route.md',
        })),
        frontmatter: computed(() => ({})),
        theme: computed(() => ({
            editLink: {
                href: 'https://github.com/shopware/developer-portal/',
                text: 'Edit this page on GitHub'
            },
            sidebar: {
                '/': [
                    {
                        text: 'Root',
                        link: '/',
                        items: [
                            {
                                text: 'My',
                                link: '/my/',
                                items: [
                                    {
                                        text: 'Route',
                                        link: '/my/route.html',
                                        items: []
                                    }
                                ]
                            }
                        ]
                    }
                ],
                '/my/': [
                    {
                        text: 'My',
                        link: '/my/',
                        items: [
                            {
                                text: 'Route',
                                link: '/my/route.html',
                                items: [
                                    {
                                        text: 'Sub 1',
                                        link: '/my/route/sub-1.html',
                                        items: [],
                                    },
                                    {
                                        text: 'Sub 2',
                                        link: '/my/route/sub-2.html',
                                        items: [],
                                    },
                                    {
                                        text: 'Sub 3',
                                        link: '/my/route/sub-3.html',
                                        items: [],
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            nav: [],
            swag: {}
        })),
    };
}

const mockedRoutes = [{
    path: '/my/route.html',
    data: {
        relativePath: 'my/route.md',
    }
}];
export const useRoute = () => mockedRoutes[0]

export const mockRoute = (route) => mockedRoutes.unshift(route);
export const unmockRoute = () => mockedRoutes.shift()

export const useRouter = () => ({})

