import type {Plugin} from "vite";
import postcss from "postcss";

export const baseCleanup = [
    {
        scope: '/node_modules/vitepress/dist/client/theme-default/',
        file: '/vp-doc.css',
        cleanup: [
            '.vp-doc h2',
            '.vp-doc hr',
            '.vp-doc a',
            '.vp-doc h1 .header-anchor',
            '.vp-doc h2 .header-anchor',
            '.vp-doc h3 .header-anchor',
            '.vp-doc h4 .header-anchor',
            '.vp-doc h5 .header-anchor',
        ]
    },
    {
        scope: '/node_modules/vitepress/dist/client/theme-default/components/VPSocialLink.vue',
        file: '&lang.css',
        cleanup: [
            /\.VPSocialLink > :deep\(svg\)/,
        ]
    },
];

export function CssCleanup(options = {cleanup: []}): Plugin {
    return {
        name: "shopware-css-specificity-cleanup",
        enforce: "pre",
        async transform(code, id) {
            // skip non-css files
            if (!id.match(/\.css\b/)) return null;

            const foundScope = options.cleanup.find(clean => id.includes(clean.scope) && id.endsWith(clean.file));
            if (!foundScope) {
                // skip out-of-scope files
                return null;
            }

            console.log(`Pre-processing ${id}`, code);
            const {root} = await postcss().process(code, {
                from: undefined,
            });

            // Remove selectors
            foundScope.cleanup.forEach((selector) => {
                root.nodes = root.nodes.filter(node => {
                    if (!node.selector) {
                        return true;
                    }

                    // remove by selector name
                    if (node.selector === selector) {
                        console.log(`Removing ${selector}`);
                        return false;
                    } else if (selector instanceof RegExp) {
                        const toRemove = !!node.selector.match(selector);
                        if (toRemove) {
                            console.log(`Removing ${selector}`);
                            return false;
                        }
                    }

                    return true;
                });
            });

            // Remove properties
            /*root.walkDecls((decl) => {
                if (propertiesToRemove.includes(decl.prop)) {
                    decl.remove();
                }
            });*/

            return {
                code: root.toString(),
                map: null,
            };
        }
    };
}