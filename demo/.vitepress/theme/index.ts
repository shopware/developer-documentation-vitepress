import { VPTheme } from "../../../src/vitepress";
import { h } from "vue";

import ActionItem from "./components/ActionItem.vue";
import RegistrationForm from "./components/RegistrationForm.vue";
import LandingWrapper from "./components/LandingWrapper.vue";
import PageRef from "./components/PageRef.vue";
import TopBar from "./components/TopBar.vue";

export default {
  ...VPTheme,
  enhanceApp({ app }) {
    app.component('ActionItem', ActionItem),
    app.component('RegistrationForm', RegistrationForm),
    app.component('LandingWrapper', LandingWrapper),
    app.component('PageRef', PageRef),
    app.component('TopBar', TopBar)
  },
  Layout() {
    return h(VPTheme.Layout, null, {
      // uncomment to test layout slots
      // 'sidebar-top': () => h('div', 'hello top'),
      // 'sidebar-bottom': () => h('div', 'hello bottom'),
      // 'content-top': () => h('h1', 'Announcement!'),
      // 'content-bottom': () => h('div', 'Some ads'),
      // 'aside-top': () => h('div', 'this could be huge'),
      // 'aside-mid': () => h('div', { style: { height: '300px' }}, 'Sponsors'),
      // 'aside-bottom': () => h('div', { style: { height: '300px' }}, 'Sponsors'),
    });
  },
};
