import Mock from "./Mock.vue";

export const getComponentName = (Component) => Component.__name || Component.__file.split('/').reverse()[0].replace('.vue', '');
export const template = (Component, slot?: string) => {
    const componentName = getComponentName(Component);

    if (slot) {
        return `<Mock class="vt-doc" :options="mockOptions"><${componentName} v-bind="args">${slot}</${componentName}></Mock>`;
    }

    return `<Mock class="vt-doc" :options="mockOptions"><${componentName} v-bind="args" /></Mock>`;
}

export const render = (Component, config: {
    components?: object,
    mockOptions?: object,
    template?: string,
    slot?: string
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
        template: config.template || template(Component, config.slot)
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