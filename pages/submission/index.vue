<script setup>
import Editor from '@tinymce/tinymce-vue'
const localStorageContent = ref()
const headline = ref('')
const issue = ref('')
const versions = ref([])
const parentId = ref('')
const contentBodyText = ref()
const timeElapsed = Date.now()
let modal = ref(false);
const today = new Date(timeElapsed)

const changeModal = () => {
	document.querySelector('#parentId').classList.remove('ring-um-red')
	document.querySelector('#issue').classList.remove('ring-um-red')
	document.querySelector('#versions').classList.remove('ring-um-red')
	document.querySelector('#versionBtn').classList.remove('ring-um-red')
	document.querySelector('#bodytext').classList.remove('ring-um-red')
	document.querySelector('#headline').classList.remove('ring-um-red')
	modal.value = !modal.value;
}

onMounted(async () => {
	const x = await ref(
		JSON.parse(window.localStorage.getItem(`documentation`)),
	)
	localStorageContent.value = x.value.childrenData._embedded.content
})

const addVersion = () => {
	const version = document.querySelector('#versions').value
	versions.value.push(version)
	document.querySelector('#versions').value = ''
	console.log(versions)
}

const submit = async () => {
	modal.value = !modal.value;
	parentId.value = document.querySelector('#parentId').value
	if (tinymce && tinymce.activeEditor) {
		contentBodyText.value = tinymce.activeEditor.getContent()
	}
	const myHeaders = new Headers()
	myHeaders.append('Umb-Project-Alias', 'pba-webdev')
	myHeaders.append('Authorization', 'Basic cDA1ajNJMFF3T0JQMEpRZnBwcUw6')
	myHeaders.append('Api-Version', '2')
	myHeaders.append('Content-Type', 'application/json')

	const raw = JSON.stringify({
		name: {
			$invariant: headline.value,
		},
		contentTypeAlias: 'Page',
		parentId: parentId.value,

		documentationHeadline: {
			$invariant: headline.value,
		},
		documentationDescription: {
			$invariant: issue.value,
		},

		date: {
			$invariant: today.toLocaleDateString(),
		},
		version: {
			$invariant: versions.value,
		},
		/*         "image": {
					"$invariant": "han-solo.png"
				}, */
		bodyText: {
			$invariant: contentBodyText.value,
		},
	})

	const requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		redirect: 'follow',
	}
	if (
		headline.value &&
		parentId.value &&
		headline.value &&
		issue.value &&
		versions.value &&
		contentBodyText.value
	) {
		useFetch('https://api.umbraco.io/content', requestOptions)

		// ping the editors on slack
		const myHeaders2 = new Headers()
		myHeaders.append('Content-Type', 'application/json')

		const raw2 = JSON.stringify({
			text: 'event',
		})

		const requestOptions2 = {
			method: 'POST',
			headers: myHeaders2,
			body: raw2,
			redirect: 'follow',
		}

		fetch('https://eocet9yn9ivqaq7.m.pipedream.net', requestOptions2)
			.then((response) => response.text())
			.then((result) => console.log(result))
			.catch((error) => console.log('error', error))

		// redirects user
		await navigateTo('/documentation')
	} else {
		// resets error handling
		document.querySelector('#parentId').classList.remove('ring-um-red')
		document.querySelector('#issue').classList.remove('ring-um-red')
		document.querySelector('#versions').classList.remove('ring-um-red')
		document.querySelector('#versionBtn').classList.remove('ring-um-red')
		document.querySelector('#bodytext').classList.remove('ring-um-red')
		document.querySelector('#headline').classList.remove('ring-um-red')
		if (!headline.value) {
			document.querySelector('#headline').classList.add('ring-um-red')
		}
		if (parentId.value === 'none') {
			console.log(parentId.value)
			document.querySelector('#parentId').classList.add('ring-um-red')
		}
		if (!issue.value) {
			document.querySelector('#issue').classList.add('ring-um-red')
		}
		if (versions.value.length === 0) {
			document.querySelector('#versions').classList.add('ring-um-red')
			document.querySelector('#versionBtn').classList.add('ring-um-red')
		}
		if (!contentBodyText.value) {
			document.querySelector('#bodytext').classList.add('ring-um-red')
		}
	}
}
</script>

