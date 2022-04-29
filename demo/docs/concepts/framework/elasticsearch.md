# Elasticsearch

Elasticsearch is a NoSQL Database focused on search capabilities to act as a search engine.
The Shopware implementation of Elasticsearch provides an integrated way to improve the performance of product and category searches.
To use Elasticsearch for your shop take a look at our [elasticsearch guide](../../guides/hosting/infrastructure/elasticsearch/elasticsearch-setup.md)

## Concept

### Enabling Elasticsearch for your search
Elasticsearch is only used in searches that are explicitly defined.
This is by default set to the `ProductSearchRoute`, `ProductListingRoute` and `ProductSuggestRoute`.
To use elasticsearch on your own searches make sure to add the elasticsearch aware state to your criteria.

{% hint style="info" %}
If the Elasticsearch query fails, the data is loaded using MySQL. You can disable this behavior by setting the environment variable `SHOPWARE_ES_THROW_EXCEPTION=1`
{% endhint %}

```php
$criteria = new \Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria();
$context = \Shopware\Core\Framework\Context::createDefaultContext();
// Enables elasticsearch for this search
$context->addState(\Shopware\Core\Framework\Context::STATE_ELASTICSEARCH_AWARE);

$repository->search($criteria, $context);
```

### ElasticsearchDefinition
To provide Elasticsearch for an entity a corresponding `ElasticsearchDefinition` needs to be added. Currently, Shopware has such a definition for the product entity called `ProductElasticsearchDefinition`.
This definition defines the fields which are provided to elasticsearch and how they are aggregated.

### ElasticsearchEntitySearcher
The `ElasticsearchEntitySearcher` decorates the `EntitySearcher` to map the entity search to the elasticsearch structure.
The `ElasticsearchEntitySearcher` returns an `IdSearchResult` hydrated by the `ElasticsearchEntitySearchHydrator` as the `EntitySearcher` does and this result is used to read the found ids from the database.

### ElasticsearchEntityAggregator
The `ElasticsearchEntityAggregator` does the same as the `ElasticsearchEntitySearcher` for aggregations.

### CriteriaParser
The `CriteriaParser` parses the criteria to an elasticsearch specific notation.

### ProductSearchBuilder
The product search has a special `ProductSearchBuilder` in the core and so has the elasticsearch extension a corresponding extension for the `ProductSearchBuilder`.
This extension matches the queries of the core `ProductSearchBuilder` to the elasticsearch notation.

### ProductUpdater
The `ProductUpdater` listens to the `ProductIndexerEvent` and triggers the `ElasticsearchIndexer` on changes to a `ProductEntity` 

## Commands

### es:index:cleanup
The command `es:index:cleanup` deletes outdated elasticsearch indexes.
The parameter `-f` will skip the confirmation.

### es:create:alias
The command `es:create:alias` refreshes the current elasticsearch index and sets the alias to the index name without the timestamp (which will make this index the active index).
This will happen automatically when a new index is published, so this command can force the alias creation for testing purposes or if something went wrong.

### es:index
The command `es:index` re-indexes all configured entities to elasticsearch.

### es:reset
The command `es:reset` resets all active indices and clears the queue. This command should be used only if an index is corrupted or needs to be setup completely from scratch.

### es:status
The command `es:status` returns the status of all current elasticsearch indices.

### es:test:analyzer
The command `es:test:analyzer` runs an elasticsearch analyzer on your indices. For more details on elasticsearch analyzers take a look on the elasticsearch reference [(external link)](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-analyzers.html).

## Customize the Elasticsearch integration
To customize the Elasticsearch integration or add own fields and entities refer to the [elasticsearch extension guide](../../guides/plugins/plugins/elasticsearch)
