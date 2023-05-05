import {computed} from 'vue'
import {useData} from "vitepress";
import {getEditLink} from "../composables/repos";

export function useEditLink() {
    const {theme, page} = useData()

    return computed(() => {
        const {text} = theme.value.editLink || {};
        const {relativePath} = page.value;
        const embeds = theme.value.swag?.embeds || [];
        const url = getEditLink({relativePath, embeds});

        return {url, text}
    })
}
