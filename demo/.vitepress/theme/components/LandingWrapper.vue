<template>
    <div class="grid xl:grid-cols-2 gap-10 2xl">
        <div class="mx-8 2xl:mx-0 mt-16 xl:mt-28">
            <h2 class="text-3rem font-extrabold leading-15 mb-5 mt-0">Create your personal Developer Sandbox</h2>
            <!-- <p class="text-#999 text-16px subpixel-antialiased my-0">Get started developing integrations, apps or frontends from your personal dashboard.</p> -->
            <p class="text-#999 text-16px subpixel-antialiased my-0">And start developing, testing, or exploring the features Shopware has to offer.</p>

            <div class="grid sm:grid-cols-2 gap-10 mt-14">
                <ActionItem heading="Headless Frontends">
                    Build custom frontends on top of our Store API and get going with our quick start tutorials or dedicated SDKs for API development.
                </ActionItem>
                <ActionItem heading="App Scripts">
                    Customize functionality of your store, store and load additional data or add custom logic wherever you need it. Ready to run within minutes.
                </ActionItem>
                <ActionItem heading="Themes">
                    Create your individual storefront theme from scratch, learn how to apply custom styles and deploy it to your store.
                </ActionItem>
                <ActionItem heading="API Integrations">
                    Understand how to integrate Shopware with third-party services and build custom integrations with our SDKs.
                </ActionItem>
            </div>
        </div>
        <div class="flex flex-col mx-8 2xl:mx-0 mt-10 xl:mt-30">
            <RegistrationForm title="Get started now" />
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Poppins:wght@800&display=swap');

* {
  font-family: 'Inter', sans-serif;
}

body {
  margin: 0px;
  padding: 0px;
  color: #333;
  font-family: 'Inter', sans-serif;
}

a {
  color: #189eff;
  text-decoration: none;
}

h2 {
    font-family: 'Poppins', sans-serif;
    color: #189eff;
    background-image: url(https://www.shopware.com/media/image/24/73/97/gradient-wavey-rectangle.jpg);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-position: center;
    background-size: cover;
}
</style>