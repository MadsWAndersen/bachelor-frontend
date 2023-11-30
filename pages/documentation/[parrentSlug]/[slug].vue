<script setup>
const route = useRoute()
const localStorageContent = ref()
const cmsContent = ref()
const realData = ref()

console.log(route.params.slug.replace('-', ' '))
console.log(cmsContent)

onMounted(async () => {
	localStorageContent.value = await ref(
		JSON.parse(window.localStorage.getItem(`${route.params.parrentSlug}`)),
	)
	cmsContent.value = localStorageContent.value._value
	realData.value = cmsContent.value.childrenData._embedded.content.filter(
		(contentNode) =>
			contentNode.name.toLowerCase() ===
			`${route.params.slug.replace('-', ' ')}`,
	)[0]
})
</script>

<template>
	<div v-if="realData">
		{{ realData.name }}
		{{ realData }}
	</div>
</template>

<style lang="scss" scoped></style>
