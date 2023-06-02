import {composeRepository, RepositoryConfigCollection} from "../../cli/src/helpers";

describe('composeRepository', async () => {

    test('composes github', () => {
        const repositories = [
            'frontends',
            'shopware/frontends',
            'frontends.git',
            'shopware/frontends.git',
            'github.com/shopware/frontends',
            'ssh://github.com/shopware/frontends',
            'https://github.com/shopware/frontends',
            'https://git@github.com/shopware/frontends',
        ];
        const outputs: RepositoryConfigCollection = {
            'git@github.com/shopware/frontends.git': {},
            'custom@github.com/shopware/frontends.git': {
                user: 'custom',
            },
            'custom:pass@github.com/shopware/frontends.git': {
                user: 'custom',
                pass: 'pass',
            },
            'custom:pass@gitlab.shopware.com/shopware/frontends.git': {
                user: 'custom',
                pass: 'pass',
                git: 'gitlab.shopware.com',
            },
            'custom:pass@gitlab.shopware.com/my-org/frontends.git': {
                user: 'custom',
                pass: 'pass',
                org: 'my-org',
                git: 'gitlab.shopware.com',
            },
        };

        for (const repository of repositories) {
            for (const output of Object.keys(outputs)) {
                expect(composeRepository(repository, outputs[output])).toEqual(output);
            }
        }
    })

    test('composes gitlab', () => {
        const repositories = [
            'gitlab.shopware.com/product/engineering/platform-group/pwa/frontends',
        ];
        const outputs: RepositoryConfigCollection = {
            'git@gitlab.shopware.com/product/engineering/platform-group/pwa/frontends.git': {},
            'user:pass@gitlab.shopware.com/product/engineering/platform-group/pwa/frontends.git': {
                user: 'user',
                pass: 'pass',
            },
        };

        for (const repository of repositories) {
            for (const output of Object.keys(outputs)) {
                expect(composeRepository(repository, outputs[output])).toEqual(output);
            }
        }
    })

})