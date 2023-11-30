<template>
	<img :src="logoSrc" alt="" />
</template>

<script setup>
defineProps({
	logoSrc: {
		type: Image || String,
		default: '',
	},
})
</script>
