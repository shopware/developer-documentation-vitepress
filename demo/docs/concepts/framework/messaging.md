# Messaging

Shopware integrates with the [Symfony Messenger](https://symfony.com/doc/current/components/messenger.html) component and [Enqueue](https://enqueue.forma-pro.com/). This gives you the possibility to send and handle asynchronous messages.

## Components

### Message Bus

The [message bus](https://symfony.com/doc/current/components/messenger.html#bus) is used to dispatch your messages to your registered handlers. While dispatching your message it loops through the configured middleware for that bus. The message bus used inside Shopware can be found under the service tag `messenger.bus.shopware`. It is mandatory to use this message bus if your messages should be handled inside Shopware. However if you want to send messages to external systems you can define your custom message bus for that.

### Middleware

A [middleware](https://symfony.com/doc/current/messenger.html#middleware) is called when the message bus dispatches messages. The middleware defines what happens when you dispatch a message. For example the send\_message middleware is responsible for sending your message to the configured transport, and the `handle_message` middleware will actually call your handlers for the given message. You can add your own middleware by implementing the `MiddlewareInterface` and adding that middleware to the message bus through configuration.

### Handler

A [handler](https://symfony.com/doc/current/messenger.html#registering-handlers) gets called once the message is dispatched by the `handle_messages` middleware. Handlers do the actual processing of the message, therefore they must extend the `AbstractMessageHandler`-class and implement the `handle()` method. To register a handler you have to tag it with the `messenger.message_handler` tag. To specify which methods should be handled by a given handler implement the static `getHandledMessages()` method and return the MessageClasses which that handler should handle. You can also define multiple handlers for the same message.

### Message

A [message](https://symfony.com/doc/current/messenger.html#message) is a simple PHP class that you want to dispatch over the MessageQueue. It must be serializable and should contain all the necessary information that a [handler](messaging.md#handler) needs to process the message.

### Envelope

A message will be wrapped in [envelope](https://symfony.com/doc/current/components/messenger.html#adding-metadata-to-messages-envelopes) by the message bus that dispatches the message.

### Stamps

While the message bus is processing the message through its middleware it adds [stamps](https://symfony.com/doc/current/components/messenger.html#adding-metadata-to-messages-envelopes) to the envelope that contain metadata about the message. If you need to add metadata or configuration to your message you can either wrap your message in an Envelope and adding the necessary stamps before dispatching your message or you can create your own custom middleware for that.

### Transport

A [Transport](https://symfony.com/doc/current/messenger.html#transports) is responsible for communicating with your 3rd party message broker. You can configure multiple Transports and route messages to multiple or different Transports. Supported are all Transports that are either supported by [Symfony](https://symfony.com/doc/current/messenger.html#transports) itself, or by [Enqueue](https://github.com/php-enqueue/enqueue-dev/tree/master/docs/transport). If you don't configure a Transport messages will be processed synchronously like in the Symfony event system.

### Sending Messages

To send messages the Shopware messenger bus is used which can be injected through DI and populated with metadata. Optionally, there is also a message bus for sensitive data that offers encryption.

### Consuming Messages

Consuming messages can be done via both a [console command](../../guides/hosting/infrastructure/message-queue.md#cli-worker), and via an API endpoint. The Console command starts a worker that will receive incoming messages from your transport and dispatch them. The API can be communicated with via a POST, which will consume messages for 2 seconds and then you get the count of the handled messages in the response.

