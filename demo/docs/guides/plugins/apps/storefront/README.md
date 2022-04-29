# Storefront

You can modify the whole appearance of the Storefront within your app. This includes [customizing templates](../../plugins/storefront/customize-templates.md), [adding custom Javascript](../../plugins/storefront/add-custom-javascript.md) and [custom styling](../../plugins/storefront/add-custom-styling.md).

As the Shopware server will build the Storefront, you don't have to set up any external servers for this. All you have to do is include your modifications \(in form of `.html.twig`, `.js` or `.scss` files\) inside the `Resources` folder of your app. The base folder structure of your app may look like this:

```text
└── DemoApp
    ├── Resources
    │   ├── app
    │   │   └── storefront
    │   │       └── src
    │   │           ├── scss
    │   │           │   └── base.scss
    │   │           └── main.js
    │   ├── views
    │   │   └── storefront
    │   │       └── ...
    │   └── public
    │       └── ... // public assets go here
    └── manifest.xml
```

## Custom Assets in Apps

{% hint style="info" %}
Note that this feature was introduced in Shopware 6.4.8.0, and is not supported in previous versions.
{% endhint %}

You may want to include custom assets inside your app, like custom fonts, etc.
Therefore, place the assets you need in the `/Resources/public` folder. All files inside this folder are available over the [asset-system](../../plugins/storefront/add-custom-assets.md#adding-custom-assets-to-your-plugin).