// import "tailwindcss/tailwind.css";
import "uno.css";
import "./styles/index.css";
import VPApp from "./components/VPApp.vue";
import VPNotFound from "./components/VPNotFound.vue";
import { Theme } from "vitepress";
import { withConfigProvider } from "./composables/config";

// import ActionItem from "./../shopware/components/ActionItem.vue";
// import RegistrationForm from "./../shopware/components/RegistrationForm.vue";
// import LandingWrapper from "./../shopware/components/LandingWrapper.vue";
// import TopBar from "./../shopware/components/TopBar.vue";
import PageRef from "./../shopware/components/PageRef.vue";
import CodeBlock from "./../shopware/components/CodeBlock.vue";
import Tabs from "./../shopware/components/Tabs.vue";
import Tab from "./../shopware/components/Tab.vue";

const VPTheme: Theme = {
  Layout: withConfigProvider(VPApp),
  NotFound: VPNotFound,
  enhanceApp({ app }) {
    // app.component('ActionItem', ActionItem),
    // app.component('RegistrationForm', RegistrationForm),
    // app.component('LandingWrapper', LandingWrapper),
    // app.component('TopBar', TopBar),
    app.component('PageRef', PageRef),
    app.component('CodeBlock', CodeBlock),
    app.component('Tabs', Tabs),
    app.component('Tab', Tab)
  }

};

export { VPTheme };

export type { Config } from "./config";
