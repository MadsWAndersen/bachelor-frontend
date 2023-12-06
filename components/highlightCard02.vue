<template>
	<div
		v-if="isVisible"
		class="overflow-hidden col-span-full bg-um-white border border-um-green/40 hover:border-um-green/100 rounded-sm py-4 pr-4 pl-5 lg:pl-[33px] relative hover:shadow-md shadow-none duration-150 ease-umbraco-ease">
		<div
			:class="`h-full absolute w-[13px] left-0 top-0 ${highlightedColor}`"></div>
		<div class="w-full w-full h-full absolute top-0 -z-10 left-0"></div>

		<div
			class="flex justify-between lg:items-center md:items-center items-start cursor-pointer lg:flex-row md:flex-row flex-col lg:gap-0 gap-5">
			<h3 class="text-um-blue">
				New content "<span class="font-bold">{{ title }}</span
				>" has been added recently
			</h3>

			<div
				class="flex items-center lg:justify-end md:justify-end lg:gap-5 md:gap-5 justify-between lg:w-1/2 w-full">
				<NuxtLink class="text-um-blue" :to="url"
					>Go to solution</NuxtLink
				>
				<Icon
					name="radix-icons:cross-2"
					class="text-um-green !w-4 !h-4 lg:relative md:relative absolute right-4 md:right-0 lg:right-0 top-1/2"
					@click="closeIcon" />
			</div>
		</div>

		<div
			v-if="isOpen"
			class="text-um-black pt-3 lg:pr-[227px] flex flex-col gap-5">
			<div v-if="bodyText" v-html="bodyText"></div>
		</div>
	</div>
</template>

<script setup>
const isVisible = ref(true)

const closeIcon = () => {
	isVisible.value = !isVisible.value
}

defineProps({
	title: {
		type: String,
		default: '',
	},
	url: {
		type: String,
		default: '',
	},
	highlightedColor: {
		type: String,
		default: 'bg-um-green',
	},
})
</script>
