<template>
    <div class="bg-white flex flex-col mx-8 2xl:mx-24 mt-10 xl:mt-30 shadow-md xl:rounded-xl">
        <div class="bg-#f8f9fd xl:rounded-t-xl">
            <div class="m-10">
                <h4 class="text-18px mb-2 font-semibold">Get started now</h4>
                <p class="mb-5 leading-6 text-#607182 text-14px">You will be redirected to your <span class="font-medium">Developer Sandbox</span> and receive a confirmation email with your credentials</p>
                <input v-model="registrationData.sandbox" type="text" placeholder="Name of your sandbox" class="border-1px rounded-md text-14px bg-white border-#d4d8dc p-3 box-border w-full placeholder:text-#60718280 focus:border-#189eff">
            </div>
        </div>
        <div class="text-xs">
            <div class="grid grid-cols-2 bg-#f8f9fd">
                <div v-on:click="setAccount(false)"
                    class="cursor-pointer text-center px-10 py-5 border-0 border-b-2px"
                    v-bind:class="{ 'hover:border-#189eff': existingAccount, 'border-#189eff': !existingAccount, 'border-#ddd': existingAccount }">
                    Create Shopware Account
                </div>
                <div v-on:click="setAccount(true)"
                    class="cursor-pointer text-center px-10 py-5 border-0 border-b-2px"
                    v-bind:class="{ 'hover:border-#189eff': !existingAccount, 'border-#189eff': existingAccount, 'border-#ddd': !existingAccount }">
                    I already have an account
                </div>
            </div>
            <div class="bg-white p-10 grow">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-3">
                    <div class="md:col-span-2 mb-6">
                        <label for="sandbox_email" class="text-14px mb-3 block text-#607182">Email</label>
                        <input v-model="registrationData.email" type="text" id="sandbox_email" placeholder="Email" class="border-1px rounded-md border-#d4d8dc p-3 box-border w-full placeholder:text-#60718280 focus:border-#189eff">
                    </div>
                    <div v-bind:class="{ 'mb-8': existingAccount, 'md:col-span-2': existingAccount }">
                        <label for="sandbox_password" class="text-14px mb-3 block text-#607182">Password</label>
                        <input v-model="registrationData.password" type="text" id="sandbox_password" placeholder="Password" class="border-1px rounded-md border-#d4d8dc p-3 box-border w-full placeholder:text-#60718280 focus:border-#189eff">
                    </div>
                    <div class="mb-4" v-if="!existingAccount">
                        <label for="sandbox_password_repeat" class="text-14px mb-3 block text-#607182">Repeat Password</label>
                        <input v-model="registrationData.passwordRepeat" type="text" id="sandbox_password_repeat" placeholder="Repeat Password" class="border-1px rounded-md border-#d4d8dc p-3 box-border w-full placeholder:text-#60718280 focus:border-#189eff">
                    </div>
                    <div class="md:col-span-2 mb-8" v-if="!existingAccount">
                        <p class="text-#607182bb my-none">
                            <input id="tc" v-model="registrationData.tcAccepted" type="checkbox" class="align-middle" />
                            <label for="tc">I agree to the <a href="https://shopware.com/en/privacy/" title="Privacy policy" target="_blank">privacy policy</a> and the <a href="https://shopware.com/en/gtc/" title="Terms and conditions" target="_blank">terms and conditions</a></label>
                        </p>
                    </div>
                </div>
                <div>
                    <button v-on:click="createSandbox()" class="create-sandbox cursor-pointer border-none rounded-md p-3 py-4 w-full text-white font-semibold text-14px">Create Developer Sandbox</button>
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

import { reactive, ref } from 'vue';

export default {

    setup () {
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
            createSandbox
        }
    }

}
</script>