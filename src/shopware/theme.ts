/**
 * We are extending from the default theme.
 */
import Theme from 'vitepress/theme'
import {withConfigProvider} from '../shopware/composables/config'
import {h, onMounted, watch, nextTick} from 'vue'
import { useRoute } from 'vitepress'
import mediumZoom from 'medium-zoom'

/**
 * Component that we want to make globally available.
 */
import PageRef from "./../shopware/components/PageRef.vue";
import YoutubeRef from "./../shopware/components/YoutubeRef.vue";
import CodeBlock from "./../shopware/components/CodeBlock.vue";
import Tabs from "./../shopware/components/Tabs.vue";
import Tab from "./../shopware/components/Tab.vue";
import SwagIcon from "./../shopware/components/SwagIcon.vue";
import SwagBtn from "./../shopware/components/SwagBtn.vue";
import SwagHero from "./../shopware/components/SwagHero.vue";
import SwagLabel from "./../shopware/components/SwagLabel.vue";

/**
 * Shared cards and lists.
 */
import SwagLanding from "./../shopware/components/SwagLanding.vue";
import SwagCard from "./../shopware/components/SwagCard.vue";
import SwagLandingCard from "./../shopware/components/SwagLandingCard.vue";
import SwagLandingCardList from "./../shopware/components/SwagLandingCardList.vue";
import SwagCardSummary from "./../shopware/components/SwagCardSummary.vue";

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
//import SwagBreadcrumbs from "./components/SwagBreadcrumbs.vue";
import SwagAlgoliaAttributes from "./components/SwagAlgoliaAttributes.vue";
import SwagHeader from "./components/SwagHeader.vue";
import SwagContentMenu from "./components/SwagContentMenu.vue";
import SwagFooter from "./components/SwagFooter.vue";
import SwagScrollToTop from "./components/SwagScrollToTop.vue";

/**
 * Import styles at the end.
 */
import '../shopware/styles/_index.scss'
import "uno.css";

const SWAGTheme = (myConfig: { enhanceApp?: Function, slots?: {[key: string]:any[]} } = {}) => ({
    Layout() {
        const slots = {
            'doc-top': () => [
                h(SwagHeader),
            ],
            'doc-before': () => [
                h(SwagAlgoliaAttributes),
                //h(SwagBreadcrumbs),
            ],
            'doc-footer-before': () => [
                h(SwagContentMenu),
                h(SwagRelatedArticles),
                h(SwagStackOverflow),
            ],
            'doc-after': () => [

            ],
            'sidebar-nav-before': () => [
                h(SwagSidebarVersionSwitcher),
            ],
            'layout-bottom': () => [
                h(SwagScrollToTop),
                h(SwagFooter)
            ],
        };

        Object.keys(myConfig?.slots || {}).forEach(key => {
            let realKey = key;
            let mode = 'push';
            if (key.includes(':')) {
                [realKey, mode] = key.split(':');
            }

            if (!slots[realKey]) {
                slots[realKey] = () => [];
            }

            const currentSlots = slots[realKey]();

            myConfig.slots[realKey].forEach(component => currentSlots[mode](h(component)));
            slots[realKey] = () => currentSlots;
        });

        return h(
            withConfigProvider(Theme.Layout),
            null,
            slots
        )
    },
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
        app.component("SwagIcon", SwagIcon);
        app.component("SwagBtn", SwagBtn);
        app.component("SwagLabel", SwagLabel);
        app.component("SwagHero", SwagHero);

        app.component("SwagCard", SwagCard);
        app.component("SwagLandingCard", SwagLandingCard);
        app.component("SwagLandingCardList", SwagLandingCardList);
        app.component("SwagCardSummary", SwagCardSummary);
        app.component("SwagLanding", SwagLanding);

        /**
         * Allow extending from sub-apps.
         */
        myConfig.enhanceApp?.({app, router, siteData});
    },
    setup() {
        // https://github.com/vuejs/vitepress/issues/854
        // https://github.com/francoischalifour/medium-zoom/issues/184
        const route = useRoute();
        const initZoom = () => mediumZoom('.main img:not([class])', {background: 'var(--vp-c-bg)'});
        onMounted(() => initZoom());
        watch(
            () => route.path,
            () => nextTick(() => initZoom())
        );
    },
});

export {SWAGTheme}

export type {Config} from './config'
