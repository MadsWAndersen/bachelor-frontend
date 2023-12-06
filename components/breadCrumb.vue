<template>
	<div v-if="breadcrumbs" class="mb-5">
		<NuxtLink v-for="(breadcrumb, index) in breadcrumbs" :key="index" :to="breadcrumb.url"
			class="after:content-['-'] after:mr-1 last-of-type:after:content-[] relative after:absolute after:ml-1 mr-4"
			:class="[
				'opacity-70 m-0 text-um-blue hover:opacity-100 hover:underline capitalize',
				index === breadcrumbs.length - 1 ? 'underline font-bold' : '',
			]">
			{{ breadcrumb.name }}
		</NuxtLink>
	</div>
</template>

<script setup>
const props = defineProps({
	data: {
		type: Function,
		default() {
			return 'Default function'
		},
	},
})

const breadcrumbs = ref([
	{
		name: 'home',
		url: '/',
	},
])

const filtered = props.data.split('/').filter(function (el) {
	return el !== ''
})
let pathSteps = ''
for (let i = 0; i < filtered.length; i++) {
	pathSteps += '/' + filtered[i]
	breadcrumbs.value.push({
		name: filtered[i],
		url: pathSteps,
	})
}
</script>

<style lang="scss" scoped></style>
