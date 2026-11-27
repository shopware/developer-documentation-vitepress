import {defineBuildConfig} from "unbuild";

export default defineBuildConfig({
    entries: ["src/index"],
    failOnWarn: false,
    rollup: {
        emitCJS: true,
        cjsBridge: true,
    },
});
