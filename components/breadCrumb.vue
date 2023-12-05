<template>
	<div v-if="breadcrumbs" class="mb-5">
		<NuxtLink
			v-for="(breadcrumb, index) in breadcrumbs"
			:key="index"
			:to="breadcrumb.url"
			:class="[
				'opacity-70 m-0 hover:opacity-100 hover:underline capitalize',
				index === breadcrumbs.length - 1 ? 'underline' : '',
			]">
			{{ breadcrumb.name }}
			{{ index !== breadcrumbs.length - 1 ? ' - ' : '' }}
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
