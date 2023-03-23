import {computed} from "vue";

export const withBase = () => {
}

export const useData = () => {
    return {
        page: computed(() => ({
            relativePath: 'my/route.md',
        }))
    };
}

export const useRoute = () => ({
    path: '/my/route.html'
})

export const useRouter = () => ({})

