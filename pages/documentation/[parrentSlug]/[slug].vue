<template>
	<div v-if="pageData">
		<div class="container-row text-um-blue">
			<div
				v-if="cmsContent.childrenData._embedded.content"
				class="col-span-2 fixed">
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
			<div class="col-span-6 col-start-4">
				<div class="container p-0">
					<div class="container-row">
						<div class="col-span-full mb-10">
							<h1 v-if="pageData.name" class="text-4xl mb-5">
								{{ pageData.name }}
							</h1>
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

	const matches = pageBodyText?.matchAll(/<h3>(.*?)<\/h3>/g)

	h3Contents.value = []

	for (const match of matches) {
		h3Contents?.value?.push(match[1])
	}
})
</script>
