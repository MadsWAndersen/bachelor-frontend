<template>
	<div v-if="localStorageContent">
		<div class="text-um-blue">
			<div class="container-row">
				<div class="col-span-2 fixed">
					<h1 class="text-2xl mb-5">
						{{ cmsContent.documentationHeadline }}
					</h1>
					<ul
						v-for="(content, index) in cmsContent.childrenData
							._embedded.content"
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
									{{ cmsContent.documentationHeadline }}
								</h1>
								<p class="mb-5">
									<span class="font-bold mr-2">Date:</span>
									{{ formatDate(cmsContent._createDate) }}
								</p>

								<div
									class="rteBlock"
									v-html="
										cmsContent.documentationDescription
									"></div>
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
								spanText="next"
								:btnStyle="'next'"
								class="col-span-6 mb-10" />
						</div>
					</div>
				</div>
				<pageContent
					:h3Contents="h3Contents"
					:scrollToSection="scrollToSection" />
			</div>
		</div>
	</div>
</template>

<script setup>
const route = useRoute()
const localStorageContent = ref()
const cmsContent = ref()
const h3Contents = ref([])
const { formatDate } = useDateFormatter()

const scrollToSection = (index) => {
	const h3Elements = document.querySelectorAll('.rteBlock h3')

	if (h3Elements.length > index) {
		const h3Element = h3Elements[index]
		h3Element.scrollIntoView({ behavior: 'smooth' })
	}
}

onMounted(async () => {
	localStorageContent.value = await ref(
		JSON.parse(window.localStorage.getItem(`${route.params.slug}`)),
	)
	cmsContent.value = localStorageContent.value._value

	// Find h3 tags and display them in the h3Contents
	const documentationDescription = cmsContent.value.documentationDescription

	const matches = documentationDescription.matchAll(/<h3>(.*?)<\/h3>/g)

	h3Contents.value = []

	for (const match of matches) {
		h3Contents.value.push(match[1])
	}
})
</script>
