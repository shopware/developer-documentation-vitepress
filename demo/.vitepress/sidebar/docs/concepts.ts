import { SidebarGroup } from "../../../../../../src/vitepress/config";

const concepts: SidebarGroup[] = [{
    text: "Concepts",
    items: [
    {
        text: "Commerce", link: "/docs/concepts/commerce/README", items: [
            {
                text: "Catalog", link: "/docs/concepts/commerce/catalog/README", items: [
                    { text: "Categories", link: "/docs/concepts/commerce/catalog/categories" },
                    { text: "Products", link: "/docs/concepts/commerce/catalog/products" },
                    { text: "Sales Channels", link: "/docs/concepts/commerce/catalog/sales-channels" }
                ]
            },
            {
                text: "Checkout", link: "/docs/concepts/commerce/checkout-concept/README", items: [
                    { text: "Cart", link: "/docs/concepts/commerce/checkout-concept/cart" },
                    { text: "Payments", link: "/docs/concepts/commerce/checkout-concept/payments" },
                    { text: "Orders", link: "/docs/concepts/commerce/checkout-concept/orders" }
                ]
            },
            {
                text: "Content", link: "/docs/concepts/commerce/core/README", items: [
                    { text: "Shopping Experiences \(CMS\)", link: "/docs/concepts/commerce/core/shopping-experiences-cms" }
                ]
            }
        ]
    },
    {
        text: "Framework", link: "/docs/concepts/framework/README", items: [
            {
                text: "Architecture", link: "/docs/concepts/framework/architecture/README", items: [
                    { text: "Storefront", link: "/docs/concepts/framework/architecture/storefront-concept" },
                    { text: "Administration", link: "/docs/concepts/framework/architecture/administration-concept" }
                ]
            },
            { text: "Data Abstraction Layer", link: "/docs/concepts/framework/data-abstraction-layer" },
            { text: "Messaging", link: "/docs/concepts/framework/messaging" },
            { text: "Migrations", link: "/docs/concepts/framework/migrations" },
            { text: "Rules", link: "/docs/concepts/framework/rules" },
            { text: "HTTP Cache", link: "/docs/concepts/framework/http_cache" },
            { text: "Elasticsearch", link: "/docs/concepts/framework/elasticsearch" },
            { text: "Flow", link: "/docs/concepts/framework/flow-concept" }
        ]
    },
    {
        text: "Extensions", link: "/docs/concepts/extensions/README", items: [
            { text: "Apps", link: "/docs/concepts/extensions/apps-concept" },
            { text: "Plugins", link: "/docs/concepts/extensions/plugins-concept" }
        ]
    },
    {
        text: "API", link: "/docs/concepts/api/README", items: [
            { text: "Store API", link: "/docs/concepts/api/store-api" },
            { text: "Admin API", link: "/docs/concepts/api/admin-api" }
        ]
    }
    ]}];

export default concepts;