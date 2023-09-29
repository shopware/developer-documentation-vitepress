import type {Plugin} from "vite";
import postcss from "postcss";

export function CssCleanup(options = {cleanup: []}): Plugin {
    return {
        name: "shopware-css-specificity-cleanup",
        enforce: "pre",
        async transform(code, id) {
            if (!id.match(/\.css\b/)) return null;
            if (!id.includes('/node_modules/vitepress/dist/client/theme-default/')) return null;
            if (!id.endsWith('/vp-doc.css')) return null;

            const {root} = await postcss().process(code, {
                from: undefined,
            });

            // Remove selectors
            options.cleanup.forEach((selector) => {
                root.nodes = root.nodes.filter(node => {
                    // remove by selector name
                    if (node.selector === selector) {
                        console.log(`Removing ${selector}`)
                        return false;
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