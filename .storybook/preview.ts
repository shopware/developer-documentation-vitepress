import type {Preview} from "@storybook/vue3";

// add vitepress styles
import 'vitepress/dist/client/theme-default/styles/vars.css'
import 'vitepress/dist/client/theme-default/styles/base.css'
import 'vitepress/dist/client/theme-default/styles/utils.css'
import 'vitepress/dist/client/theme-default/styles/components/custom-block.css'
import 'vitepress/dist/client/theme-default/styles/components/vp-code.css'
import 'vitepress/dist/client/theme-default/styles/components/vp-code-group.css'
import 'vitepress/dist/client/theme-default/styles/components/vp-doc.css'
import 'vitepress/dist/client/theme-default/styles/components/vp-sponsor.css'

// add shopware styles
import 'vitepress-shopware-docs/src/shopware/styles/fonts-inter.css'
import 'vitepress-shopware-docs/src/shopware/styles/fonts-poppins.css'
import 'vitepress-shopware-docs/src/shopware/styles/variables.css'
import 'vitepress-shopware-docs/src/shopware/styles/override.scss'
import 'vitepress-shopware-docs/src/shopware/styles/custom.scss'
import 'vitepress-shopware-docs/src/shopware/styles/buttons.scss'
import 'vitepress-shopware-docs/src/shopware/styles/forms.scss'
import 'vitepress-shopware-docs/src/shopware/styles/portals.scss'
//import '../node_modules/vitepress-shopware-docs/src/shopware/styles/_index.scss'

import "uno.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    fetchMock: {
      debug: true,
    },
  },
};

export default preview as Preview;