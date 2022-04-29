# Add custom field

## Overview

Shopware's custom field system allows you to extend entities, without writing a complete entity extension. This is possible by storing the additional data in a [JSON-Field](https://dev.mysql.com/doc/refman/8.0/en/json.html). Custom fields therefore can only be used to store scalar values. If you'd like to create associations between entities, you'll need to use an [Entity extension](../data-handling/add-complex-data-to-existing-entities.md).

This guide will cover two similar subjects:

* Supporting custom fields with your entity
* Add custom fields to an entity

## Prerequisites

This guide is built upon both the [Plugin base guide](../../plugin-base-guide.md) as well as the [Add custom complex data](../data-handling/add-custom-complex-data.md) guide. The latter explained how to create your very first entity, which is used in the following examples.

Since migrations will also be used here, it won't hurt to have a look at our guide about [Executing database queries](../../plugin-fundamentals/database-migrations.md).

Also, adding translatable custom fields is covered here in short as well, for which you'll need to understand how translatable entities work in general. This is covered in our guide about [Adding data translations](../data-handling/add-data-translations.md). This subject will **not** be covered in depth in this guide.

## Supporting custom fields with your entity

This short section will cover how to add a custom field support for your custom entity. As previously mentioned, the example from our [Add custom complex data](../data-handling/add-custom-complex-data.md) guide is used and extended here.

In order to support custom fields with your custom entity, there are two steps necessary:

* Add a `CustomFields` field to your `EntityDefinition`
* Add a column `custom_fields` to your entities' database table via migration

Also, you may want to add translatable custom fields, which is also covered in very short here.

### Add custom field to entity definition

Let's assume you already got a working and running entity definition. If you want to support custom fields with your custom entity, you have to add the Data Abstraction Layer \(DAL\) field `CustomFields` to it.

{% code title="<plugin root>/src/Core/Content/Example/ExampleDefinition.php" %}
```php
use Shopware\Core\Framework\DataAbstractionLayer\Field\CustomFields;                                                                    

[...]
class ExampleDefinition extends EntityDefinition
{

    [...]

    protected function defineFields(): FieldCollection
    {
        return new FieldCollection([
            (new IdField('id', 'id'))->addFlags(new Required(), new PrimaryKey()),
            (new StringField('name', 'name')),
            (new StringField('description', 'description')),
            (new BoolField('active', 'active')),

            new CustomFields()
        ]);
    }
}
```
{% endcode %}

Note the new field that was added in the `FieldCollection`. That's already it for your custom entity definition. Now go ahead and add the column to the database.

### Add column in database table

Once again, this example is built upon the [Add custom complex data](../data-handling/add-custom-complex-data.md) guide, which also comes with an example migration. This one will be used in this example here as well.

If you want to support custom fields now, you have to add a new column `custom_fields` of type `JSON` to your migration.

{% code title="<plugin root>/src/Migration/Migration1611664789Example.php" %}
```php
public function update(Connection $connection): void
{
    $sql = <<<SQL
        CREATE TABLE IF NOT EXISTS `swag_example` (
        `id` BINARY(16) NOT NULL,
        `name` VARCHAR(255) COLLATE utf8mb4_unicode_ci,
        `description` VARCHAR(255) COLLATE utf8mb4_unicode_ci,
        `active` TINYINT(1) COLLATE utf8mb4_unicode_ci,

        `custom_fields` json DEFAULT NULL,

        `created_at` DATETIME(3) NOT NULL,
        `updated_at` DATETIME(3),
        PRIMARY KEY (`id`)
        )
        ENGINE = InnoDB
        DEFAULT CHARSET = utf8mb4
        COLLATE = utf8mb4_unicode_ci;
    SQL;
    $connection->executeStatement($sql);
}
```
{% endcode %}

Note the new `custom_fields` column here. It has to be a JSON field and should default to `NULL`, since it doesn't have to contain values.

### Add translatable custom field to entity definition

Make sure to understand entity translations in general first, which is explained here [Add data translations](../data-handling/add-data-translations.md). If you want your custom fields to be translatable, you can simply work with a `TranslatedField` here as well.

{% code title="<plugin root>/src/Core/Content/Example/ExampleDefinition.php" %}
```php
use Shopware\Core\Framework\DataAbstractionLayer\Field\TranslatedField;                                                               

[...]

class ExampleDefinition extends EntityDefinition
{
    [...]

    protected function defineFields(): FieldCollection
    {
        return new FieldCollection([
            (new IdField('id', 'id'))->addFlags(new Required(), new PrimaryKey()),
            (new StringField('name', 'name')),
            (new StringField('description', 'description')),
            (new BoolField('active', 'active')),

            new TranslatedField('customFields'),
        ]);
    }
}
```
{% endcode %}

