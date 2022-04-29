# Add custom assets

## Overview

When working with an own plugin, the usage of own custom images or other assets is a natural requirement. So of course you can do that in Shopware. In this guide we will discover together how it's possible to add and use custom assets in your Shopware plugin.

## Prerequisites

In order to be able to start with this guide, you need to have an own plugin running. As to most guides, this guide is also built upon the Plugin base guide:

{% page-ref page="../plugin-base-guide.md" %}

Needless to say, you should have your image or another asset at hand to work with.

## Adding custom assets to your plugin

In order to add custom assets to your theme, you need to create a new folder called public inside the `src/Resources` directory of your plugin. Here you're able to store your assets files, so please feel free to save your image there - we'll do the same thing in our example plugin.

```bash
# PluginRoot
.
├── composer.json
└── src
    ├── Resources
    │   ├── public
    │   │   └── your-image.png <-- Asset file here
    └── SwagBasicExample.php
```

Afterwards, you need to make sure your plugin assets are copied over to the public/bundles folder. However, don't to this by hand - the command `bin/console assets:install` will take care of it.

```text
# shopware-root/public/bundles
.
├── administration
├── framework
├── storefront
└── swagbasicexample
    └── your-image.png <-- Your asset is copied here
```

## Linking to assets

### Using custom assets in your template

Let's think about a simple example, displaying our image right in the base template of the storefront. In there we're able to link our assets by simply using the [asset](https://symfony.com/doc/current/templates.html#linking-to-css-javascript-and-image-assets) function Symfony provides:

{% code title="<plugin root>/src/Resources/views/storefront/base.html.twig" %}
{% raw %}
```text
{% sw_extends '@Storefront/storefront/base.html.twig' %}

{% block base_main %}
    <h2>Asset:</h2>

    {# Using asset function to display our custom asset #}
    <img src="{{ asset('bundles/swagbasicexample/image.png', 'asset') }}">
    {{ parent() }}
{% endblock %}
```
{% endraw %}
{% endcode %}

That's basically all you need to do to link your plugin's custom assets.

### Using custom assets in your CSS files

There's one more interesting possibility though. If you want, you can use your custom asset in your CSS files. Look at the following example:

{% code title="<plugin root>/src/Resources/app/storefront/src/scss/base.scss" %}
```css
body {
    background-image: url("/bundles/swagbasicexample/image.png");
}
```
{% endcode %}

You see, we can use our custom assets by using the asset path provided by the `bundle` directory.

### Adding custom assets in themes

Of course, you're able to use custom assets in themes as well. In this context there's another way on integration custom assets into your theme. Please take a look on the guide about adding assets to a theme for further detail:

{% page-ref page="../../themes/add-assets-to-theme.md" %}

## Next steps

One of the said custom assets are medias. For those, we've got a separate [guide](use-media-thumbnails.md).

