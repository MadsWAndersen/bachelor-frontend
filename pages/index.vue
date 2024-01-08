<template>
	<div v-if="data">
		<div class="container-row lg:mb-6 mb-7">
			<div class="col-span-5">
				<h1 v-if="user?.name" class="text-um-blue text-4xl mb-3">
					Hello {{ user.name }}
				</h1>

				<p class="text-um-black text-lg">
					Welcome to the central Umbraco support system. Here you can
					get the latest news related to SWAT
				</p>
			</div>
		</div>

		<div v-if="highlightedContent.length">
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

		<div class="container-row my-auto">
			<sectionCard
				v-for="(card, index) in data._embedded.content"
				:key="index"
				:url="card._url"
				:headline="card.name"
				:description="
					card.description ||
					card.insightsDescription ||
					card.documentationDescription
				"
				:image="card.image"
				:icon="card.icon?.src || card.documentationIcon?.src"
				:style="'dark'">
			</sectionCard>
		</div>
	</div>
</template>

<script setup>
const { data } = useContent()
const localStorageContent = ref()
const cmsContent = ref()

const userLocalStoage = ref()
const user = ref()
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

	userLocalStoage.value = await ref(
		JSON.parse(window.localStorage.getItem('userInfo')),
	)
	user.value = userLocalStoage.value._value
})
</script>
