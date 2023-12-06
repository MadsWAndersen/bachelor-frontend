<template>
	<div v-if="pageData">
		<div class="container-row text-um-blue">
			<div class="lg:hidden col-span-2 flex justify-start relative">
				<button
					class="text-um-blue z-30 py-4 absolute -top-10"
					@click="toggleSideMenu">
					<svg
						v-if="!isSideMenuOpen"
						class="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"></path>
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
				v-if="cmsContent.childrenData._embedded.content"
				class="container pb-10 pt-10 fixed top-12 lg:hidden left-0 h-screen w-full bg-um-white shadow-lg transform transition-transform ease-umbraco-ease duration-300 flex flex-col items-start gap-5 z-20"
				:class="{
					'translate-x-[-100%]': isSideMenuOpen,
					'translate-x-0': !isSideMenuOpen,
				}">
				<h1
					v-if="cmsContent.documentationHeadline"
					class="text-2xl mb-5">
					{{ cmsContent.documentationHeadline }}
				</h1>
				<ul
					v-for="(content, index) in cmsContent.childrenData._embedded
						.content"
					:key="index"
					class="list-disc">
					<li class="ml-6 mb-4 hover:underline">
						<NuxtLink :to="`${content._url}`">{{
							content.name
						}}</NuxtLink>
					</li>
				</ul>
			</div>

			<div
				v-if="cmsContent.childrenData._embedded.content"
				class="lg:col-span-2 lg:block fixed hidden">
				<h1
					v-if="cmsContent.documentationHeadline"
					class="text-2xl mb-5">
					{{ cmsContent.documentationHeadline }}
				</h1>
				<ul
					v-for="(content, index) in cmsContent.childrenData._embedded
						.content"
					:key="index"
					class="list-disc">
					<li class="ml-6 mb-4 hover:underline">
						<NuxtLink
							:to="`${content._url}`"
							@click="isDesktop ? '' : toggleSideMenu"
							>{{ content.name }}</NuxtLink
						>
					</li>
				</ul>
			</div>
			<div class="lg:col-span-6 lg:col-start-4 col-span-4">
				<div class="container p-0">
					<div class="container-row">
						<div class="col-span-full mb-10">
							<h1 v-if="pageData.name" class="text-4xl mb-5">
								{{ pageData.name }}
							</h1>

							<BreadCrumb :data="pageData._url" />

							<p v-if="pageData.date" class="mb-5">
								<span class="font-bold mr-2">Date:</span>
								{{ formatDate(pageData.date) }}
							</p>
							<div
								v-if="
									pageData.version &&
									pageData.version.length > 0
								"
								class="mb-5 flex row-auto gap-2 items-center">
								<span class="font-bold">Version:</span>
								<versionTag
									v-for="(version, index) in pageData.version"
									:key="index"
									:version="version" />
							</div>
							<div
								v-if="pageData.bodyText"
								class="rteBlock"
								v-html="pageData.bodyText"></div>
						</div>
						<docButton
							v-if="itemBefore"
							:url="itemBefore?._url"
							:title="itemBefore?.name"
							spanText="prev"
							:btnStyle="'prev'"
							class="lg:col-span-6 md:col-span-2 col-span-5" />

						<docButton
							v-if="itemAfter"
							:url="itemAfter?._url"
							:title="itemAfter?.name"
							spanText="next"
							:btnStyle="'next'"
							class="lg:col-span-6 md:col-span-2 col-span-5" />
					</div>
				</div>
			</div>
			<pageContent
				:h3Contents="h3Contents"
				:scrollToSection="scrollToSection" />
		</div>
	</div>
</template>

<script setup>
const route = useRoute()
const localStorageContent = ref()
const cmsContent = ref()
const pageData = ref()
const paths = ref()
const { formatDate } = useDateFormatter()
const h3Contents = ref([])
const itemBefore = ref()
const itemAfter = ref()
const isSideMenuOpen = ref(false)
const isDesktop = ref(false)

const toggleSideMenu = () => {
	isSideMenuOpen.value = !isSideMenuOpen.value
}

const scrollToSection = (index) => {
	const h3Elements = document.querySelectorAll('.rteBlock h3')

	if (h3Elements.length > index) {
		const h3Element = h3Elements[index]
		h3Element.scrollIntoView({ behavior: 'smooth' })
	}
}

onMounted(async () => {
	localStorageContent.value = await ref(
		JSON.parse(window.localStorage.getItem(`${route.params.parrentSlug}`)),
	)
	cmsContent.value = localStorageContent.value._value
	pageData.value = cmsContent.value.childrenData._embedded.content.filter(
		(contentNode) =>
			contentNode.name.toLowerCase() ===
			`${route.params.slug.replace('-', ' ')}`,
	)[0]

	// Find h3 tags and display them in the h3Contents
	const pageBodyText = pageData.value?.bodyText
	paths.value = pageData.value._url
	const matches = pageBodyText?.matchAll(/<h3>(.*?)<\/h3>/g)

	h3Contents.value = []

	for (const match of matches) {
		h3Contents?.value?.push(match[1])
	}

	isDesktop.value = window.matchMedia('(min-width: 1024px)').matches

	// Find current page
	const currentPage = cmsContent.value.childrenData._embedded.content

	const indexOfMatch = currentPage.findIndex(
		(contentNode) => contentNode.name === pageData.value.name,
	)

	if (indexOfMatch !== -1) {
		// Set the value of itemBefore and itemAfter
		itemBefore.value = currentPage[indexOfMatch - 1]
		itemAfter.value = currentPage[indexOfMatch + 1]
	}
})
</script>
