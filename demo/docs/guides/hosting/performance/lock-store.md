# Lock store

Shopware uses [Symfony's Lock component](https://symfony.com/doc/5.4/lock.html) to implement locking functionality.
By default, Symfony will use a local lock store, this means in multi-machine (cluster) setups naive file locks will break the system, therefore it is highly recommended using one of the [supported remote stores](https://symfony.com/doc/5.4/components/lock.html#available-stores).

## Using Redis as a lock store

As Redis can already be used for [caching](./caches.md), [increment store](./increment.md) and [session storage](./session.md), you can also use that Redis host as a remote lock store.
To use Redis, create a `config/packages/framework.yml` file with the following content

```yaml
framework:
    lock: 'redis://host:port'
```

## Other lock stores

As Shopware uses [Symfony's Lock component](https://symfony.com/doc/5.4/lock.html) all lock stores supported by Symfony can be used.
Keep in mind that you should always use a remote store if you host shopware in a cluster setup.
For a list of all available lock stores refer to [Symfony's documentation](https://symfony.com/doc/5.4/components/lock.html#available-stores).
[There](https://symfony.com/doc/5.4/lock.html#configuring-lock-with-frameworkbundle) are also more detailed information on the configuration options.