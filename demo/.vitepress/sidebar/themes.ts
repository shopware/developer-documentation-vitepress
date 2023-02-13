import { SidebarGroup } from "../../../src/vitepress/config";
import {transformLinkToSidebar} from "../../../src/core/composables/Sidebar";

const themes: SidebarGroup[] = transformLinkToSidebar('./demo/', '/themes/');

export default themes;