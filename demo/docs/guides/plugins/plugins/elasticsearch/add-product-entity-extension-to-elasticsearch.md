# Adding product entity extension to elasticsearch

## Overview

In this guide you'll learn how to add extended fields of the product entity to the elasticsearch engine to make it searchable.

In this example we'll assume an extension of the `ProductDefinition` with a string field `customString` like described in [Adding Complex data to existing entities](../framework/data-handling/add-complex-data-to-existing-entities.md#adding-a-field-without-database).

## Prerequisites

This guide is built upon the [Plugin Base Guide](../plugin-base-guide.md), and the entity extension described in [Adding Complex data to existing entities](../framework/data-handling/add-complex-data-to-existing-entities.md#adding-a-field-without-database).
We will extend the product extension with an `OneToOneAssociationField` and `OneToManyAssociationField`. 

## Decorate the ElasticsearchProductDefinition

To extend the elasticsearch definition we need to extend the product definition first and add the subscriber. This is described in the above mentioned articles.
Here we show you how this could look like in the end.

The service.xml with all needed definitions.
{% code title="<plugin root>/src/Core/Content/DependencyInjection/product.xml" %}
```xml
<?xml version="1.0" ?>

<container xmlns="http://symfony.com/schema/dic/services"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="http://symfony.com/schema/dic/services http://symfony.com/schema/dic/services/services-1.0.xsd">

    <services>
        <service id="Swag\BasicExample\Extension\Content\Product\CustomExtension">
            <tag name="shopware.entity.extension"/>
        </service>

        <service id="Swag\BasicExample\Extension\Content\Product\OneToOneExampleExtensionDefinition">
            <tag name="shopware.entity.definition" entity="one_to_one_swag_example_extension" />
        </service>

        <service id="Swag\BasicExample\Extension\Content\Product\OneToManyExampleExtensionDefinition">
            <tag name="shopware.entity.definition" entity="one_to_many_swag_example_extension" />
        </service>

        <service id="Swag\BasicExample\Subscriber\ProductSubscriber">
            <tag name="kernel.event_subscriber"/>
        </service>

        <service id="Swag\BasicExample\Elasticsearch\Product\MyProductEsDecorator" decorates="Shopware\Elasticsearch\Product\ElasticsearchProductDefinition">
            <argument type="service" id="Swag\BasicExample\Elasticsearch\Product\MyProductEsDecorator.inner"/>
            <argument type="service" id="Doctrine\DBAL\Connection"/>
        </service>
    </services>
</container>
```
{% endcode %}

The product extension `CustomExtension.php` provides the extensions to the product entity.
{% code title="<plugin root>/src/Extension/Content/Product/CustomExtension.php" %}
```php
<?php declare(strict_types=1);

namespace Swag\BasicExample\Extension\Content\Product;

use Shopware\Core\Content\Product\ProductDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\EntityExtension;
use Shopware\Core\Framework\DataAbstractionLayer\Field\ObjectField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\OneToManyAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\OneToOneAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Runtime;

class CustomExtension extends EntityExtension
{
    public function extendFields(FieldCollection $collection): void
    {
        //Add ApiAware flag to make this field searchable
        $collection->add(
            (new OneToOneAssociationField('oneToOneExampleExtension', 'id', 'product_id', OneToOneExampleExtensionDefinition::class, true))->addFlags(new ApiAware())
        );
        //Add ApiAware flag to make this field searchable
        $collection->add(
            (new OneToManyAssociationField('oneToManyExampleExtension', OneToManyExampleExtensionDefinition::class, 'product_id'))->addFlags(new ApiAware())
        );
        //Runtime fields are not searchable
        $collection->add(
            (new ObjectField('custom_string', 'customString'))->addFlags(new Runtime())
        );
    }

    public function getDefinitionClass(): string
    {
        return ProductDefinition::class;
    }
}
```
{% endcode %}

The entity definition `OneToManyExampleExtensionDefinition.php`.
{% code title="<plugin root>/src/Extension/Content/Product/OneToManyExampleExtensionDefinition.php" %}
```php
<?php declare(strict_types=1);

namespace Swag\BasicExample\Extension\Content\Product;

use Shopware\Core\Content\Product\ProductDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Field\FkField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\ApiAware;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IdField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\ManyToOneAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\ReferenceVersionField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\StringField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use Shopware\Core\Framework\DataAbstractionLayer\Entity;

class OneToManyExampleExtensionDefinition extends EntityDefinition
{
    public const ENTITY_NAME = 'one_to_many_swag_example_extension';

    public function getEntityName(): string
    {
        return self::ENTITY_NAME;
    }

    public function getEntityClass(): string
    {
        return Entity::class;
    }

    protected function defineFields(): FieldCollection
    {
        return new FieldCollection([
            (new IdField('id', 'id'))->addFlags(new ApiAware(), new Required(), new PrimaryKey()),
            new FkField('product_id', 'productId', ProductDefinition::class),
            (new ReferenceVersionField(ProductDefinition::class))->addFlags(new Required()),
            (new StringField('custom_string', 'customString'))->addFlags(new ApiAware()),

            new ManyToOneAssociationField('product', 'product_id', ProductDefinition::class),
        ]);
    }
}
```
{% endcode %}

The entity definition `OneToOneExampleExtensionDefinition.php`.
{% code title="<plugin root>/src/Extension/Content/Product/OneToOneExampleExtensionDefinition.php" %}
```php
<?php declare(strict_types=1);

namespace Swag\BasicExample\Extension\Content\Product;

use Shopware\Core\Content\Product\ProductDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Field\FkField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\ApiAware;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IdField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\OneToOneAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\ReferenceVersionField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\StringField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use Shopware\Core\Framework\DataAbstractionLayer\Entity;

class OneToOneExampleExtensionDefinition extends EntityDefinition
{
    public const ENTITY_NAME = 'one_to_one_swag_example_extension';

    public function getEntityName(): string
    {
        return self::ENTITY_NAME;
    }

    public function getEntityClass(): string
    {
        return Entity::class;
    }

    protected function defineFields(): FieldCollection
    {
        return new FieldCollection([
            (new IdField('id', 'id'))->addFlags(new ApiAware(), new Required(), new PrimaryKey()),
            new FkField('product_id', 'productId', ProductDefinition::class),
            (new ReferenceVersionField(ProductDefinition::class))->addFlags(new Required()),
            (new StringField('custom_string', 'customString'))->addFlags(new ApiAware()),

            new OneToOneAssociationField('product', 'product_id', 'id', ProductDefinition::class, false)
        ]);
    }
}

```
{% endcode %}

Here is a decoration to add a new field named `customString`, an `oneToOneAssociationField` named `oneToOneExampleExtension` and an `oneToManyAssociationField` named `oneToManyExampleExtension` to the index.
For adding more information from the database you should execute a single query with all document ids `(array_column($documents, 'id'))` and map the values.

{% code title="<plugin root>/src/Elasticsearch/Product/MyProductEsDecorator.php" %}
```php
<?php

namespace Swag\BasicExample\Elasticsearch\Product;

use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;
use Shopware\Elasticsearch\Framework\AbstractElasticsearchDefinition;
use Shopware\Elasticsearch\Framework\Indexing\EntityMapper;
use Doctrine\DBAL\Connection;
use Swag\BasicExample\Subscriber\ProductSubscriber;

class MyProductEsDecorator extends AbstractElasticsearchDefinition
{
    private AbstractElasticsearchDefinition $productDefinition;
    private Connection $connection;

    public function __construct(AbstractElasticsearchDefinition $productDefinition, Connection $connection)
    {
        $this->productDefinition = $productDefinition;
        $this->connection = $connection;
    }

    public function getEntityDefinition(): EntityDefinition
    {
        return $this->productDefinition->getEntityDefinition();
    }

    /**
     * Extend the mapping with your own changes
     * Take care to get the default mapping first by `$this->productDefinition->getMapping($context);`
     */
    public function getMapping(Context $context): array
    {
        $mapping = $this->productDefinition->getMapping($context);

        //The mapping for a simple keyword field
        $mapping['properties']['customString'] = EntityMapper::KEYWORD_FIELD;

        // Adding an association as keyword
        $mapping['properties']['oneToOneExampleExtension'] = [
                'type' => 'nested',
                'properties' => [
                    'customString' => EntityMapper::KEYWORD_FIELD,
            ],
        ];

        // Adding a nested field with id
        $mapping['properties']['oneToManyExampleExtension'] = [
            'type' => 'nested',
            'properties' => [
                'id' => EntityMapper::KEYWORD_FIELD,
            ],
        ];

        return $mapping;
    }

    public function fetch(array $ids, Context $context): array
    {
        $documents = $this->productDefinition->fetch($ids, $context);

        $associationOneToOne = $this->fetchOneToOneExample($ids);
        $associationOneToMany = $this->fetchOneToManyExample($ids);

        foreach ($documents as &$document) {
            /**
             * A field directly on the product.
             * The value should be filled with the same Runtime value which will be set by the ProductSubscriber
             */
            $document['customString'] = ProductSubscriber::getRuntimeValue($document['id'])->getValue();


            /**
             * Field with value from associated entity
             */
            if (isset($associationOneToOne[$document['id']])) {
                $document['oneToOneExampleExtension']['customString'] = $associationOneToOne[$document['id']];
            }

            /**
             * Field with multiple id entrys from associated entity
             */
            if (isset($associationOneToMany[$document['id']])) {
                $document['oneToManyExampleExtension'] = array_map(function (string $id) {
                    return ['id' => $id];
                }, array_filter(explode('|', $associationOneToMany[$document['id']] ?? '')));
            }
        }

        return $documents;
    }

    /**
     * Read the associated entries directly from the database
     */
    private function fetchOneToOneExample(array $ids): array
    {
        $query = <<<SQL
            SELECT LOWER(HEX(product_id)) as id, custom_string
            FROM one_to_one_swag_example_extension
            WHERE
                product_id IN(:ids)
        SQL;


        return $this->connection->fetchAllKeyValue(
            $query,
            [
                'ids' => $ids,
            ],
            [
                'ids' => Connection::PARAM_STR_ARRAY
            ]
        );
    }

    /**
     * Read the associated entries directly from the database
     */
    private function fetchOneToManyExample(array $ids): array
    {
        $query = <<<SQL
            SELECT LOWER(HEX(product_id)) as id, GROUP_CONCAT(id SEPARATOR "|")
            FROM one_to_many_swag_example_extension
            WHERE
                product_id IN(:ids)
        SQL;


        return $this->connection->fetchAllKeyValue(
            $query,
            [
                'ids' => $ids,
            ],
            [
                'ids' => Connection::PARAM_STR_ARRAY
            ]
        );
    }
}

```
{% endcode %}