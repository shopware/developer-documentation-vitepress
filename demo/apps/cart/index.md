# Cart

The cart allows you to handle cart operations. [Shopware's cart](https://developer.shopware.com/docs/concepts/commerce/checkout-concept/cart) is a central part of the checkout process. The cart has a defined [cart process](https://developer.shopware.com/docs/resources/guidelines/code/cart-process).

Besides, the cart gives various options to change a price of an item in the cart using a cart collector and processor, adding cart items, discounts, customizing price calculations, splitting cart line items, etc.

## Changing the cart behavior


Using [App Scripts](https://developer.shopware.com/docs/guides/plugins/apps/app-scripts) (cart scripts), you can [manipulate your cart](https://developer.shopware.com/docs/guides/plugins/apps/app-scripts/cart-manipulation#overview) details to:

* [Calculate cart](https://developer.shopware.com/docs/guides/plugins/apps/app-scripts/cart-manipulation#calculating-the-cart)
* [Add line items](https://developer.shopware.com/docs/guides/plugins/apps/app-scripts/cart-manipulation#line-items)
* [Define prices](https://developer.shopware.com/docs/guides/plugins/apps/app-scripts/cart-manipulation#price-definitions)
* [Add custom data](https://developer.shopware.com/docs/guides/plugins/apps/app-scripts/cart-manipulation#add-custom-data-to-line-items)
* [Add errors and notifications](https://developer.shopware.com/docs/guides/plugins/apps/app-scripts/cart-manipulation#add-errors-and-notifications-to-the-cart)
* [Run rule-based cart scripts](https://developer.shopware.com/docs/guides/plugins/apps/app-scripts/cart-manipulation#rule-based-cart-scripts)

Refer to [cart manipulation services](https://developer.shopware.com/docs/resources/references/app-reference/script-reference/cart-manipulation-script-services-reference) that allows you to make these changes.

Usings Plugins also, you can

* [Add cart collector/processor](https://developer.shopware.com/docs/guides/plugins/plugins/checkout/cart/add-cart-processor-collector)
* [Add cart items](https://developer.shopware.com/docs/guides/plugins/plugins/checkout/cart/add-cart-items)
* [Add cart discounts](https://developer.shopware.com/docs/guides/plugins/plugins/checkout/cart/add-cart-discounts)
* [Add cart validator](https://developer.shopware.com/docs/guides/plugins/plugins/checkout/cart/add-cart-validator)
* [Change price items](https://developer.shopware.com/docs/guides/plugins/plugins/checkout/cart/change-price-of-item)
* [Customize price calculation](https://developer.shopware.com/docs/guides/plugins/plugins/checkout/cart/customize-price-calculation)

## Changing the look

The appearance of the cart can be changed in multiple ways.

With [template extensions](https://developer.shopware.com/docs/guides/plugins/plugins/storefront/customize-templates), you can extend or override the cart look of our default storefront. However, remember that the template extension will only be available for merchants that use our default storefront. Some merchants who build their projects upon custom frontends will not be able to benefit from your extension.
