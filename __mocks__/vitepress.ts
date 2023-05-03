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
                '/': {},
            },
            nav: [],
            swag: {}
        })),
    };
}

export const useRoute = () => ({
    path: '/my/route.html',
    data: {
        relativePath: 'my/route.md',
    }
})

export const useRouter = () => ({})

