<template>
	<div v-if="data">
		<div v-for="(content, index) in data._embedded.content" :key="index">
			<h1 v-html="content.name" class="text-xl font-bold"></h1>
			<NuxtLink :to="content._url">{{ content._url }}</NuxtLink>
		</div>
		<div v-if="cmsContent">
			<div v-if="cmsContent.childrenData._embedded.content">
				<div
					v-for="(content, index) in cmsContent.childrenData._embedded
						.content"
					:key="index">
					<div
						v-for="(childContent, index) in content.childrenData
							._embedded.content"
						:key="index">
						<div v-if="childContent.highligted">
							<HighlightCard
								:title="childContent.headline"
								:bodyText="childContent.bodyText"
								:url="childContent._url">
							</HighlightCard>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
const { data } = useContent()
const localStorageContent = ref()
const cmsContent = ref()

onMounted(async () => {
	localStorageContent.value = await ref(
		JSON.parse(window.localStorage.getItem('documentation')),
	)
	cmsContent.value = localStorageContent.value._value
	console.log(cmsContent.value.childrenData._embedded.content)
})
</script>
