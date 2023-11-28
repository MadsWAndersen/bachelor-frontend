<script setup>
import { useUserStore } from "../../stores/user";
const userData = useUserStore();

let fetchResult = ref(""); // Declare a variable to store the fetch result

let username = ref("testing1234");
let password = ref("testing1234");

let login = async () => {
    userData.loading = true;
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

    // saves bearer token in localstorage 
    userData.Bearer_token = data.value.access_token;

    // saves bearer token in localstorage 
    window.localStorage.setItem(
        "Bearer_token", data.value.access_token,
    )



    // fetches user data from Umbraco
    fetchUser();
    return { data, pending, error, refresh };
}

let fetchUser = async () => {
    var requestOptions = {
        method: 'GET',
        headers: {
            "Umb-Project-Alias": "pba-webdev",
            "Authorization": "Basic cDA1ajNJMFF3T0JQMEpRZnBwcUw6"
        },
        redirect: 'follow'
    };
    const { data, pending, error, refresh } = await useFetch("https://api.umbraco.io/member/testing1234", requestOptions);


    // save user infomation in pinia
    window.localStorage.setItem(
        "userInfo", JSON.stringify(data.value),
    )
    userData.loading = false;
    // Redirects user to home page
    await navigateTo('/')

    return { data, pending, error, refresh };
}

</script>

<template>
    <div class="container">
        <div class="container-row">
            <div class="col-span-full" v-if="!userData.loading">

                <div class="w-full max-w-xs">
                    <form class="bg-white shadow-md px-8 pt-6 pb-8 mb-4">
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
                            <div class="btn_logout">
                                <button @click="userData.logout()"
                                    class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                    Logout
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>



        <div class="spinnerContainer" v-if="userData.loading">
            <div class="spinner"></div>
            <div class="loader">
                <p>loading</p>
                <div class="words">
                    <span class="word"></span>
                    <span class="word">Insights</span>
                    <span class="word">Tools</span>
                    <span class="word">Workshops</span>
                    <span class="word">Documentation</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.spinnerContainer {
    position: absolute;
    background-color: #161E3F;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    user-select: none;

}

.spinner {
    width: 66px;
    height: 66px;
    display: grid;
    border: 4px solid #0000;
    border-radius: 50%;
    border-right-color: #C49A96;
    animation: tri-spinner 1s infinite linear;
}

.spinner::before,
.spinner::after {
    content: "";
    grid-area: 1/1;
    margin: 2px;
    border: inherit;
    border-radius: 50%;
    animation: tri-spinner 2s infinite;
}

.spinner::after {
    margin: 8px;
    animation-duration: 3s;
}

@keyframes tri-spinner {
    100% {
        transform: rotate(1turn);
    }
}

.loader {
    color: #fff;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-size: 25px;
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    height: 50px;
    padding: 10px 10px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    border-radius: 8px;
    font-size: 34px;
}

.words {
    overflow: hidden;
}

.word {
    display: block;
    height: 100%;
    padding-left: 6px;
    color: #C49A96;
    animation: cycle-words 5s infinite;
}

@keyframes cycle-words {
    10% {
        -webkit-transform: translateY(-105%);
        transform: translateY(-105%);
    }

    25% {
        -webkit-transform: translateY(-100%);
        transform: translateY(-100%);
    }

    35% {
        -webkit-transform: translateY(-205%);
        transform: translateY(-205%);
    }

    50% {
        -webkit-transform: translateY(-200%);
        transform: translateY(-200%);
    }

    60% {
        -webkit-transform: translateY(-305%);
        transform: translateY(-305%);
    }

    75% {
        -webkit-transform: translateY(-300%);
        transform: translateY(-300%);
    }

    85% {
        -webkit-transform: translateY(-405%);
        transform: translateY(-405%);
    }

    100% {
        -webkit-transform: translateY(-400%);
        transform: translateY(-400%);
    }
}
</style>