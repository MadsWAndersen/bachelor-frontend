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

		<div v-if="cmsContent">
			<div v-if="cmsContent.childrenData._embedded.content" class="-mb-3">
				<div v-for="(content, index) in cmsContent.childrenData._embedded
					.content" :key="index">
					<div v-for="(childContent, i) in content.childrenData
						._embedded.content" :key="i" class="mb-3">
						<div v-if="childContent.highligted">
							<HighlightCard :highlightedColor="'bg-um-red'" :title="childContent.name" :bodyText="childContent.documentationDescription
								" :url="childContent._url" />
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="container-row my-auto">
			<sectionCard v-for="(card, index) in data._embedded.content" :key="index" :url="card._url" :headline="card.name"
				:description="card.description ||
					card.insightsDescription ||
					card.documentationDescription
					" :image="card.image" :icon="card.icon?.src || card.documentationIcon?.src" :style="'dark'">
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
const redirect = useRedirect();
onMounted(async () => {
	if (!localStorage.getItem('bearerToken')) {
		redirect();
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
