import {transformRelativeRoute} from "../../src/shopware/utils/sidebar";

const notTransformable = [
    '//domain.com/',
    'http://domain.com/',
    'https://domain.com/',
];

const transformable = [
    '/foo',
    '/foo.html',
    '/foo/bar',
    '/foo/bar.html',
];

const prependToTransformable = (prefix: string) => transformable.map(url => `${prefix}${url}`)

describe('transforms relative route', async () => {
    test('starting with / or schema', async () => {
        const currentRoute = {path: '/', data: {}, component: ''};

        const notTransformed = [
            ...transformable,
            ...notTransformable,
        ];

        for (const url of notTransformed) {
            expect(transformRelativeRoute(currentRoute, url)).to.equal(url);
        }
    })

    test('./ from /foo', async () => {
        const currentRoute = {path: '/foo', data: {}, component: ''};

        for (const url of prependToTransformable('.')) {
            expect(transformRelativeRoute(currentRoute, url)).to.equal(url.substring(1));
        }
    })

    test('./ from /foo/', async () => {
        const currentRoute = {path: '/foo/', data: {}, component: ''};

        for (const url of prependToTransformable('.')) {
            expect(transformRelativeRoute(currentRoute, url)).to.equal(`/foo${url.substring(1)}`);
        }
    })

    test('../ from /foo/', async () => {
        const currentRoute = {path: '/foo/', data: {}, component: ''};

        for (const url of prependToTransformable('..')) {
            expect(transformRelativeRoute(currentRoute, url)).to.equal(url.substring(2));
        }
    })

    test('../ from /foo/bar', async () => {
        const currentRoute = {path: '/foo/bar', data: {}, component: ''};

        for (const url of prependToTransformable('..')) {
            expect(transformRelativeRoute(currentRoute, url)).to.equal(url.substring(2));
        }
    })

    test('../ from /foo/bar/', async () => {
        const currentRoute = {path: '/foo/bar/', data: {}, component: ''};

        for (const url of prependToTransformable('..')) {
            expect(transformRelativeRoute(currentRoute, url)).to.equal(`/foo${url.substring(2)}`);
        }
    })

    test('../../ from /foo/bar/', async () => {
        const currentRoute = {path: '/foo/bar/', data: {}, component: ''};

        for (const url of prependToTransformable('../..')) {
            expect(transformRelativeRoute(currentRoute, url)).to.equal(url.substring(5));
        }
    })

    test('../../ from /foo/bar/baz', async () => {
        const currentRoute = {path: '/foo/bar/baz', data: {}, component: ''};

        for (const url of prependToTransformable('../..')) {
            expect(transformRelativeRoute(currentRoute, url)).to.equal(url.substring(5));
        }
    })

    test('../../ from /foo/bar/baz/', async () => {
        const currentRoute = {path: '/foo/bar/baz/', data: {}, component: ''};

        for (const url of prependToTransformable('../..')) {
            expect(transformRelativeRoute(currentRoute, url)).to.equal(`/foo${url.substring(5)}`);
        }
    })
})