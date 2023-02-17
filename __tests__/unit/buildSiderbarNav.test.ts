import {buildSidebarNav} from "../../src/core/composables/Sidebar";
import {expect} from "vitest";

describe('builds sidebar', async () => {
    test('empty', async () => {
        const {sidebar, nav} = buildSidebarNav('', [], []);

        expect(Object.keys(sidebar).length).to.equal(0);

        expect(nav.length).to.equal(0);
    })

    test('sublinks', async () => {
        const {sidebar, nav} = buildSidebarNav('./__tests__/unit/for-sidebar/', [], ['/foo/']);

        expect(Object.keys(sidebar).length).to.equal(1);
        expect(Object.keys(sidebar)[0]).to.equal('/foo/');

        expect(nav.length).to.equal(0);
    })

    test('links', async () => {
        const {sidebar, nav} = buildSidebarNav('./__tests__/unit/for-sidebar/', [{link: '/foo/', text: 'Foo'}], []);

        expect(nav.length).to.equal(1);

        const stringified = JSON.stringify(sidebar, null, 2);
        expect(stringified).to.equal('{\n' +
            '  "/foo/": [\n' +
            '    {\n' +
            '      "link": "/foo/bar/",\n' +
            '      "text": "Bar",\n' +
            '      "items": [\n' +
            '        {\n' +
            '          "text": "Bar1",\n' +
            '          "link": "/foo/bar/bar1.html",\n' +
            '          "items": []\n' +
            '        },\n' +
            '        {\n' +
            '          "text": "Foo2",\n' +
            '          "link": "/foo/bar/foo2.html",\n' +
            '          "items": []\n' +
            '        }\n' +
            '      ]\n' +
            '    },\n' +
            '    {\n' +
            '      "link": "/foo/bar3.md",\n' +
            '      "text": "Bar3.md"\n' +
            '    },\n' +
            '    {\n' +
            '      "link": "/foo/foo4.md",\n' +
            '      "text": "Foo4.md"\n' +
            '    },\n' +
            '    {\n' +
            '      "link": "/foo/index.md",\n' +
            '      "text": "Index.md"\n' +
            '    }\n' +
            '  ]\n' +
            '}');
    })
})