# Build & Deploy

Now that we've set up the repository, we're ready to push changes to your PaaS environment.

The main idea is, that your PaaS project is a git repository. Every time you push to your repository, a new version of your store will be created from the source code and deployed. Different environments (e.g. dev-previews, staging and production) are mapped by respective branches.

## Push main branch

To push your latest changes, run the following commands from your terminal:

```bash{3}
git add .
git commit -m "Applied new configuration"
git push -u platform main
```

First, we stage all changes and then add them as a new commit. Afterwards we push them to our `platform` origin (remember, the one for our PaaS environment) on the `main` branch.

This will trigger a new build with a subsequent deploy, consisting of the following (and more) steps.

| Build | Deploy |
| --- | --- |
| Configuration validation | Hold app requests | 
| Build container image | Unmount live containers | 
| Installing dependecies | Mount file systems | 
| Run [build hook](./setup-template.md#build-hook) | Run [deploy hook](./setup-template.md#deploy-hook) | 
| Building app image | Serve requests |

After both steps have been executed successfully (you will get extensive logging about the process), you will be able to see the deploymed store on a link presented at the end of the deployment.

## First deployment

{% hint style="warning" %}
**Theme Assets**

It is a known issue, that after the first deployment, theme assets are not compiled during the deployment. For that reason, your store will look unstyled. The [Theme Build](./theme-build.md) section explains how to resolve that issue.
{% endhint %}

The first time the site is deployed, Shopware's command line installer will run and initialize Shopware. It will not run again unless the `installer/installed` file is removed. **Do not remove that file unless you want the installer to run on the next deploy.**

The installer will create an administrator account with the default credentials

| username | password |
|---|---|
| `admin` | `shopware` |

Make sure to change this password immediately in your administration account settings. Not doing so is a security risk.

