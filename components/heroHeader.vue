<template>
	<div class="container-row">
		<div class="col-span-6">
			<h1 v-if="headline" class="text-um-blue text-4xl mb-3">
				{{ headline }}
			</h1>
			<BreadCrumb :data="heroBreadCrumbs" />
			<p v-if="heroText" class="text-um-blue text-lg">{{ heroText }}</p>
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps({
	headline: {
		type: String,
		default: '',
	},
	heroText: {
		type: String,
		default: '',
	},
	heroBreadCrumbs: {
		type: String,
		default: '',
	},
})
</script>
