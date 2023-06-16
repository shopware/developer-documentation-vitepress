export const useExternalLink = ({target, page}: { page?: string, target?: string }) => {
    if (target !== '_blank' && !page?.startsWith('http://') && !page?.startsWith('https://')) {
        return {};
    }

    return {
        target: '_blank',
        rel: 'nofollow noopener noreferer'
    };
}