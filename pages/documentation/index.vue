<template>
	<div v-if="cmsContent">
		<HeroHeader
			:headline="cmsContent.name"
			:heroText="cmsContent.documentationDescription"
			:heroBreadCrumbs="cmsContent._url" />

		<div v-if="cmsContent.childrenData._embedded.content" class="-mb-3">
			<div
				v-for="(content, index) in cmsContent.childrenData._embedded
					.content"
				:key="index">
				<div
					v-for="(childContent, i) in content.childrenData._embedded
						.content"
					:key="i"
					class="mb-3">
					<div v-if="childContent.highligted === true">
						<HighlightCard
							:highlightedColor="'bg-um-red'"
							:title="childContent.name"
							:bodyText="childContent.documentationDescription"
							:url="childContent._url" />
					</div>
				</div>
			</div>
		</div>

		<div v-if="sortedAndLimitedContent.length > 0" class="mt-6">
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
