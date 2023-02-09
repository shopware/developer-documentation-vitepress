import { SidebarGroup } from "../../../src/vitepress/config";
import {readSidebar} from "../../../src/core/composables/Sidebar";

const apps: SidebarGroup[] = readSidebar('apps', './demo/apps/');

export default apps;
