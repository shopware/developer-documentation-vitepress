# Payment

In Shopware, Apps can provide integrations to payment providers. Shopware supports different flows / integrations points for conducting payment transactions, such as:

 * **Synchronous payments**, which just include a single call to an external service
 * **Asynchronous payments**, that redirect the customer to a dedicated checkout page after placing an order
 * **Prepared payments**, an alternative method which first conducts or prepares the payment and then creates an order
 * **Payment refunds**, where payment integrations can refund a transaction