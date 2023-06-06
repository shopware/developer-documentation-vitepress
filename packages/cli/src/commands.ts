import install from "./commands/install";
import embed from "./commands/embed";
import clone from "./commands/clone";
import link from "./commands/link";
import cleanup from "./commands/cleanup";
import manage from "./commands/manage";
import preview from "./commands/preview";
import build from "./commands/build";
import test from "./commands/test";
import pull from "./commands/pull";
import config from "./commands/config";
import git from "./commands/git";
import {MyCommand} from "./cli";

export const commands: MyCommand[] = [
    // @ts-ignore
    install,
    // @ts-ignore
    embed,
    // @ts-ignore
    clone,
    // @ts-ignore
    link,
    // @ts-ignore
    cleanup,
    // @ts-ignore
    manage,
    // @ts-ignore
    preview,
    // @ts-ignore
    build,
    // @ts-ignore
    test,
    // @ts-ignore
    pull,
    // @ts-ignore
    git,
    // @ts-ignore
    config,
];