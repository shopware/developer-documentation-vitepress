import {SidebarConfig} from "../../src/vitepress/config";

import apps from "./sidebar/apps";
import themes from "./sidebar/themes";
import frontends from "./sidebar/frontends";
import integrations from "./sidebar/integrations";
import paas from "./sidebar/docs/products/paas";
import {makeSidebarConfig} from "../../src/core/composables/Sidebar";

// add missing (autodiscovered) paths
export default makeSidebarConfig('./demo/', <SidebarConfig>{
    "/apps/": apps,
    "/themes/": themes,
    "/frontends/": frontends,
    "/integrations/": integrations,
    "/docs/products/paas/": paas,
});
