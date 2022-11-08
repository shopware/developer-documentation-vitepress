# Payment

Shopware 6's [payment system](https://developer.shopware.com/docs/concepts/commerce/checkout-concept/payments) is an integral part of the checkout process that deals with payment transactions from customers to merchants and visa-versa.

When a customer buys a product using any payment method (debit card, credit card, PayPal, etc.), it follows a [payment transaction flow](https://developer.shopware.com/docs/concepts/commerce/checkout-concept/payments#payment-flow) that passes through the sequential steps of payment from start to approval to finish the payment.

Payment handlers integrate seamlessly into the point of sale and let your customers pay for orders with one or more payment methods during the checkout process.

Shopware supports different payment handlers for conducting payment transactions, such as:

 * [**Synchronous payment**](https://developer.shopware.com/docs/guides/plugins/apps/payment#synchronous-payments) - includes a single call to an external service. Here the final state of a transaction is returned immediately.
 * [**Asynchronous payment**](https://developer.shopware.com/docs/guides/plugins/apps/payment#asynchronous-payments) - that redirects the customer to a dedicated checkout page after placing an order. Here the transaction may first return a *Pending* status before returning a final status indicating the success or failure of the transaction request.
 * [**Prepared payment**](https://developer.shopware.com/docs/guides/plugins/apps/payment#prepared-payments) - an alternative method that first prepares and validates the payment before creating an order. Once successful, it later captures the payment.
 * [**Payment refund**](https://developer.shopware.com/docs/guides/plugins/apps/payment#refund) - where payment integrations return the funds to the customer.

In Shopware, [Apps can provide integrations to payment providers](https://developer.shopware.com/docs/concepts/extensions/apps-concept#integrate-payment-providers). Also, Shopware 6 offers an easy platform on which you can [build payment](https://developer.shopware.com/docs/guides/plugins/plugins/checkout/payment/add-payment-plugin) and [customize payment providers](https://developer.shopware.com/docs/guides/plugins/plugins/checkout/payment/customize-payment-provider) via [plugins](https://developer.shopware.com/docs/guides/plugins/plugins/checkout/payment).

When your customer is ready to pay, the [payment API handle](https://shopware.stoplight.io/docs/store-api/8218801e50fe5-handling-the-payment) provides a collection of APIs that enable you to:

* [Fetch a list of the available payment methods](https://shopware.stoplight.io/docs/store-api/7d24156ae6242-loads-all-available-payment-methods)
* [Set the payment method](https://shopware.stoplight.io/docs/store-api/8218801e50fe5-handling-the-payment#set-the-payment-method)
* [Initiate a payment](https://shopware.stoplight.io/docs/store-api/8218801e50fe5-handling-the-payment#initiate-the-payment)
* [Submit additional payment details](https://shopware.stoplight.io/docs/store-api/8218801e50fe5-handling-the-payment#transmit-additional-payment-details)
* [Finalize and present the payment result](https://developer.shopware.com/docs/resources/references/app-reference/payment-reference)
