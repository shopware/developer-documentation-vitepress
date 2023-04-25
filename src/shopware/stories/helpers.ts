import Mock from "./Mock.vue";

export const getComponentName = (Component) => Component.__name || Component.__file.split('/').reverse()[0].replace('.vue', '');
export const template = (Component, slot?: string, unstyled?: boolean) => {
    const componentName = getComponentName(Component);

    const beforeUnstyled = unstyled
        ? '<div class="unstyled">'
        : '';
    const afterUnstyled = unstyled
        ? '</div>'
        : '';

    if (slot) {
        return `<Mock class="vp-doc" :options="mockOptions">${beforeUnstyled}<${componentName} v-bind="args">${slot}</${componentName}>${afterUnstyled}</Mock>`;
    }

    return `<Mock class="vp-doc" :options="mockOptions">${beforeUnstyled}<div class="unstyled"><${componentName} v-bind="args" />${afterUnstyled}</Mock>`;
}

export const render = (Component, config: {
    components?: object,
    mockOptions?: object,
    template?: string,
    slot?: string,
    unstyled?: boolean
} = {}) => {
    return (args: any) => ({
        components: {
            Mock,
            [getComponentName(Component)]: Component,
            ...(config.components || {})
        },
        setup() {
            const {mockOptions, ...rest} = args;
            return {
                args: rest,
                mockOptions: mockOptions || {}
            }
        },
        template: config.template || template(Component, config.slot, config.unstyled)
    })
}

export const DarkVariation = (data?: object) => ({
    args: {
        ...(data?.args || {}),
        mockOptions: {
            theme: 'dark',
        }
    }
})