import {computed} from "vue";

export const withBase = () => {
}

export const useData = () => {
    return {
        theme: computed(() => ({})),
    };
}

export const useRoute = () => ({
    path: ''
})