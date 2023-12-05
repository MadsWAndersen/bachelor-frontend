<template>
	<div v-if="realData">
		<div class="container">
			<div class="container-row">
				<pre>		{{ cmsContent }}</pre>
			</div>
		</div>
	</div>
</template>

<script setup>
const route = useRoute()
const localStorageContent = ref()
const cmsContent = ref()
const realData = ref()

onMounted(async () => {
	localStorageContent.value = await ref(
		JSON.parse(window.localStorage.getItem(`workshop`)),
	)
	cmsContent.value = localStorageContent.value._value

	realData.value = cmsContent.value.childrenData._embedded.content.filter(
		(contentNode) =>
			contentNode.name.toLowerCase() ===
			`${route.params.slug.replace(/-/g, ' ')}`,
	)[0]
})
</script>

<style></style>
