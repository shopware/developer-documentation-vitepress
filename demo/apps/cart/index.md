# Cart

The Cart allows you to handle cart operations. [Shopware's cart](https://developer.shopware.com/docs/concepts/commerce/checkout-concept/cart) resides in the checkout bundle and is a central part of the checkout process. The cart has a defined [cart process](https://developer.shopware.com/docs/resources/guidelines/code/cart-process).

Besides, the cart gives various options change a price of an item in the cart, you'll have to use a cart collector and a cart processor, cart items, discounts, customizing price calculation, changing item prices at runtime, etc.

## Changing the cart behavior

Using App Scripts (cart scripts) you can [manipulate your cart](https://developer.shopware.com/docs/resources/references/app-reference/script-reference/cart-manipulation-script-services-reference) details for:

* [Calculating cart](https://developer.shopware.com/docs/guides/plugins/apps/app-scripts/cart-manipulation#calculating-the-cart)
* [Line items](https://developer.shopware.com/docs/guides/plugins/apps/app-scripts/cart-manipulation#line-items)
* [Price Definitions](https://developer.shopware.com/docs/guides/plugins/apps/app-scripts/cart-manipulation#price-definitions)
* [Add custom data](https://developer.shopware.com/docs/guides/plugins/apps/app-scripts/cart-manipulation#add-custom-data-to-line-items)
* [Add errors and notifications](https://developer.shopware.com/docs/guides/plugins/apps/app-scripts/cart-manipulation#add-errors-and-notifications-to-the-cart)
* [Rule-based cart scripts](https://developer.shopware.com/docs/guides/plugins/apps/app-scripts/cart-manipulation#rule-based-cart-scripts)

Also, such changes can also be done via [plugins](https://developer.shopware.com/docs/guides/plugins/plugins/checkout/cart) too.

## Changing the look

The appearance of the cart can be changed in multiple ways.

With Template Extensions, you can extend or override the cart look of our default storefront. However, keep in mind that template extension will only be available for merchants that use our default storefront. Some merchants build their project upon Custom Frontends will not be able to benefit from your extension.
