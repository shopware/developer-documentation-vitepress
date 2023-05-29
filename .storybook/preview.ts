import type { Preview } from "@storybook/vue3";

// add vitepress styles
import '../node_modules/vitepress/dist/client/theme-default/styles/vars.css'
import '../node_modules/vitepress/dist/client/theme-default/styles/base.css'
import '../node_modules/vitepress/dist/client/theme-default/styles/utils.css'
import '../node_modules/vitepress/dist/client/theme-default/styles/components/custom-block.css'
import '../node_modules/vitepress/dist/client/theme-default/styles/components/vp-code.css'
import '../node_modules/vitepress/dist/client/theme-default/styles/components/vp-code-group.css'
import '../node_modules/vitepress/dist/client/theme-default/styles/components/vp-doc.css'
import '../node_modules/vitepress/dist/client/theme-default/styles/components/vp-sponsor.css'

// add shopware styles
import '../src/shopware/styles/fonts-inter.css'
import '../src/shopware/styles/fonts-brandon.css'
import '../src/shopware/styles/fonts-poppins.css'
import '../src/shopware/styles/variables.css'
import '../src/shopware/styles/override.scss'
import '../src/shopware/styles/custom.scss'
import '../src/shopware/styles/buttons.scss'
//import '../src/shopware/styles/_index.scss'

// add custom storybook styles
import '../src/shopware/styles/storybook.scss'

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

export default preview;
