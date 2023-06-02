import {env} from "process";
import path from "path";

export const docsSrcDir = 'src';

export const repositories = [
    {
        name: 'shopware/docs',
        src: '.',
        dst: 'docs',
        branch: env.BRANCH_DOCS || 'next' || 'main',
        org: env.ORG_DOCS || 'shopware',
    },
    {
        name: 'shopware/docs',
        src: '.',
        dst: path.join('docs', 'v6.4'),
        branch: env.BRANCH_DOCS_64 || 'next-6.4',
        org: env.ORG_DOCS || 'shopware',
    },
    {
        name: 'shopware/docs',
        src: '.',
        dst: path.join('docs', 'v6.3'),
        branch: env.BRANCH_DOCS_63 || 'next-6.3',
        org: env.ORG_DOCS || 'shopware',
    },
    {
        name: 'shopware/frontends',
        src: path.join('apps', 'docs', 'src'),
        dst: 'frontends',
        branch: env.BRANCH_FRONTENDS || 'main',
        org: env.ORG_FRONTENDS || 'shopware',
        skip: true,
    },
    {
        name: 'gitlab.shopware.com/product/engineering/platform-group/pwa/frontends',
        src: path.join('apps', 'docs', 'src'),
        dst: 'frontends-gl',
        branch: env.BRANCH_FRONTENDS || 'main',
        org: env.ORG_FRONTENDS || 'shopware',
        env: {
            GITLAB_FRONTENDS_USERNAME: {
                as: 'user',
                description: 'GitLab deploy key username'
            },
            GITLAB_FRONTENDS_ACCESS_KEY: {
                as: 'pass',
                description: 'GitLab deploy key'
            },
        },
        skip: true,
    },
    {
        name: 'shopware/admin-extension-sdk',
        src: path.join('docs', 'docs', 'guide'),
        dst: 'resources/admin-extension-sdk',
        branch: env.BRANCH_ADMIN_EXTENSION_SDK || 'DX-223' || 'main',
        org: env.ORG_ADMIN_EXTENSION_SDK || 'shopware',
        skip: true,
    },
    {
        name: 'shopware/meteor-icon-kit',
        src: 'docs',
        dst: 'resources/meteor-icon-kit',
        branch: env.BRANCH_METEOR_ICON_KIT || 'DX-223' || 'main',
        org: env.ORG_METEOR_ICON_KIT || 'bojanrajh',
        env: {
            FIGMA_FILE: {
                description: 'Figma file ID'
            },
            FIGMA_TOKEN: {
                description: 'Figma API key'
            },
        },
        skip: true,
    },
    {
        name: 'shopware/meteor-component-library',
        src: 'docs',
        dst: 'resources/meteor-component-library',
        branch: env.BRANCH_METEOR_COMPONENT_LIBRARY || 'DX-231' || 'main',
        org: env.ORG_METEOR_COMPONENT_LIBRARY || 'bojanrajh',
        skip: true,
    }
];