# Shopware Developer Platform Theme

This is a base theme for all developer documentation websites in the Shopware Product ecosystem.

Please follow the:

- [setup instructions](./SETUP.md) for more information on how to use this theme.
- [features](./FEATURES.md) for more information on globally available features.
- [`developer-portal`](/shopware/developer-portal) for the actual implementation of this library.

## Collaboration

To publish package add commit to `main` with the following convention:

```
chore: release x.y.z
```

You need to set this version in a `package.json` file as well.

## Versioning

There are 2 versions of documentation template available:

- ~~v0.x (branch `v0`) - hard-forked version of old VueJS theme~~
- v1.x (branch `main`) - extended version of the official Vitepress theme

## Directory structure

- `src` as 'vitepress-shopware-docs' - Shopware specific Vitepress theme
- `packages/cli` as `@shopware-docs/cli` - CLI used for embedding repositories
- `packages/storybook` as `@shopware-docs/storybook` - shared Storybook configuration, including mocks
- `packages/vitepress` as `@shopware-docs/vitepress` - shared Vitepress plugins and helpers
- `packages/vitest` as `@shopware-docs/vitest` - shared vitest & Playwright configuration