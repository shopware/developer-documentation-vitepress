# Features

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

![](./demo/public/examples/code-block.png)

### `<PageRef>`

![](./demo/public/examples/page-ref.png)

### `<Tabs>` and `<Tab>`

![](./demo/public/examples/tabs.png)

## Sidebar auto-generation

Sidebar can be automatically generated using the `buildSidebarNav` helper which traverses through all links (folders),
builds a structure with metadata available on every page, and navigation config with `repo` property to change the 
source of .md files (for the "Edit on GitHub" link to work properly).

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

## Search

Algolia search is integrated with their DocSearch feature.

## Mermaid

```mermaid
graph LR;
    K([<img src='/vitepress-plugin-mermaid/K.png' width='60' >])-.->G((<img id='git' src='/vitepress-plugin-mermaid/Octocat.png' width='50' >));
    H([<img id='helm' src='/vitepress-plugin-mermaid/helm.png' width='60' >])-.->G
    G-->A;
    A(<img src='/vitepress-plugin-mermaid/argo-cd.png' width='60' >)-->D(<img src='/vitepress-plugin-mermaid/ocp.png' width='60' >);
classDef img fill:none,color:none,stroke:none,border-radius:50px
class G,D,A,K,H img
click G "http://www.github.com" "This is a link" _blank
click K "https://kustomize.io/" _blank
```

```mermaid
pie title Do you like Shopware?
    "Yes" : 386
    "Yes, but in yellow" : 15
```

## APIs

Internal APIs (Store & Admin) are automatically generated with Stoplight.

## Sitemap

Generate sitemap for SERP.

# External config

## Extending

After the CLI clones your git repo, and before it builds docs, you can enrich output by
creating `.github/scripts/docs-after-clone.sh` in your repository. This is only supported in `embed` and `clone`
commands. If you'll use `link` command, you need to run your script manually, as needed.

## Copying static assets

## Standalone usage

Similar to how we've built `developer-portal`, you can base another separate project by using
`developer-documentation-vitepress` package. See [SETUP](./SETUP.md) for more info on the process.

# Beta

## Visual (regression) testing

Visually compare changes to prevent some issues.

## Change report generation

Generate change report for developer marketing team.