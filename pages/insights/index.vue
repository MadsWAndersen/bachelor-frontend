<template>
	<div v-if="cmsContent">
		<HeroHeader
			:headline="cmsContent.name"
			:heroText="cmsContent.description"
			:heroBreadCrumbs="cmsContent._url" />
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
		<div class="container-row">
			<sectionCard
				v-for="(card, index) in cmsContent.childrenData._embedded
					.content"
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
const localStorageContent = ref()
const cmsContent = ref()

onMounted(async () => {
	localStorageContent.value = await ref(
		JSON.parse(window.localStorage.getItem('insights')),
	)
	cmsContent.value = localStorageContent.value._value
	console.log(cmsContent.value.childrenData._embedded.content)
})

// const { data } = useContent(`${route.query.id}/children`);
</script>

<style></style>
