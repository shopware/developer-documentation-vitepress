# Features

This document describes basic features provided by this library.

See official [VitePress documentation](https://vitepress.vuejs.org/) for in-depth description of all features provided
by VitePress itself, such as Markdown formatting, frontmatter configuration and theme settings.

## VueJS Components

Custom VueJS SFC are supported by default.

<!--

### ActionItem

`<ActionItem>`

### LandingWrapper

`<LandingWrapper>`

### TopBar

`<TopBar>`

### RegistrationForm

`<RegistrationForm>`

-->

### `<CodeBlock>`

`CodeBlock` component is just a wrapper with a default slot displaying content (usually code ```), and optionally name
of the file.

![](./demo/public/examples/code-block.png)

### `<PageRef>`

`PageRef` component displays `title` and `sub` with optional `icon`, linked to the `page` URL which is the only required
attribute. It automatically fetches all the relevant data (including `title` and `sub`) from sidebar configuration.

![](./demo/public/examples/page-ref.png)

### `<Tabs>` and `<Tab>`

`Tabs` and `Tab` components can be used for organizing contents in tabs.

![](./demo/public/examples/tabs.png)

## Sidebar auto-generation

Sidebar should be automatically generated using the `buildSidebarNav` helper which traverses through all links
(folders), builds a structure with metadata available on every page, and navigation config with `repo` property to
change the source of .md files (for the "Edit on GitHub" link to work properly).

See `.vitepress/navigation.ts` to see how the sidebar is configured and auto-generated.

## Sidebar configuration

Sidebar can be configured by custom YML in your .md file (frontmatter). This allows us to change the `title` displayed
in the sidebar, change the `position` of item in the sidebar, add custom `class` and display the link differently, use
`nolink` to display the text only, and use `hidden` to hide the item from the sidebar because all articles are
automatically added to the sidebar.

```yaml
nav:
  title: Custom title
  position: 123
  class: custom-class
  nolink: true
  hidden: true
```

## APIs

Internal APIs (Store & Admin) are automatically generated with Stoplight.

## Search

Algolia search is integrated with their DocSearch feature.

# Standalone usage

Similar to how we've built `developer-portal`, you can base another separate project by using
`developer-documentation-vitepress` package. See [SETUP](./SETUP.md) for more info on the process.

# Beta / Future

## Visual (regression) testing

Visually compare changes to prevent some issues.

## Change report generation

Generate change report for developer marketing team.