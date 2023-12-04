<script setup>
definePageMeta({
    layout: 'login'
})

import { useUserStore } from "../../stores/user";
import { ref } from "vue";
const userData = useUserStore();

let errorMessage = ref(""); // Declare a variable to store the fetch result

let username = ref("testperson");
let password = ref("");

let login = async () => {
    if (!username.value + !password.value) {
        document.querySelector("#username").classList.add("text-um-red")
        document.querySelector("#password").classList.add("text-um-red")
        errorMessage.value = "The username or password is missing."
    } else {
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


        if (!error._object.udMUIHuGdc == false) {
            errorMessage.value = error._object.udMUIHuGdc.data.error;
        }

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

}

let fetchUser = async () => {
    userData.loading = true;
    var requestOptions = {
        method: 'GET',
        headers: {
            "Umb-Project-Alias": "pba-webdev",
            "Authorization": "Basic cDA1ajNJMFF3T0JQMEpRZnBwcUw6"
        },
        redirect: 'follow'
    };
    const { data, pending, error, refresh } = await useFetch("https://api.umbraco.io/member/testperson", requestOptions);
    try {
        const initialResponse = await fetchData("https://cdn.umbraco.io/content/");
        const hrefs = initialResponse._embedded.content.map(
            (content) => content._links.self.href
        );
        detailedData.value = await fetchDetailedData(hrefs);
        window.localStorage.setItem(
            "documentation",
            JSON.stringify(detailedData.value[0])
        );
        // sort documentation
        for (let i = 0; i < detailedData.value[0].childrenData._embedded.content.length; i++) {
            window.localStorage.setItem(
                detailedData.value[0].childrenData._embedded.content[i].name.toLowerCase(),
                JSON.stringify(detailedData.value[0].childrenData._embedded.content[i])
            );
        }
    } catch (err) {
        error.value = err;
    }


    // save user infomation in pinia
    window.localStorage.setItem(
        "userInfo", JSON.stringify(data.value),
    )
    userData.loading = false;
    // Redirects user to home page
    await navigateTo('/')

    return { data, pending, error, refresh };
}



const detailedData = ref(null);
function fetchData(url) {
    return fetch(url, {
        headers: {
            "umb-project-alias": "pba-webdev",
            "Accept-Language": "en-US",
            Authorization: "Basic elFJZk50eEpCYWFidFFDSTNweDg6",
        },
    }).then((response) => response.json());
}

async function fetchRecursive(url) {
    const data = await fetchData(url);
    if (data._embedded && data._embedded.content) {
        await Promise.all(
            data._embedded.content.map(async (item) => {
                if (item._links && item._links.children) {
                    item.childrenData = await fetchRecursive(item._links.children.href);
                }
            })
        );
    }
    return data;
}

async function fetchDetailedData(hrefs) {
    const details = await Promise.all(hrefs.map((href) => fetchData(href)));
    return Promise.all(
        details.map((detail) => {
            if (detail._links && detail._links.children) {
                return fetchRecursive(detail._links.children.href).then(
                    (childrenData) => {
                        return { ...detail, childrenData };
                    }
                );
            }
            return detail;
        })
    );
}

</script>

<template>
    <div class="p-0 lg:col-span-12 ">
        <div class="container-row p-0">
            <div class="lg:col-span-8 h-screen hidden lg:block">
                <img class="h-full object-cover" src="../../assets/image/Pink_Full.png" alt="">
            </div>
            <div class="col-span-4 h-screen flex justify-center items-center" v-if="!userData.loading">

                <div class="col-span-3 w-1/1">
                    <form class="lg:col-span-4 bg-white px-8 pt-6 pb-8 mb-4">
                        <div class="mb-4 text-center">
                            <h1 class="text-5xl text-um-blue font-black p-2">Welcome Back</h1>
                            <p class="text-um-blue font-black pb-6">Log in to the Support Hub</p>
                        </div>
                        <div class="mb-4">
                            <input @keyup.enter="login" v-model="username"
                                class="border-b-2  w-full py-2  text-um-blue leading-tight focus:outline-none focus:shadow-outline"
                                id="username" type="text" placeholder="Username">
                        </div>
                        <div class="mb-6">
                            <input @keyup.enter="login" v-model="password"
                                class="border-b-2 w-full py-2 text-um-blue mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="password" type="password" placeholder="Password">
                            <p class="text-um-red text-xs italic">{{
                                errorMessage }}</p>
                        </div>

                        <div class=" w-full">
                            <!--              <button
                                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button">
                                Sign In
                            </button> -->
                            <linkButton @click="login" class="cursor-pointer" url="" target="_blank" title="Log in"
                                :style="'login'" />
                        </div>
                        <!--                         <div class="btn_logout">
                            <button @click="userData.logout()"
                                class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                Logout
                            </button>
                        </div> -->
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