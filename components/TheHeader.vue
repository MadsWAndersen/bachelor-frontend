<template>
	<header
		class="container py-7 fixed bg-um-white top-0 left-1/2 -translate-x-1/2 shadow-sm w-full z-40">
		<div v-if="searchQuery === ''"></div>

		<div
			v-else
			class="container-row fixed bg-um-white top-11 overflow-y-scroll w-full h-screen">
			<NuxtLink
				v-for="item in filteredContent"
				:key="item._id"
				:to="item._url"
				class="col-span-4 max-h-[200px] flex gap-3 border rounded-sm mb-3 p-3 bg-cover bg-[url(@/assets/image/Pale__Full.png)]"
				@click="resetSearch">
				<div v-if="!item.parentName">
					<h3 class="text-um-blue font-bold text-2xl">
						<NuxtLink :to="item._url">{{ item.name }}</NuxtLink>
					</h3>
					<p
						v-if="item.documentationDescription"
						class="text-um-blue"
						v-html="item.documentationDescription"></p>
				</div>

				<div v-else>
					<h4 class="text-um-blue font-bold text-2xl">
						<NuxtLink :to="item._url"> {{ item.name }}</NuxtLink>
					</h4>
					<p
						class="text-um-blue line-clamp-3"
						v-html="item.documentationDescription"></p>
				</div>
			</NuxtLink>
		</div>

		<nav class="container-row items-center">
			<NuxtLink class="col-span-2 mr-auto text-white font-bold" to="/">
				<img src="@/assets/icons/logo.svg" alt="" />
			</NuxtLink>

			<div class="col-span-2">
				<input
					type="text"
					v-model="searchQuery"
					class="w-full border rounded-xs p-1 border-um-blue"
					placeholder="Search by title or description..." />
			</div>

			<div class="lg:hidden col-span-2 flex justify-end">
				<button class="text-um-blue z-50" @click="toggleMobileMenu">
					<svg
						v-if="!isMobileMenuOpen"
						class="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16m-7 6h7"></path>
					</svg>

					<svg
						v-else
						class="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"></path>
					</svg>
				</button>
			</div>

			<div
				class="container pb-10 pt-10 fixed top-0 right-0 lg:hidden md:text-4xl text-2xl w-full md:w-1/2 bg-um-white shadow-lg h-[100svh] transform transition-transform ease-umbraco-ease duration-300 flex flex-col items-end gap-5 z-40"
				:class="{
					'translate-x-0': isMobileMenuOpen,
					'translate-x-full': !isMobileMenuOpen,
				}">
				<NuxtLink
					class="text-um-blue font-bold m-0 hover:underline"
					to="/documentation"
					@click="toggleMobileMenu">
					Documentation
				</NuxtLink>
				<NuxtLink
					class="text-um-blue font-bold m-0 hover:underline"
					to="/tools"
					@click="toggleMobileMenu">
					Tools
				</NuxtLink>
				<NuxtLink
					class="text-um-blue font-bold m-0 hover:underline"
					to="/insights"
					@click="toggleMobileMenu">
					Insights
				</NuxtLink>
				<NuxtLink
					class="text-um-blue font-bold m-0 hover:underline"
					to="/submit-solution"
					@click="toggleMobileMenu">
					Submit solution
				</NuxtLink>
				<NuxtLink
					class="text-um-blue font-bold m-0 hover:underline"
					to="/workshop"
					@click="toggleMobileMenu">
					Workshop
				</NuxtLink>
				<NuxtLink
					class="text-um-blue font-bold m-0 hover:underline"
					to="/user"
					@click="toggleMobileMenu"
					>User
				</NuxtLink>
				<a
					class="text-um-blue font-bold m-0 hover:underline"
					@click="userData.logout() && toggleMobileMenu"
					>Log out</a
				>
			</div>

			<div
				class="lg:col-span-8 justify-end gap-8 items-center lg:flex hidden">
				<NuxtLink
					class="text-um-blue font-bold m-0 hover:underline"
					to="/documentation">
					Documentation
				</NuxtLink>
				<NuxtLink
					class="text-um-blue font-bold m-0 hover:underline"
					to="/tools">
					Tools
				</NuxtLink>
				<NuxtLink
					class="text-um-blue font-bold m-0 hover:underline"
					to="/insights">
					Insights
				</NuxtLink>
				<NuxtLink
					class="text-um-blue font-bold m-0 hover:underline"
					to="/submit-solution">
					Submit solution
				</NuxtLink>
				<NuxtLink
					class="text-um-blue font-bold m-0 hover:underline"
					to="/workshop">
					Workshop
				</NuxtLink>

				<div class="relative">
					<profilePicture
						class="cursor-pointer"
						:src="image"
						@click.stop="toggleDropdown()" />
					<div
						v-if="isDropdownVisible"
						class="absolute right-0 mt-2 w-[180px] bg-white border-um-blue bg-um-white border rounded-sm shadow-md overflow-hidden">
						<NuxtLink
							class="block py-2 px-7 text-sm text-gray-700 hover:bg-gray-100 hover:bg-um-palepink overflow-hidden"
							to="/user"
							>User</NuxtLink
						>
						<a
							class="block py-2 px-7 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer hover:bg-um-palepink overflow-hidden"
							@click="userData.logout()"
							>Log out</a
						>
						<p
							class="block py-2 px-7 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer hover:bg-um-palepink overflow-hidden"
							@click="updateData()">
							Update content
						</p>
					</div>
				</div>
			</div>
		</nav>
	</header>
	<div v-if="userData.loading" class="spinnerContainer">
		<div class="spinner"></div>
		<div class="loader w-3/4">
			<p class="basis-1/2 text-end">Updating</p>
			<div class="words basis-1/2 w-full">
				<span class="word"></span>
				<span class="word">Insights</span>
				<span class="word">Tools</span>
				<span class="word">Workshops</span>
				<span class="word">Documentation</span>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
