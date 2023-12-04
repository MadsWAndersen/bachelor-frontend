<template>
	<div v-if="pageDate">
		<div class="container-row text-um-blue">
			<div class="col-span-2">
				<h1 class="text-2xl mb-5">
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
			<div class="col-span-6 col-start-4">
				<div class="container p-0">
					<div class="container-row">
						<div class="col-span-full mb-10">
							<h1 class="text-4xl mb-5">
								{{ pageDate.name }}
							</h1>
							<p class="mb-5">
								<span class="font-bold mr-2">Date:</span>
								{{ formatDate(pageDate.date) }}
							</p>
							<div
								v-if="pageDate.version.length > 0"
								class="mb-5 flex row-auto gap-2 items-center">
								<span class="font-bold">Version:</span>
								<versionTag
									v-for="(version, index) in pageDate.version"
									:key="index"
									:version="version" />
							</div>
							<div
								class="rteBlock"
								v-html="pageDate.bodyText"></div>
						</div>
						<docButton
							:url="
								cmsContent.childrenData._embedded.content[0]
									._url
							"
							:title="
								cmsContent.childrenData._embedded.content[0]
									.name
							"
							spanText="prev"
							:btnStyle="'prev'"
							class="col-span-6" />
						<docButton
							:url="
								cmsContent.childrenData._embedded.content[0]
									._url
							"
							:title="
								cmsContent.childrenData._embedded.content[0]
									.name
							"
							spanText="next"
							:btnStyle="'next'"
							class="col-span-6" />
					</div>
				</div>
			</div>
			<div class="col-span-2 col-start-11">
				<div v-if="h3Contents.length > 0">
					<p class="font-bold mb-4">Page Content</p>
					<ul v-if="h3Contents.length > 0">
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
const pageDate = ref()
const { formatDate } = useDateFormatter()
const h3Contents = ref([])

console.log(route.params.slug.replace('-', ' '))
console.log(cmsContent)

onMounted(async () => {
	localStorageContent.value = await ref(
		JSON.parse(window.localStorage.getItem(`${route.params.parrentSlug}`)),
	)
	cmsContent.value = localStorageContent.value._value
	pageDate.value = cmsContent.value.childrenData._embedded.content.filter(
		(contentNode) =>
			contentNode.name.toLowerCase() ===
			`${route.params.slug.replace('-', ' ')}`,
	)[0]

	// Find h3 tags and display them in the h3Contents
	const pageBodyText = pageDate.value.bodyText

	const matches = pageBodyText.matchAll(/<h3>(.*?)<\/h3>/g)

	h3Contents.value = []

	for (const match of matches) {
		h3Contents.value.push(match[1])
	}
})
</script>
