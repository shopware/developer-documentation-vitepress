import { SidebarGroup } from "../../../src/vitepress/config";
import {readSidebar} from "../../../src/core/composables/Sidebar";

const themes: SidebarGroup[] = readSidebar('themes', './demo/themes/');

export default themes;