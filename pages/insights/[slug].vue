<template>
	<div v-if="realData">
		<pre>{{ realData }}</pre>
		<div class="container">
			<div class="container-row">
				<div class="col-span-2"></div>
				<div v-if="cmsContent?.childrenData" class="col-span-5">
					<div
						v-for="(content, index) in cmsContent.childrenData
							._embedded.content"
						:key="index">
						<h1 class="text-xl font-bold">
							{{ content.insightHeadline }}
						</h1>
						<NuxtLink :to="`${content._url}`">{{
							content._url
						}}</NuxtLink>
					</div>
					{{ cmsContent }}
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
const route = useRoute()
const localStorageContent = ref()
const cmsContent = ref()
const realData = ref()

console.log(route.params.slug.replace('-', ' '), '***Path***')
console.log(cmsContent, '***cmscontent***')

onMounted(async () => {
	localStorageContent.value = await ref(
		JSON.parse(window.localStorage.getItem('insights')),
	)
	cmsContent.value = localStorageContent.value._value
	realData.value = cmsContent.value.childrenData._embedded.content.filter(
		(contentNode) =>
			contentNode.name.toLowerCase() ===
			`${route.params.slug.replace('-', ' ')}`,
	)[0]
})
</script>

<style></style>
