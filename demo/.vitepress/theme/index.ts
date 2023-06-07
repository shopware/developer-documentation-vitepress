import { SWAGTheme } from "../../../src/shopware";

export default {
  ...SWAGTheme({
    enhanceApp: ({app, router, siteData}) => {
      app.component('VPNavBarSocialLinks', VPNavBarSocialLinks);
    }
  }),
};