const isDropdownVisible = ref(false)
const isMobileMenuOpen = ref(false)
const userData = useUserStore()
const image = ref()
const imageUrlLocalStorage = ref()

const toggleDropdown = () => {
	isDropdownVisible.value = !isDropdownVisible.value
}
const toggleMobileMenu = () => {
	isMobileMenuOpen.value = !isMobileMenuOpen.value
}

watch(isDropdownVisible, (newValue) => {
	const body = document.querySelector('body')
	if (newValue === true) {
		body.addEventListener('click', closeDropdown)
	} else {
		body.removeEventListener('click', closeDropdown)
	}
})

function closeDropdown() {
	isDropdownVisible.value = false
}

onMounted(() => {
	if (isDropdownVisible.value === true) {
		const body = document.querySelector('body')
		body.addEventListener('click', closeDropdown)
	}
})

onMounted(async () => {
	const body = document.querySelector('body')
	body.removeEventListener('click', closeDropdown)

	const userInfo = await JSON.parse(localStorage.getItem('userInfo'))

	if (userInfo && typeof userInfo.image === 'string') {
		imageUrlLocalStorage.value = userInfo.image

		const imageUrlWithoutPrefix = imageUrlLocalStorage.value.replace(
			'umb:/',
			'',
		)

		const completeImageUrl = `https://cdn.umbraco.io${imageUrlWithoutPrefix}`

		// Fetch the image
		try {
			const response = await fetch(completeImageUrl, {
				headers: {
					'Accept-Language': 'en-US',
					'umb-project-alias': 'pba-webdev',
					Authorization: 'Basic elFJZk50eEpCYWFidFFDSTNweDg6',
				},
			})

			// Was request was successful
			if (response.ok) {
				const imageUrl = response.url

				// Make another fetch to get _url from the image URL
				try {
					const imageResponse = await fetch(imageUrl, {
						headers: {
							'Accept-Language': 'en-US',
							'umb-project-alias': 'pba-webdev',
							Authorization: 'Basic elFJZk50eEpCYWFidFFDSTNweDg6',
						},
					})

					if (imageResponse.ok) {
						const imageData = await imageResponse.json()
						const imageUrlFromSecondFetch = imageData._url
						image.value = imageUrlFromSecondFetch
					} else {
						console.error(
							'Failed to fetch image:',
							imageResponse.statusText,
						)
					}
				} catch (error) {
					console.error('Error during second fetch:', error)
				}
			} else {
				console.error('Failed to fetch image:', response.statusText)
			}
		} catch (error) {
			console.error('Error during fetch:', error)
		}
	}
})

