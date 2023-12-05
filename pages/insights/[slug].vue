<template>
	<div v-if="pageData">
		<div class="container-row text-um-blue">
			<div class="col-span-12 -mt-12 max-h-94">
				<img
					class="w-full aspect-[8/2] mb-10"
					:src="pageData.image[0]?._url"
					:alt="pageData.image[0]?.name" />
			</div>
			<div class="col-span-6 col-start-4">
				<h1 v-if="pageData.name" class="text-4xl mb-5">
					{{ pageData.name }}
				</h1>
				<p v-if="pageData.date" class="mb-5">
					<span class="font-bold mr-2">Date:</span>
					{{ formatDate(pageData.date) }}
				</p>
				<div
					v-if="pageData.bodyText"
					class="rteBlock"
					v-html="pageData.bodyText"></div>
			</div>
			<div class="col-span-2 col-start-11">
				<div v-if="h3Contents && h3Contents.length > 0">
					<p class="font-bold mb-4">Page Content</p>
					<ul>
						<li
							v-for="(h3Tag, index) in h3Contents"
							:key="index"
							class="mb-4">
							{{ h3Tag }}
						</li>
					</ul>
				</div>
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

onMounted(async () => {
	localStorageContent.value = await ref(
		JSON.parse(window.localStorage.getItem(`insights`)),
	)
	cmsContent.value = localStorageContent.value._value
	pageData.value = cmsContent.value.childrenData._embedded.content.filter(
		(contentNode) =>
			contentNode.name.toLowerCase() ===
			`${route.params.slug.replace(/-/g, ' ')}`,
	)[0]

	console.log('page image***', pageData.value)

	// Find h3 tags and display them in the h3Contents
	const pageBodyText = pageData.value.bodyText

	const matches = pageBodyText.matchAll(/<h3>(.*?)<\/h3>/g)

	h3Contents.value = []

	for (const match of matches) {
		h3Contents.value.push(match[1])
	}

	console.log('***h3 tags***', h3Contents)
})
</script>

<style></style>
