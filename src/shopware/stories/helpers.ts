import Mock from "./Mock.vue";

export const getComponentName = (Component) => Component.__name || Component.__file.split('/').reverse()[0].replace('.vue', '');
export const template = (Component, slot) => {
    const componentName = getComponentName(Component);

    if (slot) {
        return `<Mock class="vt-doc"><${componentName} v-bind="args">${slot}</${componentName}></Mock>`;
    }

    return `<Mock class="vt-doc"><${componentName} v-bind="args" /></Mock>`;
}

export const render = (Component, config: { components?: object, template?: string, slot?: string } = {}) => {
    return (args: any) => ({
        components: {
            Mock,
            [getComponentName(Component)]: Component,
            ...(config.components || {})
        },
        setup() {
            return {args}
        },
        template: config.template || template(Component, config.slot)
    })
}