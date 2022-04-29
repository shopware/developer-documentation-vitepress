# Setup Template

The setup template is a derivation from the [shopware/production](https://github.com/shopware/production) template. It contains build and deployment logic for Shopware PaaS as well as configuration for infrastructure and services. In this chapter we will have a look at these customizations.

Below is a directory overview of the PaaS setup template.

```
shopware-paas/
├─ .platform/
│  ├─ routes.yaml
│  ├─ services.yaml
├─ bin/
├─ config/
├─ custom/
├─ files/
│  ├─ theme-config/
├─ src/
├─ .platform.app.yaml
```

## [.platform.app.yaml](https://github.com/shopware/paas/blob/main/.platform.app.yaml)

This file contains Shopware PaaS specific configuration and can be customized as needed for your individual project.

### name

Is the name of your app. It's used in commands like

```bash
shopware ssh -A app 'bin/console theme:dump'
```

Unless there's specific need for it, leave it as `app`.

### type

The base image used for your build process.

### variables

This section contains configuration for environment variables or server settings. General store settings and configuration are set here. In this place you can inject custom environment variables or enable feature flags.

Variables in the `env` section are automatically injected as environment variables.

### hooks

Lifecycle hooks are custom scripts that are called during your build and deploy processes. See more on the [deployment process](./build-deploy#push-main-branch).

#### build hook

This script is called during the build process and builds your applications assets and disables the UI installer. You can customize this script if you need.

#### deploy hook

This script is called during the deployment process. Theme configuration is copied, the install scripts are executed and secrets are generated

 * Copy theme configuration
 * Run database migrations
 * Clear cache

If this is the first deployment, the following operations are performed

 * Setup script is executed
 * Theme is set
 * Secrets are generated
 * `installer/installed` file is created

### relationships

This section defines the mapping between services created in the [services.yaml](#platform-services-yaml) and the application itself.

### mounts

By default, the entire storage of your application is read-only. All directories listed here are exempt from this policy.

### web

The public root of your application `public/index.php` is configured, so the server knows where to route dynamic requests.

### workers

Workers are copies of your application instance after the [build hook](#build-hook) has been executed. The are usually configured with a start command. By default there are two configured workers - one for message queues and one for scheduled tasks.

## [.platform / routes.yaml](https://github.com/shopware/paas/blob/main/.platform/routes.yaml)

This file configures, that incoming http requests are routed to the `app` instance.

## [.platform / services.yaml](https://github.com/shopware/paas/blob/main/.platform/services.yaml)

This file contains services which are used by the `app` instances. Depending on your setup, uncomment or add services that you need and they will be created and scaled automatically.

## [config /](https://github.com/shopware/paas/blob/main/config)

The `config` directory contains all applications specific configuration. See more on configurations in our [Infrastructure](../../guides/hosting/infrastructure/) and [Performance](../../guides/hosting/performance/) sections.

Some prominent configurations which have been altered:

| Configuration | Value | Description |
| --- | --- | --- |
| `packages/framework.yaml` | `session` | Redis is configured as default for session |
| `packages/framework.yaml` | `cache` | Redis adapter is set as a app cache |
| `packages/shopware.yaml` | `admin_worker` | Disables the admin worker, because there are [dedicated workers](#workers) |
| `packages/shopware.yaml` | `auto_updater` | Disables the auto updater |

## [files / theme-config](https://github.com/shopware/paas/blob/main/files/theme-config)

We suggest checking in your theme configuration to version control in this directory. Read more on the concept of [builds without database](../../guides/hosting/installation-updates/deployments/build-w-o-db.md) as described in [Theme Build](./theme-build.md).