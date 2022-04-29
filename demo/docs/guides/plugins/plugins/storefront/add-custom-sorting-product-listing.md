# Add custom sorting for product listing

## Overview

Individual sortings are groups of sorting options which you can use to sort product listings. The sortings are available in the storefront.

This guide will show you how to add individual sorting options using a migration \(manageable\) or at runtime \(non-manageable\).

## Prerequisites

In order to add your own custom sorting for product listings for your plugin, you first need a plugin as base. Therefore, you can refer to the [Plugin Base Guide](../plugin-base-guide.md).

You should also have a look at our [Database migrations](../plugin-fundamentals/database-migrations.md) guide, as we use one in this guide.

## Create individual sorting with migration

In order to make your sorting manageable in the administration by the user, you will need to migrate the data to the database.

Create a new Migration in your plugin:

{% hint style="info" %}
Note: Do not change an existing migration if your plugin is already in use by someone. In that case, create a new Migration instead! This also means, that you have to re-install your plugin if you adjust the migration.
{% endhint %}

{% code title="<plugin root>/src/Migration/Migration1615470599ExampleSorting.php" %}
```php
<?php declare(strict_types=1);

namespace Swag\BasicExample\Migration;

use Doctrine\DBAL\Connection;
use Shopware\Core\Content\Product\SalesChannel\Sorting\ProductSortingDefinition;
use Shopware\Core\Defaults;
use Shopware\Core\Framework\Migration\MigrationStep;
use Shopware\Core\Framework\Uuid\Uuid;

class Migration1615470599ExampleSorting extends MigrationStep
{
    public function getCreationTimestamp(): int
    {
        return 1615470599;
    }

    public function update(Connection $connection): void
    {
        $myCustomSorting = [
            'id' => Uuid::randomBytes(),
            'url_key' => 'my-custom-sort',  // shown in url - must be unique system wide
            'priority' => 5,                // the higher the priority, the further upwards it will be shown in the sortings dropdown in storefront
            'active' => 1,                  // activate / deactivate the sorting
            'locked' => 0,                  // you can lock the sorting here to prevent it from being edited in the administration
            'fields' => json_encode([
                [
                    'field' => 'product.name',  // field to sort by
                    'order' => 'desc',          // asc or desc
                    'priority' => 1,            // in which order the sorting is to applied (higher priority comes first)
                    'naturalSorting' => 0       // apply natural sorting logic to this field
                ],
                // ... more fields
            ]),
            'created_at' => (new \DateTime())->format(Defaults::STORAGE_DATE_TIME_FORMAT),
        ];

        // insert the product sorting
        $connection->insert(ProductSortingDefinition::ENTITY_NAME, $myCustomSorting);

        // insert the translation for the translatable label
        // if you use multiple languages, you will need to update all of them
        $connection->executeStatement(
            'REPLACE INTO product_sorting_translation
             (`language_id`, `product_sorting_id`, `label`, `created_at`)
             VALUES
             (:language_id, :product_sorting_id, :label, :created_at)',
            [
                'language_id' => Uuid::fromHexToBytes(Defaults::LANGUAGE_SYSTEM),
                'product_sorting_id' => $myCustomSorting['id'],
                'label' => 'My Custom Sorting',
                'created_at' => (new \DateTime())->format(Defaults::STORAGE_DATE_TIME_FORMAT),
            ]
        );
    }

    public function updateDestructive(Connection $connection): void
    {
    }
}
```
{% endcode %}

## Create individual sorting at runtime

You can subscribe to the `ProductListingCriteriaEvent` to add a `ProductSortingEntity` as available sorting on the fly. If you don't know how to do this, head over to our [Listening to events](../plugin-fundamentals/listening-to-events.md) guide.

{% hint style="info" %}
While possible, it is not recommended adding an individual sorting at runtime. If you just wish for your individual sorting to be not editable by users in the administration, create a migration and set the parameter `locked` to be `true`.
{% endhint %}

Here's an example how your subscriber could look like:

{% code title="<plugin root>/src/Subscriber/ExampleListingSubscriber.php" %}
```php
<?php declare(strict_types=1);

namespace Swag\BasicExample\Subscriber;

use Shopware\Core\Content\Product\Events\ProductListingCriteriaEvent;
use Shopware\Core\Content\Product\SalesChannel\Sorting\ProductSortingCollection;
use Shopware\Core\Content\Product\SalesChannel\Sorting\ProductSortingEntity;
use Shopware\Core\Framework\Uuid\Uuid;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class ExampleListingSubscriber implements EventSubscriberInterface
{

    public static function getSubscribedEvents(): array
    {
        return [
            // be sure to subscribe with high priority to add you sorting before the default shopware logic applies
            // otherwise storefront will throw a ProductSortingNotFoundException
            ProductListingCriteriaEvent::class => ['addMyCustomSortingToStorefront', 500],
        ];
    }

    public function addMyCustomSortingToStorefront(ProductListingCriteriaEvent $event): void
    {
        /** @var ProductSortingCollection $availableSortings */
        $availableSortings = $event->getCriteria()->getExtension('sortings') ?? new ProductSortingCollection();

        $myCustomSorting = new ProductSortingEntity();
        $myCustomSorting->setId(Uuid::randomHex());
        $myCustomSorting->setActive(true);
        $myCustomSorting->setTranslated(['label' => 'My Custom Sorting at runtime']);
        $myCustomSorting->setKey('my-custom-runtime-sort');
        $myCustomSorting->setPriority(5);
        $myCustomSorting->setFields([
            [
                'field' => 'product.name',
                'order' => 'desc',
                'priority' => 1,
                'naturalSorting' => 0,
            ],
        ]);

        $availableSortings->add($myCustomSorting);

        $event->getCriteria()->addExtension('sortings', $availableSortings);
    }
}
```
{% endcode %}

## Next steps

Are you interested to add a custom filter to your listing in the storefront, as well? Head over to the corresponding guide to learn more about that:

{% page-ref page="add-listing-filters.md" %}

