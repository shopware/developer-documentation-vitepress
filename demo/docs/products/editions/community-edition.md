# Community Edition

## Overview

The **Community Edition** is the open source, basic variant of Shopware which is free for everyone to use. All other Shopware editions, such as [Professional](professional-edition.md), [Enterprise](enterprise-edition/) and [Cloud](../cloud.md) are based upon the Community Edition and include plugins, which are only available in these editions.

## Running Shopware

There are several opportunities running Shopware in general. This does not only match the Community Edition, but also the Professional Edition and Enterprise Edition. When speaking of the Community Edition let's be more precise talking about the **Shopware Platform**, which can be included inside several [setup templates](../../guides/installation/overview.md#setup-templates) or can be shipped as a One-Click-Installer. Of course, there are other operation forms like Docker, Vagrant, Valet+, which are explained in the [installation guide](../../guides/installation/) section. Inside that section you will also find the [system requirements](../../guides/installation/overview.md#prerequisites) needed for running Shopware as a PHP application built upon Symfony.

## Platform components

The Shopware Platform itself is a Symfony application which consists of several components developed as Symfony bundles. Each of these components is available throughout a many repository and is included in the Shopware Platform mono repository. For the time being, there is the Core component, which includes the framework and business logic, as well as the APIs. The [Storefront](../../guides/plugins/plugins/storefront/) component is a default frontend for your storefront built upon the Bootstrap toolkit and Twig templates. A Vue.js SPA [Administration](../../concepts/framework/architecture/administration-concept.md) component wrapped inside a Symfony bundle is a default administration panel for all back-office tasks and communicates via the [Admin API](../../concepts/api) with the Core component. Last but not least, there is the Elasticsearch component, which gives you the opportunity to improve indexing of entities and also contains an adapter for the entity search.

Having these components stored inside many repositories, one can also enable Shopware being used for headless scenarios. With the help of the [Production repository](https://github.com/shopware/production), you do have the opportunity to only require the repositories you really want to have in your project through the `composer.json` file \(e.g. only require `shopware/core`\).

## Features

Rather than listing all features from a user perspective below, we'd like to mention a few **key features**, which are also worth looking in a more technical way. All of these features are available in **every single edition** & are described in several articles inside this documentation. As Shopware 6 is built with the API first approach, your first technical feature touch points might be our different APIs built in our Core component.

The **Admin API** is used to be working on all administration tasks and is connected to our Administration component \( Vue.js SPA\). This Admin API gives you the opportunity to interact with every single entity resource of Shopware and it also ships with another endpoint, which we call our **Sync API**. Its main purpose is to perform bulk write and delete operations within one single request via `UPSERT/DELETE`. Further conceptual information to our Admin API can be found [here](../../concepts/api/admin-api.md). Now that you already know our Admin API it is also interesting to learn something about our [Store API](../../concepts/api/store-api.md), which was built for a completely different use case. The **Store API** should be used, whenever you are developing customer facing clients. Within these endpoints you do have the opportunity to cover the complete customer journey - starting from a product listing, showing product information and of course placing an order through the checkout. Not only our [Storefront](../../guides/plugins/plugins/storefront/) components makes use of these routes, but also the [Shopware PWA](../pwa.md), which is a Vue.js client developed with our partner **Vue Storefront**.

Another feature worth mentioning is our CMS integration called **Shopping experiences**, which lets you build custom pages for different pages types like listing, shop pages, landing pages and in the future one is able to even create product detail pages. As this Shopping Experiences feature is also a built-in feature available through the Administration panel, you can easily drag & drop predefined \(and even custom\) blocks to your page layout. From a technical perspective it is also important to know, that this translatable content is stored in a generic way & is also available throughout the Store API. There is also a [conceptual article](../../concepts/commerce/core/shopping-experiences-cms.md) which covers this topic more specific.

Shopware also has a custom built-in **ORM**, called [Data Abstraction Layer](../../concepts/framework/data-abstraction-layer.md) which offers several features, like e.g. API endpoint generation for your entities. Our rule engine, called [Rule Builder](../../concepts/framework/rules.md), is a big feature that lets you create global rules with several conditions, which can be used and applied in several modules to e.g. configure the availability of promotion codes, shipping methods, payment methods or even product prices.

Last but not least, there is the most important technical feature, which gives you the power to create your custom ideas without touching the Shopware core. Every single feature above can be extended and customized with the help of **Extensions**. Throughout this [extension system](../../concepts/extensions/) one is able to create own [Plugins](../../concepts/extensions/plugins-concept.md), Themes, or even [Apps](../../concepts/extensions/apps-concept.md), for your Shopware project.

## Repository structure

Shopware 6 consists of multiple repositories bundled inside a [mono repository](https://www.atlassian.com/git/tutorials/monorepos) called `shopware/platform`\([GitHub](https://github.com/shopware/platform)\). This is where the Shopware core is developed. You need it as dependency in your projects and this is where you can participate in the development of Shopware through pull requests. It's split into multiple repositories for production setups, all of them are read-only and include the Core, [Storefront](../../guides/plugins/plugins/storefront/) , [Administration](../../concepts/framework/architecture/administration-concept.md) and Elasticsearch. Beside that, there is also a `Recovery` directory, which provides the opportunity to interactively update, install and maintain Shopware throughout the browser. If you want to start developing with Shopware 6, there are two setup templates and preparatory/installation steps explained [here](../../guides/installation/overview.md#setup-templates).
<!-- markdown-link-check-disable-next-line -->
{% embed url="https://www.youtube.com/watch?v=oPf4-8eU8jQ" caption="" %}

{% hint style="info" %}
This video is part of the online training ["Backend Development"](https://academy.shopware.com/courses/shopware-6-backend-development-with-jisse-reitsma) available on Shopware Academy for **free**.
{% endhint %}

## Contribution

Shopware 6 is a **community driven platform** with a lot of contributions, and we really appreciate your support. Thank you very much for that! To ensure the quality of our code, our products and our documentation we have created a small guideline for contributing [code](../../resources/guidelines/code/contribution.md) and contributing to the [docs](../../resources/guidelines/documentation/) we all should endorse to. It helps you and us to collaborate with our software. Following these guidelines will help us to integrate your changes in our daily workflow.