Just add the `TranslatedField` and apply `customFields` as a parameter.

In your translated entity definition, you then add the `CustomFields` field instead.

{% code title="<plugin root>/src/Core/Content/Example/Aggregate/ExampleTranslation/ExampleTranslationDefinition.php" %}
```php
use Shopware\Core\Framework\DataAbstractionLayer\Field\CustomFields;                                                                    

[...]
class ExampleTranslationDefinition extends EntityTranslationDefinition
{
    [...]

    protected function defineFields(): FieldCollection
    {
        return new FieldCollection([
            (new StringField('name', 'name'))->addFlags(new Required()),

            new CustomFields()
        ]);
    }
}
```
{% endcode %}

## Add custom fields to an entity

The previous section was about adding support for custom fields in your entity, but this section will cover how to add an actual custom field to an entity and how to fill it with data.

Technically, there is no need to define a custom field set and its fields first, before actually inserting values into the `custom_fields` column of your entities' database table via the DAL. Defining a custom field set is only necessary, if you want it to be editable in the administration or if you need validation when writing your custom field.

Because of that, we'll start with filling data to an actual entities' custom field, before actually defining it.

### Filling data into custom fields

So let's assume you've got your own `example` entity up and running and now you want to add data to its custom fields via the DAL.

For that case, you can simply use your entities' repository and start creating or updating entities with custom fields. If you don't understand what's going on here, head over to our guide about [Writing data](../data-handling/writing-data.md) first.

```php
$this->swagExampleRepository->upsert([[
    'id' => '<your ID here>',
    'customFields' => ['swag_example_size' => 15]
]], $context);
```

This will execute perfectly fine and you just saved a custom field with name `swag_example_size` with its value `15` to your entity. And you haven't even defined the custom field `swag_example_size` yet.

As already mentioned, you do not have to define a custom field first before saving it. That's because there is no validation happening here yet, you can write whatever valid JSON you want to that column, so the following example would also execute without any issues:

```php
$this->swagExampleRepository->upsert([[
    'id' => '<your ID here>',
    'customFields' => [ 'foo' => 'bar', 'baz' => [] ]
]], $context);
```

### Adding an actual custom field

You can skip this section if you do not want your new custom field to be editable in the administration.

So now you've already filled the custom fields of one of your entity instances via code. But what if you want your user to do that, which is the more common case?

Only if you want your custom field to show up in the administration and to be editable in there, you have to define the custom fields first in a custom field set. For this you have to use the custom fieldset repository, which can be retrieved from the dependency injection container via the `custom_field_set.repository` key and is used like any other repository. If you don't know how that is done, head over to our guide regarding [Writing data](../data-handling/writing-data.md).

Now use the `create` method of the repository to create a new custom field set.

```php
use Shopware\Core\System\CustomField\CustomFieldTypes;

[...]

$this->customFieldSetRepository->create([
    [
        'name' => 'swag_example_set',
        'config' => [
            'label' => [
                'en-GB' => 'English custom field set label',
                'de-DE' => 'German custom field set label'
            ]
        ],
        'customFields' => [
            [
                'name' => 'swag_example_size',
                'type' => CustomFieldTypes::INT,
                'config' => [
                    'label' => [
                        'en-GB' => 'English custom field label',
                        'de-DE' => 'German custom field label'
                    ],
                    'customFieldPosition' => 1
                ]
            ]
        ]
    ]
], $context);
```

This will now create a custom field set with the name `swag_example_set` and the field we already used in the previous step, `swag_example_size`. This time we also define its type, which should be of type integer here. The type is important to mention, because the administration will use this information to display a proper field. Also, when trying to write the custom field `swag_example_size`, the value has to be an integer.

Also we've taken care of adding translated labels to both the field and the set, which are going to be displayed in the administration. If you have several custom fields and want to order them within a specific order, you can do so with the `customFieldPosition` property.

{% hint style="warning" %}
Custom field sets are deletable by the shop administrator, so you cannot rely on their existence.
{% endhint %}

While theoretically your custom field is now properly defined for the administration, you'll still have to do some work in your custom entities' administration module. Head over to this guide to learn how to add your field to the administration:

{% page-ref page="../../administration/using-custom-fields.md" %}

## Next steps

If you want to extend an entity with new associations and non-scalar values, head over to our guide regarding [Extending existing entities](../data-handling/add-complex-data-to-existing-entities.md).

