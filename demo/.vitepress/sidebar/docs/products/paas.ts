import { SidebarGroup } from "../../../../../src/vitepress/config";

const paas: SidebarGroup[] = [
    {
        text: "SHOPWARE PAAS",
        items: [
            {
                text: "Home",
                link: "/docs/products/paas/"
            },
            {
                text: "CLI Setup",
                link: "/docs/products/paas/cli-setup"
            }
        ]
    },
    {
        text: "CONFIGURATION",
        items: [
            {
                text: "Repository",
                link: "/docs/products/paas/repository"
            },
            {
                text: "Build & Deploy",
                link: "/docs/products/paas/build-deploy"
            },
            {
                text: "Setup Template",
                link: "/docs/products/paas/setup-template"
            },
            {
                text: "Theme Build",
                link: "/docs/products/paas/theme-build"
            }
        ]

    },
    {
        text: "SERVICES",
        items: [
            {
                text: "Elasticsearch",
                link: "/docs/products/paas/elasticsearch"
            },
            {
                text: "RabbitMQ",
                link: "/docs/products/paas/rabbitmq"
            },
            {
                text: "Fastly",
                link: "/docs/products/paas/fastly"
            }
        ]
    }
];

export default paas;