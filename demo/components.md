# Components

A list of Vue components that can be used to style content in the documentation theme.

::: info
You can use Vue.js markup within Markdown files. For more information, see [Vue in Markdown](https://vitepress.vuejs.org/guide/using-vue).
:::

## Markdown Extensions

Vitepress provides a set of markdown extensions that can be used to style code blocks, hints, collapsible elements and more.

<PageRef title="Vitepress Markdown Extensions" sub="All markdown extensions available for usage in the documentation theme" page="https://vitepress.vuejs.org/guide/markdown" target="_blank" />

## PageRef

A block component to reference other pages in the documentation or external pages.

| Property | required | Description                   |
|----------|----------|-------------------------------|
| page     | true     | Path to the page              |
| title    | false    | Title of the page             |
| sub      | false    | Subtitle of the page          |
| icon     | false    | Icon of the reference         |
| target   | false    | href target of the reference  |
| video    | false    | Set, if a video is referenced |

```vue-html
<PageRef
    title="App Store Guidelines"
    page="http://www.shopware.com"
    sub="Guidelines for contributing apps to the store"
    target="_blank"
    video
    />
```

<PageRef
    title="App Store Guidelines"
    page="http://www.shopware.com"
    sub="Guidelines for contributing apps to the store"
    target="_blank"
    video
    />

## Tabs

A component to organize content of different types in tabs.

Each tab is defined by a `Tab` component.

| Property | required | Description      |
|----------|----------|------------------|
| title    | true     | Title of the tab |

Each tab can contain arbitrary content.

````vue-html
<Tabs>
<Tab title="PHP Criteria">

This `criteria` object can be passed to the `EntityRepository::search()` method.

$criteria = new Criteria();
$criteria->addFilter(new EqualsFilter('stock', 10));
```

</Tab>

<Tab title="API Criteria">

Pass this JSON within the request body of your API call.

```json
 {
    "filter": [
        { 
            "type": "equals", 
            "field": "stock", 
            "value": 10
        }    
    ]
}
```
</Tab>
</Tabs>
````

**Example**

<Tabs>
<Tab title="PHP Criteria">

This `criteria` object can be passed to the `EntityRepository::search()` method.

```php
$criteria = new Criteria();
$criteria->addFilter(new EqualsFilter('stock', 10));
```
</Tab>

<Tab title="API Criteria">

Pass this JSON within the request body of your API call.

```json
 {
    "filter": [
        { 
            "type": "equals", 
            "field": "stock", 
            "value": 10
        }    
    ]
}
```
</Tab>
</Tabs>

## CodeBlock

Code blocks are used to display code snippets together with a title or reference to a file.

| Property | required | Description             |
|----------|----------|-------------------------|
| title    | false    | Title of the code block |

````vue-html
<CodeBlock title="src/index.html">

```html
<!doctype html>
<html lang="en">
<head>
    <title>My App</title>
</head>
<body>
    Hello world!
</body>
</html>
```

</CodeBlock>
````

**Example**

<CodeBlock title="src/index.html">

```html
<!doctype html>
<html lang="en">
<head>
    <title>My App</title>
</head>
<body>
    Hello world!
</body>
</html>
```

</CodeBlock>