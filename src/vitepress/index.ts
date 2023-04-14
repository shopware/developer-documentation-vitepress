/**
 * We are extending from the default theme.
 */
import Theme from 'vitepress/theme'
import {withConfigProvider} from './composables/config'
import {h} from 'vue'


/**
 * Component that we want to make globally available.
 */
import PageRef from "./../shopware/components/PageRef.vue";
import YoutubeRef from "./../shopware/components/YoutubeRef.vue";
import CodeBlock from "./../shopware/components/CodeBlock.vue";
import Tabs from "./../shopware/components/Tabs.vue";
import Tab from "./../shopware/components/Tab.vue";

// broken components
// import ActionItem from "./../shopware/components/ActionItem.vue";
// import RegistrationForm from "./../shopware/components/RegistrationForm.vue";
// import LandingWrapper from "./../shopware/components/LandingWrapper.vue";
// import TopBar from "./../shopware/components/TopBar.vue";

/**
 * Slot contents.
 */
import SwagRelatedArticles from "../shopware/components/SwagRelatedArticles.vue";
import SwagSidebarVersionSwitcher from "../shopware/components/SwagSidebarVersionSwitcher.vue";
import SwagStackOverflow from "../shopware/components/SwagStackOverflow.vue";

/**
 * Import styles at the end.
 */
import '../shopware/styles/_index.scss'
import "uno.css";

const SWAGTheme = (myConfig: { enhanceApp?: Function } = {}) => ({
    Layout: (() => {
        return h(
            withConfigProvider(Theme.Layout),
            null,
            {
                'doc-footer-before': () => [
                    h(SwagRelatedArticles),
                    h(SwagStackOverflow)
                ],
                'sidebar-nav-before': () => h(SwagSidebarVersionSwitcher),
            }
        )
    })(),
    //NotFound: VPNotFound,
    enhanceApp({app, router, siteData}) {
        // app.component('ActionItem', ActionItem),
        // app.component('RegistrationForm', RegistrationForm),
        // app.component('LandingWrapper', LandingWrapper),
        // app.component('TopBar', TopBar),
        app.component("YoutubeRef", YoutubeRef);
        app.component("PageRef", PageRef);
        app.component("CodeBlock", CodeBlock);
        app.component("Tabs", Tabs);
        app.component("Tab", Tab);

        /**
         * Allow extending from sub-apps.
         */
        myConfig.enhanceApp?.({app, router, siteData});
    }
});

export {SWAGTheme}

export type {Config} from './config'
