# Shopware Developer Platform Theme

This is a base theme for all developer documentation websites in the Shopware Product ecosystem.

Please follow the:

- [setup instructions](./SETUP.md) for more information on how to use this theme.
- [features](./FEATURES.md) for more information on globally available features.
- [`developer-portal`](/shopware/developer-portal) and [`design-portal`](/shopware/design-portal) for the actual implementation of this repo.

## Collaboration

To prepare a new release version, run the `pnpm bump` command.

```bash
$ pnpm bump
```

Push changes to the remote and let the `auto-publish` workflow run the tests and publish new versions.

## Versioning

There are 2 versions of documentation template available:

- ~~v0.x (branch `v0`) - hard-forked version of old VueJS theme~~
- v1.x (branch `main`) - extended version of the official Vitepress theme

## Directory structure

- `src` as 'vitepress-shopware-docs' - Shopware specific Vitepress theme
- [`packages/cli`](./CLI.md) as `@shopware-docs/cli` - CLI used for embedding repositories
- `packages/storybook` as `@shopware-docs/storybook` - shared Storybook configuration, including mocks
- `packages/vitepress` as `@shopware-docs/vitepress` - shared Vitepress plugins and helpers
- `packages/vitest` as `@shopware-docs/vitest` - shared vitest & Playwright configuration