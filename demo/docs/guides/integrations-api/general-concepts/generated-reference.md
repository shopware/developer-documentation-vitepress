# Generated Reference

Shopware generates schemas for both HTTP APIs that can be interpreted by API client libraries or documentation tools, such as Swagger.io:.
<!-- markdown-link-check-disable-next-line -->
{% embed url="https://swagger.io/" caption="" %}

These schemas are generated using PHP annotations based on the [swagger-php](https://github.com/zircote/swagger-php) library. When building API extensions, you can also leverage these annotations to let Shopware generate a standardised endpoint-documentation for your custom endpoints on-the-fly

{% hint style="warning" %}
Due to security restrictions, your **`APP_ENV`** environment variable has to be set to **`dev`** in order to be able to access any of the specifications described below.
{% endhint %}

## Swagger UI

The easiest way to access the generated Swagger UI. Swagger UI is a small library that takes an OpenAPI specification and renders it into a more accessible user interface. Shopware already ships with these user interfaces - they are accessible at the following endpoint relative to their respective base path:

```yaml
/(api|store-api)/_info/swagger.html
```

## OpenAPI Schema

If you don't want to bother with the UI, but just fetch the schema definition instead, use the following endpoint:

```text
/(api|store-api)/_info/openapi3.json
```

## Entity Schema

If you would like to access the schema definitions of all available entities instead of an endpoint reference, use on of the corresponding schema endpoints instead:

```text
/(api|store-api)/_info/open-api-schema.json
```

