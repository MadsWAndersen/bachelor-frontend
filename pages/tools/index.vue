<template>
	<div v-if="cmsContent">
		<HeroHeader :headline="cmsContent.headline" :heroText="cmsContent.description" :heroBreadCrumbs="cmsContent._url" />
		<div v-if="cmsContent.childrenData._embedded.content">
			<div v-for="(content, index) in cmsContent.childrenData._embedded
				.content" :key="index">
				<div v-for="(childContent, i) in content.childrenData._embedded
					.content" :key="i" class="mb-4 last-of-type:mb-0">
					<div v-if="childContent.highligted === true">
						<HighlightCard :title="childContent" :bodyText="childContent.toolDescription"
							:url="childContent._url"></HighlightCard>
					</div>
				</div>
			</div>
		</div>
		<div class="container-row">
			<sectionCard v-for="(card, index) in cmsContent.childrenData._embedded
				.content" :key="index" :url="card.toolLink[0].url" :target="card.toolLink[0].target" :headline="card.toolName"
				:description="card.toolDescription" :image="card.image" :icon="card.toolIcon.src" :style="'dark'">
			</sectionCard>
		</div>
	</div>
</template>

<script setup>
const localStorageContent = ref()
const cmsContent = ref()
const redirect = useRedirect();
onMounted(async () => {
	if (!localStorage.getItem('bearerToken')) {
		redirect();
	}
	localStorageContent.value = await ref(
		JSON.parse(window.localStorage.getItem('tools')),
	)
	cmsContent.value = localStorageContent.value._value
})

// const { data } = useContent(`${route.query.id}/children`);
</script>

<style></style>
