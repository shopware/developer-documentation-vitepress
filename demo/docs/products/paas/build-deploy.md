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

<div class="flex justify-center my-5">

| Build | Deploy |
| --- | --- |
| Configuration validation | Hold app requests | 
| Build container image | Unmount live containers | 
| Installing dependecies | Mount file systems | 
| Run [build hook](./setup-template.md#build-hook) | Run [deploy hook](./setup-template.md#deploy-hook) | 
| Building app image | Serve requests |

</div>

After both steps have been executed successfully (you will get extensive logging about the process), you will be able to see the deploymed store on a link presented at the end of the deployment.

:::warning Theme Assets
It is a known issue, that after the first deployment, theme assets are not compiled during the deployment. For that reason, your store will look unstyled. The [Theme Build](./theme-build.md) section explains how to resolve that issue.
:::