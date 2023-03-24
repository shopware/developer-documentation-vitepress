import type {Meta, StoryObj} from '@storybook/vue3';

import CodeBlock from "./CodeBlock.vue";
import {render} from "../stories/helpers";

const code = '<div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre><code><span class="line"><span style="color: rgb(137, 221, 255);">&lt;!</span><span style="color: rgb(240, 113, 120);">doctype</span><span style="color: rgb(137, 221, 255);"> </span><span style="color: rgb(199, 146, 234);">html</span><span style="color: rgb(137, 221, 255);">&gt;</span></span>\n' +
    '<span class="line"><span style="color: rgb(137, 221, 255);">&lt;</span><span style="color: rgb(240, 113, 120);">html</span><span style="color: rgb(137, 221, 255);"> </span><span style="color: rgb(199, 146, 234);">lang</span><span style="color: rgb(137, 221, 255);">=</span><span style="color: rgb(137, 221, 255);">"</span><span style="color: rgb(195, 232, 141);">en</span><span style="color: rgb(137, 221, 255);">"</span><span style="color: rgb(137, 221, 255);">&gt;</span></span>\n' +
    '<span class="line"><span style="color: rgb(137, 221, 255);">&lt;</span><span style="color: rgb(240, 113, 120);">head</span><span style="color: rgb(137, 221, 255);">&gt;</span></span>\n' +
    '<span class="line"><span style="color: rgb(166, 172, 205);">    </span><span style="color: rgb(137, 221, 255);">&lt;</span><span style="color: rgb(240, 113, 120);">title</span><span style="color: rgb(137, 221, 255);">&gt;</span><span style="color: rgb(166, 172, 205);">My App</span><span style="color: rgb(137, 221, 255);">&lt;/</span><span style="color: rgb(240, 113, 120);">title</span><span style="color: rgb(137, 221, 255);">&gt;</span></span>\n' +
    '<span class="line"><span style="color: rgb(137, 221, 255);">&lt;/</span><span style="color: rgb(240, 113, 120);">head</span><span style="color: rgb(137, 221, 255);">&gt;</span></span>\n' +
    '<span class="line"><span style="color: rgb(137, 221, 255);">&lt;</span><span style="color: rgb(240, 113, 120);">body</span><span style="color: rgb(137, 221, 255);">&gt;</span></span>\n' +
    '<span class="line"><span style="color: rgb(166, 172, 205);">    Hello world!</span></span>\n' +
    '<span class="line"><span style="color: rgb(137, 221, 255);">&lt;/</span><span style="color: rgb(240, 113, 120);">body</span><span style="color: rgb(137, 221, 255);">&gt;</span></span>\n' +
    '<span class="line"><span style="color: rgb(137, 221, 255);">&lt;/</span><span style="color: rgb(240, 113, 120);">html</span><span style="color: rgb(137, 221, 255);">&gt;</span></span>\n' +
    '<span class="line"></span></code></pre></div>';

const meta = {
    title: 'Shopware/CodeBlock',
    args: {
        title: 'my/code/block.html',
    },
    render: render(CodeBlock, {
        slot: code
    }),
} satisfies Meta<typeof CodeBlock>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};