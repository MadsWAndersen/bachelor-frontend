<script setup>
import { useUserStore } from "../../stores/user";
const userData = useUserStore();

let fetchResult = ref(""); // Declare a variable to store the fetch result

let username = ref("testing1234");
let password = ref("testing1234");

/* let note = {
    "username": "Welander",
    "password": "UmbracoPassword123"
} */

let login = async () => {
    var requestOptions = {
        method: 'POST',
        headers: {
            "Umb-Project-Alias": "pba-webdev",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            "grant_type": "password",
            "username": username.value,
            "password": password.value
        }),
        redirect: 'follow'
    };
    const { data, pending, error, refresh } = await useFetch("https://cdn.umbraco.io/member/oauth/token", requestOptions);
    userData.Bearer_token = data.value.access_token;
    return { data, pending, error, refresh };
}

</script>

<template>
    <div class="container">
        <div class="container-row">
            <div class="col-span-full">
                <div class="w-full max-w-xs">
                    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                Username
                            </label>
                            <input @keyup.enter="login" v-model="username"
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="username" type="text" placeholder="Username">
                        </div>
                        <div class="mb-6">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                                Password
                            </label>
                            <input @keyup.enter="login" v-model="password"
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="password" type="string" placeholder="******************">
                            <p v-if="!fetchResult.access_token" class="text-red-500 text-xs italic">{{
                                !fetchResult.error_description ?
                                fetchResult.error : fetchResult.error_description }}</p>
                        </div>
                        <div class="flex items-center justify-between">
                            <button @click="login"
                                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button">
                                Sign In
                            </button>
                        </div>
                    </form>

                    {{ data }}
                </div>
            </div>
        </div>


    </div>
</template>

<style lang="scss" scoped></style>