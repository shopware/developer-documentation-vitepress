# Custom Endpoints with App Scripts

If you want to execute some logic in Shopware and trigger the execution over a HTTP-Request or need some special data from Shopware over the API, 
you can create custom API-endpoints in your app, that allow you to execute a script when a request to that endpoint is made.

{% hint style="info" %}
Note that custom endpoints with app scripts were introduced in Shopware 6.4.9.0, and are not supported in previous versions.
{% endhint %}

## Custom Endpoints

There are specialized script-execution endpoints for the `api`, `store-api` and `storefront` scopes.
Refer to the [API-docs](../../../integrations-api/README.md) for more information on the distinction of those APIs.
Those endpoints allow you to trigger the execution of you scripts with an HTTP-Request against those endpoints.

Custom endpoint scripts need to be located in a folder that is prefixed with the name of the api scope (one of `api-`, `store-api-` or `storefront`). 
The remaining part of the folder name is the hook-name.
You can specify which script should be executed by using the correct hook-name in the URL of the HTTP-request.

This means to execute the scripts under `Resources/scripts/api-test-script` you need to call the `/api/script/test-script` endpoint.
Note that all further slashes (`/`) in the route will be replaced by dashes (`-`). This means to execute the `Resources/scripts/api-test-script` scripts you could also call the `/api/script/test/script` endpoint.

{% hint style="warning" %}
To prevent name collisions with other apps you should always include your vendor prefix or app-name as part of the hook name.
The best practice is to add your app-name after the api scope prefix and then use it as a REST-style resource identifier e.g. `/api/script/swagMyApp/test-script`.
{% endhint %}

