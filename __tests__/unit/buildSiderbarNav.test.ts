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
        expect(stringified).to.equal(
            "{\n" +
            "  \"/foo/\": [\n" +
            "    {\n" +
            "      \"link\": \"/foo/\",\n" +
            "      \"text\": \"Foo\",\n" +
            "      \"items\": [\n" +
            "        {\n" +
            "          \"link\": \"/foo/bar-With-small_API-custom-with-nav-heading.html\",\n" +
            "          \"text\": \"Custom title\",\n" +
            "          \"items\": []\n" +
            "        },\n" +
            "        {\n" +
            "          \"link\": \"/foo/bar-With-small_API-custom.html\",\n" +
            "          \"text\": \"Custom title\",\n" +
            "          \"items\": []\n" +
            "        },\n" +
            "        {\n" +
            "          \"link\": \"/foo/bar-With-small_API.html\",\n" +
            "          \"text\": \"Bar With small API\",\n" +
            "          \"items\": []\n" +
            "        },\n" +
            "        {\n" +
            "          \"link\": \"/foo/bar3.html\",\n" +
            "          \"text\": \"Bar3\",\n" +
            "          \"items\": []\n" +
            "        },\n" +
            "        {\n" +
            "          \"link\": \"/foo/foo4.html\",\n" +
            "          \"text\": \"Foo4\",\n" +
            "          \"items\": []\n" +
            "        }\n" +
            "      ]\n" +
            "    },\n" +
            "    {\n" +
            "      \"link\": \"/foo/bar/\",\n" +
            "      \"text\": \"Bar\",\n" +
            "      \"items\": [\n" +
            "        {\n" +
            "          \"text\": \"Bar1 custom title\",\n" +
            "          \"link\": \"/foo/bar/bar1-custom-both.html\",\n" +
            "          \"items\": []\n" +
            "        },\n" +
            "        {\n" +
            "          \"text\": \"Bar1 custom heading\",\n" +
            "          \"link\": \"/foo/bar/bar1-custom-heading.html\",\n" +
            "          \"items\": []\n" +
            "        },\n" +
            "        {\n" +
            "          \"text\": \"Bar1 custom title\",\n" +
            "          \"link\": \"/foo/bar/bar1-custom-title.html\",\n" +
            "          \"items\": []\n" +
            "        },\n" +
            "        {\n" +
            "          \"text\": \"Bar1\",\n" +
            "          \"link\": \"/foo/bar/bar1.html\",\n" +
            "          \"items\": []\n" +
            "        },\n" +
            "        {\n" +
            "          \"text\": \"Foo2\",\n" +
            "          \"link\": \"/foo/bar/foo2.html\",\n" +
            "          \"items\": []\n" +
            "        }\n" +
            "      ]\n" +
            "    },\n" +
            "    {\n" +
            "      \"link\": \"#\",\n" +
            "      \"text\": \"No index\",\n" +
            "      \"items\": [\n" +
            "        {\n" +
            "          \"text\": \"File\",\n" +
            "          \"link\": \"/foo/no-index/file.html\",\n" +
            "          \"items\": []\n" +
            "        }\n" +
            "      ]\n" +
            "    }\n" +
            "  ]\n" +
            "}"
        );
    })
})