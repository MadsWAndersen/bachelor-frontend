<script setup>
import Editor from '@tinymce/tinymce-vue'
let localStorageContent = ref();
let headline = ref("");
let issue = ref("");
let versions = ref([]);
let parentId = ref("");
let contentBodyText = ref();
const timeElapsed = Date.now();
const today = new Date(timeElapsed);

onMounted(async () => {
    let x = await ref(
        JSON.parse(window.localStorage.getItem(`documentation`)),
    )
    localStorageContent.value = x.value.childrenData._embedded.content;
})

let addVersion = () => {
    let version = document.querySelector("#versions").value;
    versions.value.push(version);
    document.querySelector("#versions").value = '';
    console.log(versions);
}

let submit = async () => {
    parentId.value = document.querySelector("#parentId").value;
    if (tinymce && tinymce.activeEditor) {
        contentBodyText.value = tinymce.activeEditor.getContent()
    }
    var myHeaders = new Headers();
    myHeaders.append("Umb-Project-Alias", "pba-webdev");
    myHeaders.append("Authorization", "Basic cDA1ajNJMFF3T0JQMEpRZnBwcUw6");
    myHeaders.append("Api-Version", "2");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "name": {
            "$invariant": headline.value
        },
        "contentTypeAlias": "Page",
        "parentId": parentId.value,

        "documentationHeadline": {
            "$invariant": headline.value
        },
        "documentationDescription": {
            "$invariant": issue.value
        },

        "date": {
            "$invariant": today.toLocaleDateString(),
        },
        "version": {
            "$invariant": versions.value
        },
        /*         "image": {
                    "$invariant": "han-solo.png"
                }, */
        "bodyText": {
            "$invariant": contentBodyText.value
        }
    });
    console.log(raw);

    // ping the editors on slack 
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const { data, pending, error, refresh } = await useFetch(
        'https://api.umbraco.io/content',
        requestOptions,
    )
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "text": "event"
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://eocet9yn9ivqaq7.m.pipedream.net", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    // redirects user
    await navigateTo('/documentation')
}
</script>


<template>
    <div class="container-row flex justify-center">
        <div class="col-span-12">
            <h1 class="text-5xl text-um-blue font-semibold ">
                Submit solution
            </h1>
            <p>bread crumbs</p>

            <h2 class="text-xl text-um-blue font-semibold pt-6">
                Create a new solution
            </h2>
            <p class="text-m text-um-black pb-6">Here you will be able to submit a new solution for at workflow
                or a know issue with the accounting</p>

            <div class="flex row w-full mb-5">
                <div class="w-1/2">
                    <p class="w-2/3 text-m font-semibold text-um-blue pt-6 mr-5">Select the category</p>
                    <select id="parentId"
                        class="inline-flex w-2/3 justify-center rounded-t-xs bg-white px-3 p-2 my-3 text-sm font-semibold text-um-blu shadow-sm ring-1 ring-inset ring-um-blue ">
                        <option value="none" selected disabled hidden>Select an category</option>
                        <option @click="selectedParentId()"
                            class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-b-sm bg-white shadow-lg ring-1 ring-black ring-opacity-5 "
                            :value="content.childrenData.id" v-for="content in localStorageContent">{{ content.name }}
                        </option>
                    </select>
                </div>
                <div class="w-1/2">
                    <p class="w-2/3 text-m font-semibold text-um-blue pt-6 mr-5">Select the category</p>
                    <div class="w-full flex">
                        <input
                            class="inline-flex w-3/4 justify-center rounded-xs bg-white px-3 p-2 my-3 text-sm font-semibold text-um-blu shadow-sm ring-1 ring-inset ring-um-blue "
                            @keyup.enter="addVersion()" id="versions" placeholder="type in version">
                        <button @click="addVersion()"
                            class="inline-flex w-1/6 justify-center rounded-xs bg-white px-3 p-2 m-3 text-sm font-semibold text-um-blu shadow-sm ring-1 ring-inset ring-um-blue ">+
                        </button>
                    </div>
                    <div class="w-full flex flex-wrap max-w-sm">
                        <span v-for="version in versions"
                            class="flex row w-[100px] justify-center h-[30px] mr-1 mb-1 items-center bg-um-blue rounded-xs text-xs text-um-palepink font-bold">
                            {{ version }}</span>
                    </div>
                </div>
            </div>

            <div class="w-full">
                <p class="w-2/3 text-m font-semibold text-um-blue pt-6 mr-5">Select the headline</p>
                <input
                    class="inline-flex w-full justify-center rounded-xs bg-white px-3 p-2 my-3 text-sm font-semibold text-um-blu shadow-sm ring-1 ring-inset ring-um-blue "
                    v-model="headline" placeholder="Enter your headline here..." @keyup.enter="console.log(headline)" />

            </div>
            <div class="w-full">
                <p class=" text-m font-semibold text-um-blue pt-6 mr-5">The issue</p>
                <textarea
                    class="inline-flex w-full justify-center rounded-xs bg-white px-3 p-2 my-3 text-sm font-semibold text-um-blu shadow-sm ring-1 ring-inset ring-um-blue "
                    v-model="issue" placeholder="Add description of the issue"></textarea>
            </div>

            <p class="w-2/3 text-m font-semibold text-um-blue pt-6 my-3">Describe the solution</p>
            <Editor api-key="ftvcr0z9nxcc2ozxsls3xowr1dtmrwm2atafqvcxtkw0mob4" :init="{
                plugins:
                    'lists link image table code help wordcount code',
            }" />

            <linkButton class="cursor-pointer mt-5 mb-10" url="" target="_blank" title="Submit solution" :style="'dark'"
                @click="submit()" />
        </div>
    </div>
</template>

<style lang="scss" scoped></style>