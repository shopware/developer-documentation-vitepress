<template>
    <div class="shadow-md xl:rounded-xl dark:shadow-none">
        <div class="bg-#f8f9fd dark:bg-#080808 xl:rounded-t-xl p-10 pb-4" v-bind:class="{ 'pb-8': !expanded, 'cursor-pointer': !expanded }" v-on:click="expand()">
                <span class="text-18px mb-2 block font-semibold dark:text-#aaa">{{ title }}</span>
                <div v-if="expanded">
                    <p class="mb-5 leading-6 text-#607182 text-14px">You will be redirected to your <span class="font-medium">Developer Sandbox</span> and receive a confirmation email with your credentials</p>
                    <input v-model="registrationData.sandbox" type="text" placeholder="Name of your sandbox" class="border-1px rounded-md text-14px bg-white dark:bg-#1a1a1a border-#d4d8dc dark:border-#040404 p-3 box-border w-full placeholder:text-#60718280 focus:border-#189eff">
                </div>
        </div>
        <div class="text-xs" v-if="expanded">
            <div class="grid grid-cols-2 bg-#f8f9fd dark:bg-#080808 dark:text-#aaa">
                <div v-on:click="setAccount(false)"
                    class="cursor-pointer text-center px-10 py-5 border-0 border-b-2px"
                    v-bind:class="{ 'hover:border-#189eff': existingAccount, 'border-#189eff': !existingAccount, 'border-#ddd': existingAccount, 'dark:border-#888': existingAccount }">
                    Create Shopware Account
                </div>
                <div v-on:click="setAccount(true)"
                    class="cursor-pointer text-center px-10 py-5 border-0 border-b-2px"
                    v-bind:class="{ 'hover:border-#189eff': !existingAccount, 'border-#189eff': existingAccount, 'border-#ddd': !existingAccount, 'dark:border-#888': !existingAccount }">
                    I already have an account
                </div>
            </div>
            <div class="bg-white dark:bg-#111 p-10 grow xl:rounded-b-xl">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-3">
                    <div class="md:col-span-2 mb-6">
                        <label for="sandbox_email" class="text-14px mb-3 block text-#607182 dark:text-#bbb">Email</label>
                        <input v-model="registrationData.email" type="text" id="sandbox_email" placeholder="Email" class="border-1px rounded-md border-#d4d8dc dark:border-#040404 p-3 box-border w-full placeholder:text-#60718280 focus:border-#189eff">
                    </div>
                    <div v-bind:class="{ 'mb-8': existingAccount, 'md:col-span-2': existingAccount }">
                        <label for="sandbox_password" class="text-14px mb-3 block text-#bbb">Password</label>
                        <input v-model="registrationData.password" type="password" id="sandbox_password" placeholder="Password" class="border-1px rounded-md border-#d4d8dc dark:border-#040404 p-3 box-border w-full placeholder:text-#60718280 focus:border-#189eff">
                    </div>
                    <div class="mb-4" v-if="!existingAccount">
                        <label for="sandbox_password_repeat" class="text-14px mb-3 block text-#bbb">Repeat Password</label>
                        <input v-model="registrationData.passwordRepeat" type="password" id="sandbox_password_repeat" placeholder="Repeat Password" class="border-1px rounded-md border-#d4d8dc dark:border-#040404 p-3 box-border w-full placeholder:text-#60718280 focus:border-#189eff">
                    </div>
                    <div class="md:col-span-2 mb-8" v-if="!existingAccount">
                        <p class="text-#607182bb my-none">
                            <input id="tc" v-model="registrationData.tcAccepted" type="checkbox" class="align-middle" />
                            <label for="tc"> I agree to the <a href="https://shopware.com/en/privacy/" title="Privacy policy" target="_blank">privacy policy</a> and the <a href="https://shopware.com/en/gtc/" title="Terms and conditions" target="_blank">terms and conditions</a></label>
                        </p>
                    </div>
                </div>
                <div>
                    <button v-on:click="createSandbox()" class="create-sandbox cursor-pointer border-none rounded-md p-3 py-4 w-full text-white dark:text-black font-semibold text-14px dark:opacity-80">Create Developer Sandbox</button>
                    <div v-if="error.length > 0" class="rounded-md my-4 w-full text-red box-border">
                        {{ error }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.create-sandbox {
    background-image: url(https://www.shopware.com/media/image/24/73/97/gradient-wavey-rectangle.jpg);
    background-position: center;
    background-size: cover;
}
</style>

<script>

import { reactive, ref, useAttrs } from 'vue';

export default {

    setup () {
        const attrs = useAttrs();

        let title = ref(attrs.title || 'Create Developer Sandbox');

        let expanded = ref(attrs.collapsed !== 'collapsed');

        let expand = () => {
            expanded.value = true
        };

        let registrationData = reactive({
            email: '',
            sandbox: '',
            password: '',
            passwordRepeat: '',
            tcAccepted: false
        });

        let existingAccount = ref(false)

        let setAccount = function (isExisting) {
            console.log("set account", isExisting);
            existingAccount.value = isExisting;
        }

        let error = ref("")

        let createSandbox = function () {
            if (registrationData.tcAccepted) {
                if (registrationData.password === registrationData.passwordRepeat) {
                    console.log(registrationData);
                } else {
                    error.value = "Passwords do not match";
                }
            } else {
                error.value = "Please accept the terms and conditions";
            }
        }

        return {
            registrationData,
            existingAccount,
            setAccount,
            error,
            createSandbox,
            title,
            expanded,
            expand
        }
    }

}
</script>