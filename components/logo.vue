<template>
	<img :src="logoSrc" alt="" />
</template>

<script setup>
const props = defineProps({
	logoSrc: {
		type: Image || String,
	},
})
</script>
