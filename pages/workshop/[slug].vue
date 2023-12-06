<template>
	<div v-if="pageData">
		<div class="container-row text-um-blue">
			<div class="lg:col-span-6 lg:col-start-4 col-span-4">
				<HeroHeader
					:headline="pageData.name"
					:heroText="pageData.description"
					:heroBreadCrumbs="pageData._url" />
				<p v-if="pageData.date" class="mb-5 text-um-black">
					<span class="font-bold mr-2 text-um-blue">Date:</span>
					{{ formatDate(pageData.date) }}
				</p>
				<div
					v-if="pageData.version && pageData.version.length > 0"
					class="mb-5 flex row-auto gap-2 items-center">
					<span class="font-bold">Version:</span>
					<versionTag
						v-for="(version, index) in pageData.version"
						:key="index"
						:version="version" />
				</div>
				<div
					ref="rteContent"
					class="rteBlock text-um-black"
					v-html="pageData.bodyText"></div>
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
const { formatDate } = useDateFormatter()
const h3Contents = ref([])

const scrollToSection = (index) => {
	const h3Elements = document.querySelectorAll('.rteBlock h3')

	if (h3Elements.length > index) {
		const h3Element = h3Elements[index]
		h3Element.scrollIntoView({ behavior: 'smooth' })
	}
}

onMounted(async () => {
	try {
		const localStorageData = await JSON.parse(
			window.localStorage.getItem('workshop'),
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
