<template>
	<div v-if="pageData">
		<div class="container-row text-um-black">
			<div v-if="pageData.image[0]" class="lg:col-span-12 col-span-4 md:-mt-12 max-h-94 mt-0">
				<img class="w-full aspect-[8/2] object-cover md:mb-10 mb-5" :src="pageData.image[0]?._url"
					:alt="pageData.image[0]?.name" />
			</div>

			<div class="lg:col-span-6 lg:col-start-4 col-span-4">
				<HeroHeader :headline="pageData.name" :heroText="pageData.description" :heroBreadCrumbs="pageData._url" />
				<p v-if="pageData.date" class="mb-5">
					<span class="font-bold mr-2">Date:</span>
					{{ formatDate(pageData.date) }}
				</p>
				<div v-if="pageData.bodyText" class="rteBlock text-um-black" v-html="pageData.bodyText"></div>
			</div>
		</div>
	</div>
</template>

<script setup>
const route = useRoute()
const localStorageContent = ref()
const cmsContent = ref()
const pageData = ref()
const { formatDate } = useDateFormatter()
const h3Contents = ref([])
const redirect = useRedirect();

onMounted(async () => {
	if (!localStorage.getItem('bearerToken')) {
		redirect();
	}
	try {
		const localStorageData = await JSON.parse(
			window.localStorage.getItem('insights'),
		)
		localStorageContent.value = ref(localStorageData || {})
		cmsContent.value = localStorageContent.value._value

		const slug = route.params.slug.replace(/-/g, ' ').toLowerCase()
		const matchingContentNode =
			cmsContent.value.childrenData._embedded.content.find(
				(contentNode) => contentNode.name.toLowerCase() === slug,
			)

		pageData.value = matchingContentNode || {}

		// Find h3 tags and display them in h3Contents
		const pageBodyText = pageData.value.bodyText || ''
		const matches = pageBodyText.matchAll(/<h3>(.*?)<\/h3>/g)

		h3Contents.value = Array.from(matches, (match) => match[1])
	} catch (error) {
		console.error('An error occurred during initialization:', error)
	}
})
</script>

<style></style>