<template>
	<ModalBlock v-if="modal === true">
		<h2 class="text-2xl text-um-blue">Are you sure</h2>
		<span class="mb-3 text-um-blue">You are about to update your user informations.</span>

		<div class="flex gap-2 justify-between mt-9">
			<Button class="!w-full" :buttonText="'No cancel'" :style="'neutral'" @click="changeModal()" />
			<Button class="!w-full" :buttonText="'Submit solution'" :style="'dark'" @click="submit()" />
		</div>
	</ModalBlock>
	<div class="container-row flex justify-center">
		<div class="col-span-12 lg:w-1/2 w-2/3">
			<HeroHeader headline="Submission" heroText="" heroBreadCrumbs="submission" />

			<h2 class="text-xl text-um-blue font-semibold pt-6">
				Create a new solution
			</h2>
			<p class="text-m text-um-black pb-6">
				Here you will be able to submit a new solution for at workflow
				or a know issue with the accounting
			</p>

			<div class="lg:flex row  w-full mb-5">
				<div class="lg:w-1/2">
					<p class="w-2/3 text-m font-semibold text-um-blue pt-6 mr-5">
						Select the category
					</p>
					<select id="parentId"
						class="inline-flex lg:w-3/4 w-full justify-center rounded-t-xs bg-white px-3 p-2 my-3 text-sm font-semibold text-um-blu shadow-sm ring-1 ring-inset ring-um-blue">
						<option value="none" selected disabled hidden>
							Select an category
						</option>
						<option v-for="(content, index) in localStorageContent" :key="index"
							class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-b-sm bg-white shadow-lg ring-1 ring-black ring-opacity-5"
							:value="content.childrenData.id" @click="selectedParentId()">
							{{ content.name }}
						</option>
					</select>
				</div>
				<div class="lg:w-1/2 w-full">
					<p class="w-2/3 text-m font-semibold text-um-blue pt-6 mr-5">
						Select the versions
					</p>
					<div class="w-full flex">
						<input id="versions"
							class="inline-flex lg:w-3/4 w-full justify-center rounded-xs bg-white px-3 p-2 my-3 text-sm font-semibold text-um-blu shadow-sm ring-1 ring-inset ring-um-blue"
							placeholder="type in version" @keyup.enter="addVersion()" />
						<button id="versionBtn"
							class="inline-flex w-1/6 justify-center rounded-xs bg-white px-3 p-2 m-3 text-sm font-semibold text-um-blu shadow-sm ring-1 ring-inset ring-um-blue"
							@click="addVersion()">
							+
						</button>
					</div>
					<div class="w-full flex flex-wrap max-w-sm">
						<span v-for="(version, index) in versions" :key="index"
							class="flex row w-[100px] justify-center h-[30px] mr-1 mb-1 items-center bg-um-blue rounded-xs text-xs text-um-palepink font-bold">
							{{ version }}</span>
					</div>
				</div>
			</div>

			<div class="w-full">
				<p class="w-2/3 text-m font-semibold text-um-blue pt-6 mr-5">
					Select the headline
				</p>
				<input id="headline" v-model="headline"
					class="inline-flex w-full justify-center rounded-xs bg-white px-3 p-2 my-3 text-sm font-semibold text-um-blu shadow-sm ring-1 ring-inset ring-um-blue"
					placeholder="Enter your headline here..." @keyup.enter="console.log(headline)" />
			</div>
			<div class="w-full">
				<p class="text-m font-semibold text-um-blue pt-6 mr-5">
					The issue
				</p>
				<textarea id="issue" v-model="issue"
					class="inline-flex w-full justify-center rounded-xs bg-white px-3 p-2 my-3 text-sm font-semibold text-um-blu shadow-sm ring-1 ring-inset ring-um-blue"
					placeholder="Add description of the issue"></textarea>
			</div>

			<p class="w-2/3 text-m font-semibold text-um-blue pt-6 my-3">
				Describe the solution
			</p>
			<div id="bodytext"
				class="m-0 rounded-xs bg-white p-1 text-sm font-semibold text-um-blu shadow-sm ring-1 ring-inset ring-um-blue">
				<Editor api-key="ftvcr0z9nxcc2ozxsls3xowr1dtmrwm2atafqvcxtkw0mob4" :init="{
					plugins:
						'lists link image table code help wordcount code',
				}" />
			</div>
			<linkButton class="cursor-pointer mt-5 mb-10" url="" target="_blank" title="Submit solution" :style="'dark'"
				@click="changeModal()" />
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
