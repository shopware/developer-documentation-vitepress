# Checkout

On of the core operating entities of Shopware is [Checkout](https://developer.shopware.com/docs/concepts/commerce/checkout-concept). It manages the [cart](https://developer.shopware.com/docs/concepts/commerce/checkout-concept/cart), [order](https://developer.shopware.com/docs/concepts/commerce/checkout-concept/orders) and [payment](https://developer.shopware.com/docs/concepts/commerce/checkout-concept/payments) functions. 

Shopware's checkout gives various options for modifying custom **cart items**, **custom data** or **error handling**. You can also change the look of the checkout.

## Changing the checkout behavior

Using [App Scripts](https://developer.shopware.com/docs/guides/plugins/apps/app-scripts) you modify and extend the internal logic of the checkout:

 * [Adding custom items and prices](https://developer.shopware.com/docs/guides/plugins/apps/app-scripts/cart-manipulation)
 * [Splitting cart items](https://developer.shopware.com/docs/guides/plugins/apps/app-scripts/cart-manipulation#split-line-items)
 * [Add custom data](https://developer.shopware.com/docs/guides/plugins/apps/app-scripts/cart-manipulation)
 * [Add errors and notifications](https://developer.shopware.com/docs/guides/plugins/apps/app-scripts/cart-manipulation)
 * [Rule-based scripts](https://developer.shopware.com/docs/guides/plugins/apps/app-scripts/cart-manipulation)

You can also extend it via [plugins](https://developer.shopware.com/docs/guides/plugins/plugins/checkout)

## Changing the look

The appearance of the checkout can be changed in multiple ways

With [template extensions](https://developer.shopware.com/docs/guides/plugins/plugins/storefront/customize-templates), you can extend or override the checkout look of our default storefront.

However, keep in mind that template extension will only be available for merchants that use our default storefront. Some merchants build their project upon [Custom Frontends]() will not be able to benefit from your extension.

