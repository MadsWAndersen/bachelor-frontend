<template>
	<div v-if="cmsContent">
		<HeroHeader
			:headline="cmsContent.name"
			:heroText="cmsContent.documentationDescription"
			:heroBreadCrumbs="cmsContent._url" />

		<div v-if="highlightedContent.length">
			<h2
				v-if="cmsContent.childrenData._embedded.content"
				class="text-lg mt-7 mb-2 text-um-blue font-bold">
				Highlighted solution
			</h2>
			<div
				v-for="(content, index) in highlightedContent"
				:key="index"
				class="mb-3">
				<HighlightCard
					:highlightedColor="'bg-um-red'"
					:title="content.name"
					:bodyText="content.documentationDescription"
					:url="content._url"
					:defaultOpen="index === 0" />
			</div>
		</div>

		<div v-if="sortedAndLimitedContent.length > 0" class="mt-6">
			<h2
				v-if="sortedAndLimitedContent.length > 0"
				class="text-lg mb-3 mt-7 text-um-blue font-bold">
				Newly added content
			</h2>
			<div
				v-for="(solution, index) in sortedAndLimitedContent"
				:key="index"
				class="mb-3">
				<HighlightCard02
					:highlightedColor="'bg-um-green'"
					:title="solution.name"
					:bodyText="solution.bodyText"
					:url="solution._url" />
			</div>
		</div>
		<div class="container-row my-auto">
			<sectionCard
				v-for="(card, index) in cmsContent.childrenData._embedded
					.content"
				:key="index"
				:url="card._url"
				:headline="card.documentationHeadline"
				:description="card.documentationDescription"
				:image="card.image"
				:icon="card.icon?.src"
				:style="'dark'">
			</sectionCard>
		</div>
	</div>
</template>

<script setup>
const localStorageContent = ref()
const cmsContent = ref()
const redirect = useRedirect()

const highlightedContent = computed(() => {
	if (!cmsContent.value || !cmsContent.value.childrenData._embedded.content) {
		return []
	}

	return cmsContent.value.childrenData._embedded.content
		.flatMap((content) => content.childrenData._embedded.content)
		.filter((childContent) => childContent.highligted)
})

onMounted(async () => {
	if (!localStorage.getItem('bearerToken')) {
		redirect()
	}
	localStorageContent.value = await ref(
		JSON.parse(window.localStorage.getItem('documentation')),
	)
	cmsContent.value = localStorageContent.value._value
})

const sortedAndLimitedContent = computed(() => {
	const allContent = cmsContent.value.childrenData._embedded.content.flatMap(
		(c) => c.childrenData._embedded.content,
	)

	const sortedContent = allContent.sort(
		(a, b) => new Date(b._updateDate) - new Date(a._updateDate),
	)

	return sortedContent.slice(0, 2)
})
</script>

<style></style>
