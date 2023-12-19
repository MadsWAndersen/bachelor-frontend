<script setup>
import { ref } from 'vue'
import { useUserStore } from '../../stores/user'

definePageMeta({
	layout: 'login',
})

const userData = useUserStore()

const errorMessage = ref('') // Declare a variable to store the fetch result

const username = ref('testperson')
const password = ref('')

const login = async () => {
	// error handeling 
	if (!username.value + !password.value) {
		document.querySelector('#username').classList.add('text-um-red')
		document.querySelector('#password').classList.add('text-um-red')
		errorMessage.value = 'The username or password is missing.'
	} else {
		// fetch bearertoken
		const requestOptions = {
			method: 'POST',
			headers: {
				'Umb-Project-Alias': 'pba-webdev',
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams({
				grant_type: 'password',
				username: username.value,
				password: password.value,
			}),
			redirect: 'follow',
		}
		const { data, pending, error, refresh } = await useFetch(
			'https://cdn.umbraco.io/member/oauth/token',
			requestOptions,
		)

		if (!error._object.udMUIHuGdc === false) {
			errorMessage.value = error._object.udMUIHuGdc.data.error
		}

		// saves bearer token in pinia
		userData.bearerToken = data.value.access_token

		// saves bearer token in localstorage
		window.localStorage.setItem('bearerToken', data.value.access_token)
		// fetches user data from Umbraco
		fetchUser()
		return { data, pending, error, refresh }
	}
}

<<<<<<< HEAD
const fetchUser = async () => {
	// starts spinner 
	userData.loading = true

	// fetches user infomation
	const requestOptions = {
		method: 'GET',
		headers: {
			'Umb-Project-Alias': 'pba-webdev',
			Authorization: 'Basic cDA1ajNJMFF3T0JQMEpRZnBwcUw6',
=======
// Helper function to set local storage items
const setLocalStorageItem = (key, value) => {
	window.localStorage.setItem(key, JSON.stringify(value))
}

// Function to fetch and process detailed data
const processDetailedData = async (hrefs) => {
	const detailedData = await fetchDetailedData(hrefs)
	;['documentation', 'insights', 'tools', 'workshop'].forEach(
		(key, index) => {
			setLocalStorageItem(key, detailedData[index])
			detailedData[index].childrenData._embedded.content.forEach(
				(content) => {
					setLocalStorageItem(content.name.toLowerCase(), content)
				},
			)
>>>>>>> 622e7d433c6d628fee1ddb950959ae867fee99fc
		},
	)
<<<<<<< HEAD

	// fetches all content from backoffice
=======
}

// Main function to fetch user data
const fetchUser = async () => {
	userData.loading = true

>>>>>>> 622e7d433c6d628fee1ddb950959ae867fee99fc
	try {
		const requestOptions = {
			method: 'GET',
			headers: {
				'Umb-Project-Alias': 'pba-webdev',
				Authorization: 'Basic cDA1ajNJMFF3T0JQMEpRZnBwcUw6',
			},
			redirect: 'follow',
		}

		// Fetch user data
		const { data } = await useFetch(
			`https://api.umbraco.io/member/${username.value}`,
			requestOptions,
		)
		setLocalStorageItem('userInfo', data.value)

		// Fetch and process detailed data
		const initialResponse = await fetchData(
			'https://cdn.umbraco.io/content/',
		)

		// gets urls for all content sections
		const hrefs = initialResponse._embedded.content.map(
			(content) => content._links.self.href,
		)
<<<<<<< HEAD


		// stores all content from fetchDetailsData
		detailedData.value = await fetchDetailedData(hrefs)

		// sort and save content to localstorage
		window.localStorage.setItem(
			'documentation',
			JSON.stringify(detailedData.value[0]),
		)
		window.localStorage.setItem(
			'insights',
			JSON.stringify(detailedData.value[1]),
		)
		window.localStorage.setItem(
			'tools',
			JSON.stringify(detailedData.value[2]),
		)

		window.localStorage.setItem(
			'workshop',
			JSON.stringify(detailedData.value[3]),
		)
		// sort documentation categories
		for (
			let i = 0;
			i < detailedData.value[0].childrenData._embedded.content.length;
			i++
		) {
			window.localStorage.setItem(
				detailedData.value[0].childrenData._embedded.content[
					i
				].name.toLowerCase(),
				JSON.stringify(
					detailedData.value[0].childrenData._embedded.content[i],
				),
			)
		}

=======
		await processDetailedData(hrefs)

		// Redirects user to home page
		await navigateTo('/')
>>>>>>> 622e7d433c6d628fee1ddb950959ae867fee99fc
	} catch (err) {
		error.value = err
	} finally {
		userData.loading = false
	}
<<<<<<< HEAD

	// save user infomation in localstorage
	window.localStorage.setItem('userInfo', JSON.stringify(data.value))

	// stop spinner
	userData.loading = false
	// Redirects user to home page
	await navigateTo('/')

	return { data, pending, error, refresh }
}

const detailedData = ref(null)
// fetch function
=======
}

const detailedData = ref(null)

>>>>>>> 622e7d433c6d628fee1ddb950959ae867fee99fc
function fetchData(url) {
	return fetch(url, {
		headers: {
			'umb-project-alias': 'pba-webdev',
			'Accept-Language': 'en-US',
			Authorization: 'Basic elFJZk50eEpCYWFidFFDSTNweDg6',
		},
	}).then((response) => response.json())
}

// loops until there is no more _links then returns its data layer
// returns nested content
async function fetchRecursive(url) {
	const data = await fetchData(url)
	if (data._embedded && data._embedded.content) {
		await Promise.all(
			data._embedded.content.map(async (item) => {
				if (item._links && item._links.children) {
					item.childrenData = await fetchRecursive(
						item._links.children.href,
					)
				}
			}),
		)
	}
	return data
}

//Loops though all the hrefs from the backoffice, for each href it uses fetchRecursive til get its content. Return all the content
async function fetchDetailedData(hrefs) {
	const details = await Promise.all(hrefs.map((href) => fetchData(href)))
	return Promise.all(
		details.map((detail) => {
			if (detail._links && detail._links.children) {
				return fetchRecursive(detail._links.children.href).then(
					(childrenData) => {
						return { ...detail, childrenData }
					},
				)
			}
			return detail
		}),
	)
}
</script>

<template>
	<div class="p-0 lg:col-span-12">
		<div class="container-row p-0">
			<div class="lg:col-span-8 h-screen hidden lg:block">
				<img class="h-full object-cover" src="../../assets/image/Pink_Full.png" alt="" />
			</div>
			<div v-if="!userData.loading" class="col-span-4 h-screen flex justify-center items-center">
				<div class="col-span-3 w-1/1">
					<form class="lg:col-span-4 bg-white px-8 pt-6 pb-8 mb-4">
						<div class="mb-4 text-center">
							<h1 class="text-5xl text-um-blue font-semibold p-2">
								Welcome Back
							</h1>
							<p class="text-um-blue font-black pb-6">
								Log in to the Support Hub
							</p>
						</div>
						<div class="mb-4">
							<input id="username" v-model="username"
								class="border-b-2 w-full py-2 text-um-blue leading-tight focus:outline-none focus:shadow-outline"
								type="text" placeholder="Username" @keyup.enter="login" />
						</div>
						<div class="mb-6">
							<input id="password" v-model="password"
								class="border-b-2 w-full py-2 text-um-blue mb-3 leading-tight focus:outline-none focus:shadow-outline"
								type="password" placeholder="Password" @keyup.enter="login" />
							<p class="text-um-red text-xs italic">
								{{ errorMessage }}
							</p>
						</div>

						<div class="w-full">
<<<<<<< HEAD
							<!--              <button
                                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button">
                                Sign In
                            </button> -->
							<linkButton class="cursor-pointer" url="" target="_blank" title="Log in" :style="'login'"
=======
							<linkButton
								class="cursor-pointer"
								url=""
								target="_blank"
								title="Log in"
								:style="'login'"
>>>>>>> 622e7d433c6d628fee1ddb950959ae867fee99fc
								@click="login" />
						</div>
					</form>
				</div>
			</div>
		</div>

		<div v-if="userData.loading" class="spinnerContainer">
			<div class="spinner"></div>
			<div class="loader w-3/4">
				<p class="basis-1/2 text-end">loading</p>
				<div class="words basis-1/2 w-full">
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
	background-color: #161e3f;
	width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	user-select: none;

	.spinner {
		width: 66px;
		height: 66px;
		display: grid;
		border: 4px solid #0000;
		border-radius: 50%;
		border-right-color: #c49a96;
		animation: tri-spinner 1s infinite linear;

		@media (max-width: 800px) {
			width: 33px;
			height: 33px;
		}

		&::before,
		&::after {
			content: '';
			grid-area: 1/1;
			margin: 2px;
			border: inherit;
			border-radius: 50%;
			animation: tri-spinner 2s infinite;
		}

		&::after {
			margin: 8px;
			animation-duration: 3s;
		}
	}

	.loader {
		color: #fff;
		font-family: 'Poppins', sans-serif;
		font-weight: 500;
		font-size: 25px;
		box-sizing: content-box;
		height: 50px;
		padding: 10px 10px;
		display: flex;
		border-radius: 8px;
		font-size: 34px;

		@media (max-width: 800px) {
			font-size: 15px;
		}

		.words {
			overflow: hidden;

			.word {
				display: block;
				height: 100%;
				padding-left: 6px;
				color: #c49a96;
				animation: cycle-words 5s infinite;
			}
		}
	}
}

@keyframes tri-spinner {
	100% {
		transform: rotate(1turn);
	}
}

@keyframes cycle-words {
	10% {
		transform: translateY(-105%);
	}

	25% {
		transform: translateY(-100%);
	}

	35% {
		transform: translateY(-205%);
	}

	50% {
		transform: translateY(-200%);
	}

	60% {
		transform: translateY(-305%);
	}

	75% {
		transform: translateY(-300%);
	}

	85% {
		transform: translateY(-405%);
	}

	100% {
		transform: translateY(-400%);
	}
}
</style>
