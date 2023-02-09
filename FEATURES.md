# About

Repository `developer-documentation-vitepress` provides two ways to write documentation:

- embedded/basic
- standalone/advanced

| Feature                   | Basic | Standalone          |
|---------------------------|-------|---------------------|
| Custom Vue SFC components | No    | Yes                 |
| Autobuild sidebar         | Yes   | No (available)      |
| Included in sitemap       | Yes   | No (can be mounted) |
| PageRef autolink          | Yes   | No (can be mounted) |

# Embedded / basic

Use this approach when the base project provides you with all generic components you need.

### Sidebar configuration

Sidebar can be configured by custom YML in your .md file (frontmatter).

```markdown

\```
nav:
  title: Custom title
  position: 123
  class: custom-class
  nolink: true
  hidden: true
\```

```

#### Reformatting YML frontmatter configuration in .md files by PhpStorm

Please, enable registry key `markdown.experimental.frontmatter.support.enable=true` in your PhpStorm registry settings.

See [https://youtrack.jetbrains.com/issue/IDEA-291881/Frontmatter-Support](IDEA-291881) in JetBrains issue tracker for more info.

```
Shift+Shift -> Registry -> Find and enable key
```

# Standalone / advanced

This approach gives you more power over custom components, config and any other custom code. Please,
see [./SETUP.md](SETUP) for more info on how to get the project running, 
and [`developer-portal`](/shopware/developer-portal) for more info on the actual implementation.

## All features
## Sidebar auto-generation

See `.vitepress/navigation.ts` to see how the sidebar is configured and auto-generated.

## Versioning

See `.github/scripts/embed.sh` and `cli/src/data.ts`.

## Custom components

Custom VueJS SFC are supported by default.

## Search

Algolia search is integrated with their DocSearch feature.

## Mermaid

Mermaid plugin is built-in for drawing diagrams and charts.

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

As we've built `developer-portal`, you can base another separate project by using `developer-documentation-vitepress`
package.

# Notes

## PHPStorm configuration (frontmatter)

Activate `markdown.experimental.frontmatter.support.enable` to enable proper formatting of frontmatter sections in your
.md files.

# Beta

## Visual (regression) testing

Visually compare changes to prevent some issues.

## Change report generation

Generate change report for developer marketing team.