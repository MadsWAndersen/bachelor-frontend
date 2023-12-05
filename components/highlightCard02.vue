<template>
	<div
		v-if="isVisible"
		class="overflow-hidden col-span-full bg-cover bg-left rounded-sm py-4 pr-4 pl-5 lg:pl-[33px] relative hover:shadow-2xl shadow-none duration-150 ease-umbraco-ease">
		<div
			:class="`h-full absolute w-[13px] left-0 top-0 ${highlightedColor}`"></div>
		<div
			class="bg-[url('/assets/image/Pale__Full.png')] w-full h-full absolute top-0 -z-10 bg-cover bg-left left-0 bg-opacity-5"></div>

		<div class="flex justify-between items-center cursor-pointer">
			<h3 class="text-um-blue">
				New content "<span class="font-bold">{{ title }}</span
				>" has been added recently
			</h3>

			<div class="flex gap-5 items-center">
				<NuxtLink class="text-um-blue" :to="url"
					>Go to solution</NuxtLink
				>
				<Icon
					name="mingcute:add-fill"
					class="!rotate-45 ![&>path]:fill-um-blue !w-4 !h-4"
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