const updateData = async () => {
	userData.loading = true
	const initialResponse = await fetchData('https://cdn.umbraco.io/content/')
	const hrefs = initialResponse._embedded.content.map(
		(content) => content._links.self.href,
	)
	detailedData.value = await fetchDetailedData(hrefs)
	window.localStorage.setItem(
		'documentation',
		JSON.stringify(detailedData.value[0]),
	)
	window.localStorage.setItem(
		'insights',
		JSON.stringify(detailedData.value[1]),
	)
	window.localStorage.setItem('tools', JSON.stringify(detailedData.value[2]))

	window.localStorage.setItem(
		'workshop',
		JSON.stringify(detailedData.value[3]),
	)
	// sort documentation
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
	for (
		let i = 0;
		i < detailedData.value[1].childrenData._embedded.content.length;
		i++
	) {
		window.localStorage.setItem(
			detailedData.value[1].childrenData._embedded.content[
				i
			].name.toLowerCase(),
			JSON.stringify(
				detailedData.value[1].childrenData._embedded.content[i],
			),
		)
	}

	for (
		let i = 0;
		i < detailedData.value[3].childrenData._embedded.content.length;
		i++
	) {
		window.localStorage.setItem(
			detailedData.value[3].childrenData._embedded.content[
				i
			].name.toLowerCase(),
			JSON.stringify(
				detailedData.value[3].childrenData._embedded.content[i],
			),
		)
	}

	window.location.href = '/'
}

const detailedData = ref(null)
function fetchData(url) {
	return fetch(url, {
		headers: {
			'umb-project-alias': 'pba-webdev',
			'Accept-Language': 'en-US',
			Authorization: 'Basic elFJZk50eEpCYWFidFFDSTNweDg6',
		},
	}).then((response) => response.json())
}

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

const resetSearch = () => {
	searchQuery.value = '' // Reset searchQuery to an empty string
}

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

const searchData = ref(null)
onMounted(async () => {
	if (searchQuery.value !== '') {
	}

	try {
		const initialResponse = await fetchData(
			'https://cdn.umbraco.io/content/',
		)
		const searchHrefs = initialResponse._embedded.content.map(
			(content) => content._links.self.href,
		)
		searchData.value = await fetchDetailedData(searchHrefs)
	} catch (err) {
		error.value = err
	}
})

const searchQuery = ref('')

watch(searchQuery, (newValue) => {
	if (newValue !== '') {
		document.body.style.overflow = 'hidden'
	} else {
		document.body.style.overflow = ''
	}
})

function flattenData(data) {
	const flatData = []

	data.forEach((parentItem) => {
		flatData.push({ ...parentItem, isParent: true })
		if (parentItem.childrenData._embedded.content) {
			parentItem.childrenData._embedded.content.forEach((childItem) => {
				flatData.push({
					...childItem,
					isParent: false,
					parentName: parentItem.name,
				})
			})
		}
	})

	return flatData
}

const filteredContent = computed(() => {
	if (!searchData.value || !searchData.value.length) return []

	let flatData = []
	searchData.value.forEach((category) => {
		flatData = flatData.concat(
			flattenData(category.childrenData._embedded.content),
		)
	})

	return flatData.filter((item) => {
		const nameMatch = item.name
			.toLowerCase()
			.includes(searchQuery.value.toLowerCase())
		const descriptionMatch =
			item.documentationDescription &&
			item.documentationDescription
				.toLowerCase()
				.includes(searchQuery.value.toLowerCase())

		return nameMatch || descriptionMatch
	})
})
</script>

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
	z-index: 99;

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
