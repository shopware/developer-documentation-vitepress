import Mock from "./Mock.vue";
import {LoremIpsum} from "lorem-ipsum";
import seedrandom from "seedrandom";

export const getComponentName = (Component) => Component.__name || Component.__file.split('/').reverse()[0].replace('.vue', '');
export const template = (Component, slot?: string, unstyled?: boolean, rootClass?: string | null) => {
    const componentName = getComponentName(Component);

    const beforeUnstyled = unstyled
        ? '<div class="unstyled">'
        : '';
    const afterUnstyled = unstyled
        ? '</div>'
        : '';

    if (slot) {
        return `<Mock class="${rootClass}" :options="mockOptions">${beforeUnstyled}<${componentName} v-bind="args">${slot}</${componentName}>${afterUnstyled}</Mock>`;
    }

    return `<Mock class="${rootClass}" :options="mockOptions">${beforeUnstyled}<${componentName} v-bind="args" />${afterUnstyled}</Mock>`;
}

export const render = (Component, config: {
    components?: object,
    mockOptions?: object,
    template?: string,
    slot?: string,
    unstyled?: boolean,
    rootClass?: string | null
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
        template: config.template || template(Component, config.slot, config.unstyled, typeof config.rootClass === 'undefined' ? 'vp-doc' : config.rootClass)
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

export const HoverVariation = (data: object) => ({
    ...data,
    parameters: {
        ...(data.parameters || {}),
        pseudo: {hover: true},
    }
})

export enum LoremIpsumType {
    WORDS = 'Words',
    SENTENCES = 'Sentences',
    PARAGRAPHS = 'Paragraphs'
}

export const lorem = (type: LoremIpsumType = LoremIpsumType.WORDS, num: number | [number, number] = 5, config: {
    seed?: string | number,
    format?: 'plain' | 'html'
} = {}) => {
    const seed = `${config.seed}-${type}-${num}`;
    const seedRandom = seedrandom(seed);
    const lorem = new LoremIpsum({
        sentencesPerParagraph: {
            min: 3,
            max: 9,
        },
        wordsPerSentence: {
            min: 6,
            max: 18,
        },
        random: seedRandom,
    }, config.format || (type === LoremIpsumType.PARAGRAPHS ? 'html' : 'plain'));

    const finalNumber = typeof num === 'number'
        ? num
        : (new LoremIpsum({random: seedRandom})).generator.generateRandomInteger(num[0], num[1]);
    let generated = lorem[`generate${type}`](finalNumber);
    generated = generated[0].toUpperCase() + generated.slice(1);

    return generated;
}

export const loremWords = (num: number | [number, number] = 5, seed?: string | number) => lorem(LoremIpsumType.WORDS, num, {seed})
export const loremSentences = (num: number | [number, number] = 5, seed?: string | number) => lorem(LoremIpsumType.SENTENCES, num, {seed})
export const loremParagraphs = (num: number | [number, number] = 5, seed?: string | number, format: 'plain' | 'html' = 'html') => lorem(LoremIpsumType.PARAGRAPHS, num, {
    seed,
    format
})

export const swagLandingCards = (num: number) => Array.apply(null, Array(num))
    .map((u, i) => `<SwagLandingCard icon="activity"><template #title>${loremWords([3, 8], i)}</template><template #sub>${loremSentences([3, 5], i)}</template></SwagLandingCard>`)
    .join("")
