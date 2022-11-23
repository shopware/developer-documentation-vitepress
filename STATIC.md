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

## How to write docs?

Sidebar will be automatically built based on your directory and file hierarchy.

### Dev preview

Make sure you have checked out `developer-documentation-vitepress` repository and installed npm dependencies.

```shell
$ git checkout git@github.com/shopware/developer-documentation-vitepress.git
$ cd developer-documentation-vitepress
$ npm install
```

_Note: keep repository up to date by pulling changes from remote and re-install npm dependencies._

### Include in production

Update `Clone sub-docs` section in `parent-deploy.yml` workflow and include your new repository.

```yaml
 name: Clone sub-docs
 run: |
   ...
   git clone git@github.com/shopware/your-docs.git docs/your-mount-point
   ...
```

This will make your docs available under the `/your-mount-point` URL.

### Trigger build

Copy `sub-publish.yml` workflow to your docs repository.

```shell
$ mkdir -p ./github/workflows/
$ cp ../developer-documentation-vitepress/.github/helpers/sub-publish.yml ./github/workflows/
```

This workflow will trigger a rebuild workflow in the main docs repository and create a new PR.

### Sidebar configuration

Sidebar can be configured by custom YML in your .md file (frontmatter).

```markdown

\```
sidebar:
  title: Custom title
  position: 123
  class: custom-class
  nolink: true
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
see [./SETUP.md](SETUP) for more info on how to get the project running.