In your custom endpoint scripts you get access to the JSON-payload of the request (and the query parameters for GET-requests) and have access to the read & write functionality of the [Data Abstraction Layer](../../../../concepts/framework/data-abstraction-layer.md).
For a complete overview of the available data and service refer to the [hook reference documentation](../../../../resources/references/app-reference/script-reference/script-hooks-reference.md#api-hook).

By default, a `204 No Content` response will be sent after your script was executed.
To provide a custom response you can use the [`response`-service](../../../../resources/references/app-reference/script-reference/custom-endpoint-script-services-reference.md#scriptresponsefactoryfacade) to create a response and set it as the `response` of the hook:

{% code title="Resources/scripts/api-custom-endpoint/my-example-script.twig" %}
{% raw %}
```twig
{% set response = services.response.json({ 'foo': 'bar' }) %}
{% do hook.setResponse(response) %}
```
{% endraw %}
{% endcode %}

You can execute multiple scripts for the same HTTP-request by storing multiple scripts in the same order.
Those scripts will be executed in alphabetically order. Keep in mind that later scripts may override the response set by prior scripts.
If you want to prevent the execution of further scripts you can do so by calling `hook.stopPropagation`:

{% code title="Resources/scripts/api-custom-endpoint/my-example-script.twig" %}
{% raw %}
```twig
{% do hook.stopPropagation() %}
```
{% endraw %}
{% endcode %}

### Admin-API endpoints

Scripts that should be available over the Admin-API should be stored in a folder prefixed with `api-`, so the folder name would be `api-{hook-name}`.
The execution of those scripts is possible over the `/api/script/{hook-name}` endpoint.

This endpoint only allows POST-requests.

Caching of responses is not supported for Admin-API responses.

For a complete overview of the available data and services refer to the [reference documentation](../../../../resources/references/app-reference/script-reference/script-hooks-reference.md#api-hook).

### Store-API endpoints

Scripts that should be available over the Store-API should be stored in a folder prefixed with `store-api-`, so the folder name would be `store-api-{hook-name}`.
The execution of those scripts is possible over the `/store-api/script/{hook-name}` endpoint.

This endpoint allows POST- and GET-requests.

This Hook is an [Interface Hook](./README.md#interface-hooks), the execution of your logic should be implemented in the `response`-block of your script.

{% code title="Resources/scripts/store-api-custom-endpoint/my-example-script.twig" %}
{% raw %}
```twig
{% block response %}
    {% set response = services.response.json({ 'foo': 'bar' }) %}
    {% do hook.setResponse(response) %}
{% endblock %}
```
{% endraw %}
{% endcode %}

Caching of responses to GET-request is supported, but you need to implement the `cache_key`-function in your script to provide a cache-key for each response.
The cache-key you generate should take every permutation of the request, that would lead to a different response, into account and should return a unique key for each permutation.
A simple cache-key generation would be to generate a `md5`-hash of all the incoming request parameters, as well as your hook's name:

{% code title="Resources/scripts/store-api-custom-endpoint/my-example-script.twig" %}
{% raw %}
```twig
{% block cache_key %}
    {% set cachePayload = hook.query %}
    {% set cachePayload = cachePayload|merge({'script': 'custom-endpoint'}) %}

    {% do hook.setCacheKey(cachePayload|md5) %}
{% endblock %}
```
{% endraw %}
{% endcode %}

For a complete overview of the available data and services refer to the [reference documentation](../../../../resources/references/app-reference/script-reference/script-hooks-reference.md#store-api-hook).

### Storefront endpoints

Scripts that should be available for the storefront should be stored in a folder prefixed with `storefront-`, so the folder name would be `storefront-{hook-name}`.
The execution of those scripts is possible over the `/storefront/script/{hook-name}` endpoint.
Custom storefront endpoints can be called by a normal browser request or from javascript via ajax.

This endpoint allows POST- and GET-requests.

Caching is supported and enabled by default for GET-requests.

In addition to providing `JsonResponses` you can also render your own templates:

{% code title="Resources/scripts/storefront-custom-endpoint/my-example-script.twig" %}
{% raw %}
```twig
{% set product = services.store.search('product', { 'ids': [productId]}).first %}

{% do hook.page.addExtension('myProduct', product) %}

{% do hook.setResponse(
    services.response.render('@MyApp/storefront/page/custom-page/index.html.twig', { 'page': hook.page })
) %}
```
{% endraw %}
{% endcode %}

Additionally it is also possible to redirect to an existing route:

{% code title="Resources/scripts/storefront-custom-endpoint/my-example-script.twig" %}
{% raw %}
```twig
{% set productId = hook.query['product-id'] %}

{% set response = services.response.redirect('frontend.detail.page', { 'productId': productId }) %}
{% do hook.setResponse(response) %}
```
{% endraw %}
{% endcode %}

For a complete overview of the available data and services refer to the [reference documentation](../../../../resources/references/app-reference/script-reference/script-hooks-reference.md#storefront-hook).

## Caching

To improve the end-user experience and provide a scalable system the customer-facing APIs (that is `store-api` and `storefront`) offer caching mechanism, 
to cache the response to specific requests and return the response from the cache on further requests, instead of  computing it again and again on each request.

By default, caching is enabled for custom endpoints, but for `store-api`-endpoints you have to generate the cache key in the script.
For `storefront` requests however shopware takes care of that, so that responses get automatically cached (if the [HTTP-Cache](../../../../concepts/framework/http_cache.md) is enabled).

### Cache Config

You can configure the caching behaviour for each response on the `response`-object in your scripts.

#### Add custom tags to the cache item

To allow fine grained [cache invalidation](#cache-invalidation) you can tag the response with custom tags and then invalidate certain tags in a `cache-invalidation` script.
{% raw %}
```twig
{% set response = services.response.json({ 'foo': 'bar' }) %}
{% do response.cache.tag('my-custom-tag') %}

{% do hook.setResponse(response) %}
```
{% endraw %}

#### Disable caching

You can opt-out of the caching by calling `cache.disable()`, this means that the response won't be cached.
{% raw %}
```twig
{% set response = services.response.json({ 'foo': 'bar' }) %}
{% do response.cache.disable() %}

{% do hook.setResponse(response) %}
```
{% endraw %}

#### Set the max-age of the cache item

You can specify for how long a response should be cached by calling the `cache.maxAge()` method and pass the number of the seconds after which the cache item should expire.
{% raw %}
```twig
{% set response = services.response.json({ 'foo': 'bar' }) %}
{% do response.cache.maxAge(120) %}

{% do hook.setResponse(response) %}
```
{% endraw %}

#### Invalidate cache items for specific states

You can specify that the cached response is not valid if one of the given states is present.
For more detailed information on the invalidation states refer to the [HTTP-cache docs](../../../../concepts/framework/http_cache.md#sw-states).
{% raw %}
```twig
{% set response = services.response.json({ 'foo': 'bar' }) %}
{% do response.cache.invalidationState('logged-in') %}

{% do hook.setResponse(response) %}
```
{% endraw %}

### Cache invalidation

To prevent serving stale cache items, the cache needs to be invalidated if the underlying data changes.
Therefore, you can add `cache-invalidation` scripts, where you can inspect each write operation that is happening in the system and the invalidate specific cache items by tag.

In your `cache-invalidation` scripts you can get the `ids` of that were written for a specific entity, e.g. `product_manufacturer`.

{% code title="Resources/scripts/cache-invalidation/my-invalidation-script.twig" %}
{% raw %}
```twig
{% set ids = hook.event.getIds('product_manufacturer') %}

{% if ids.empty %}
    {% return %}
{% endif %}
```
{% endraw %}
{% endcode %}

To allow even more fine grained invalidation you can filter down the list of written entities by filtering for specific actions that were performed on that entity (e.g. `insert`, `update`, `delete`) and filter by which properties were changed.

{% code title="Resources/scripts/cache-invalidation/my-invalidation-script.twig" %}
{% raw %}
```twig
{% set ids = hook.event.getIds('product') %}

{% set ids = ids.only('insert') %} // filter by action = insert
{% set ids = ids.with('description', 'parentId') %} // filter all entities were 'description` OR `parentId` was changed
{% if ids.empty %}
    {% return %}
{% endif %}
```
{% endraw %}
{% endcode %}

Note that you can also chain the filter operations:

{% code title="Resources/scripts/cache-invalidation/my-invalidation-script.twig" %}
{% raw %}
```twig
{% set ids = hook.event.getIds('product') %}

{% set ids = ids.only('insert').with('description', 'parentId') %}
{% if ids.empty %}
    {% return %}
{% endif %}
```
{% endraw %}
{% endcode %}

You can then use the filtered down list of ids to invalidate entity specific tags:
{% raw %}
```twig
{% set tags = [] %}
{% for id in ids %}
    {% set tags = tags|merge(['my-product-' ~ id]) %}
{% endfor %}

{% do services.cache.invalidate(tags) %}
```
{% endraw %}
{% endcode %}

For a complete overview of what data and services are available refer to the [cache-invalidation hook reference documentation](../../../../resources/references/app-reference/script-reference/script-hooks-reference.md#cache-invalidation).