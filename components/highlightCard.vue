<template>
	<div
		class="overflow-hidden border border-um-red/40 hover:border-um-red/100 bg-um-white col-span-full bg-cover bg-left rounded-sm py-4 pr-4 pl-5 lg:pl-[33px] relative hover:shadow-md shadow-none duration-150 ease-umbraco-ease">
		<div
			:class="`h-full absolute w-[13px] left-0 top-0 ${highlightedColor}`"></div>
		<div class="w-full h-full absolute top-0 -z-10 left-0"></div>

		<div
			class="flex justify-between items-center cursor-pointer"
			@click="toggle">
			<h3 class="text-um-blue font-bold">{{ title }}</h3>
			<Icon
				v-if="!isOpen"
				class="text-um-red cursor-pointer"
				name="fa:angle-down" />
			<Icon
				v-if="isOpen"
				class="text-um-red font-bold cursor-pointer"
				name="fa:angle-up" />
		</div>

		<div
			v-if="isOpen"
			class="text-um-black pt-3 lg:pr-[227px] flex flex-col gap-5">
			<div v-if="bodyText" v-html="bodyText"></div>

			<NuxtLink class="text-um-blue" :to="url">Go to solution</NuxtLink>
		</div>
	</div>
</template>

<script setup>
defineProps({
	bodyText: {
		type: String,
		default: '',
	},
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
		default: 'bg-um-red',
	},
})
const isOpen = ref(false)

const toggle = () => {
	isOpen.value = !isOpen.value
}
</script>
