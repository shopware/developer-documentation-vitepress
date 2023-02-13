import { SidebarGroup } from "../../../src/vitepress/config";
import {transformLinkToSidebar} from "../../../src/core/composables/Sidebar";

const apps: SidebarGroup[] = transformLinkToSidebar('./demo/', '/apps/');

export default apps;
