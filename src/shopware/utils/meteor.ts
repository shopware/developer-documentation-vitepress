export const meteorPublicPath = import.meta.env.MODE === 'development' && !('STORYBOOK' in import.meta.env)
    ? `${(new URL(import.meta.url)).pathname.replace('/vitepress-shopware-docs/src/shopware/components/SwagIcon.vue', '/')}@shopware-ag/meteor-icon-kit`
    : '';