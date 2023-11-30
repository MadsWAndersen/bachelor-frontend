<template>
	<span
		class="flex w-[100px] justify-center h-[30px] items-center bg-um-palepink rounded-xs text-xs text-um-blue font-bold">
		{{ version }}</span
	>
</template>
<script setup>
const props = defineProps({
	version: {
		type: String,
	},
})
</script>
