<template>
	<div
		v-if="h3Contents && h3Contents.length > 0"
		class="col-span-2 col-start-11">
		<div class="fixed">
			<p class="font-bold mb-4">Page Content</p>
			<ul>
				<li
					v-for="(h3Tag, index) in h3Contents"
					:key="index"
					class="mb-4 cursor-pointer hover:underline">
					<a @click="scrollToSection(index)">{{ h3Tag }}</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup>
defineProps({
	h3Contents: {
		type: Object,
		default() {
			return { message: 'hello' }
		},
	},
	scrollToSection: {
		type: Function,
		default() {
			return 'Default function'
		},
	},
})
</script>
