<template>
	<div v-if="cmsContent">
		<HeroHeader
			:headline="cmsContent.insightsHeadline"
			:heroText="cmsContent.insightsDescription" />

		<div v-if="cmsContent.childrenData._embedded.content">
			<div
				v-for="(content, index) in cmsContent.childrenData._embedded
					.content"
				:key="index">
				<div
					v-for="(childContent, index) in content.childrenData
						._embedded.content"
					:key="index"
					class="mb-4">
					<div v-if="childContent.highligted === true">
						<HighlightCard
							:title="childContent.headline"
							:bodyText="childContent.bodyText"
							:url="childContent._url"></HighlightCard>
					</div>
				</div>
			</div>
		</div>

		<div class="container-row lg:mb-10 mb-6 lg:mt-10">
			<div
				class="border-2 col-span-3 rounded-xs border-um-blue py-2 px-2 w-full flex flex-row relative overflow-hidden">
				<Icon
					name="ph:magnifying-glass-bold"
					class="absolute fill-um-blue stroke-um-blue top-[50%] translate-y-[-50%]" />
				<input
					type="text"
					v-model="searchTerm"
					placeholder="Search here.."
					class="border-0 pl-5 outline-none w-full" />
			</div>
		</div>

		<div class="container-row">
			<sectionCard
				v-for="(card, index) in filteredCards"
				:key="index"
				:url="card._url"
				:headline="card.insightHeadline"
				:description="card.teaserText"
				:image="card.image[0]._url"
				:icon="card.icon?.src"
				:style="'light'">
			</sectionCard>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const localStorageContent = ref()
const cmsContent = ref()
const searchTerm = ref('')

const filteredCards = computed(() => {
	const content = cmsContent.value.childrenData?._embedded?.content

	if (!searchTerm.value) {
		return content
	}

	return content.filter((card) => {
		const lowerCaseSearchTerm = searchTerm.value.toLowerCase()
		const headlineMatch = card.insightHeadline
			.toLowerCase()
			.includes(lowerCaseSearchTerm)
		const descriptionMatch = card.teaserText
			?.toLowerCase()
			.includes(lowerCaseSearchTerm)

		return headlineMatch || descriptionMatch
	})
})

onMounted(async () => {
	localStorageContent.value = await ref(
		JSON.parse(window.localStorage.getItem('insights')),
	)
	cmsContent.value = localStorageContent.value._value
	console.log(cmsContent.value.childrenData._embedded.content)
})
</script>

<style></style>
