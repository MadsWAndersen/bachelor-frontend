<template>
	<img
		:src="image"
		alt=""
		class="rounded-full h-[40px] w-[40px] object-cover" />
</template>

<script setup>
defineProps({
	headline: {
		type: String,
		default: '',
	},
})
</script>
