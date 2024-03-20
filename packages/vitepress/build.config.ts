import {defineBuildConfig} from "unbuild";

export default defineBuildConfig({
    entries: ["src/index"],
    rollup: {
        emitCJS: true,
        cjsBridge: true,
    },
});
