<template>
	<NuxtLink
		:to="url"
		class="group relative lg:col-span-3 md:col-span-2 col-span-full p-5 mt-4 rounded-sm min-h-[300px] flex flex-col justify-end [&>.icon]:opacity-100 hover:shadow-xl shadow-none duration-150 ease-umbraco-ease"
		:class="containerStyling()"
		:target="target">
		<img
			v-if="image"
			class="w-full h-full absolute left-0 top-0 rounded-sm -z-10 bg-cover"
			:src="image"
			alt="background image" />

		<!-- 		<img v-else class="w-full h-full absolute left-0 top-0 rounded-sm -z-10 bg-cover opacity-90"
			src="@/assets/image/Dark_Blue_Full.png" alt="background image" /> -->

		<div v-if="icon" class="absolute right-2 top-2 overflow-hidden">
			<img
				v-if="icon"
				class="h-[30px] w-[30px] m-5 bg-cover invert group-hover:w-[40px] group-hover:h-[40px] duration-500"
				:alt="headline"
				:src="icon" />
		</div>

		<h3 class="font-bold text-2xl mb-3 capitalize">{{ headline }}</h3>
		<p class="text-sm pr-8 line-clamp-3" v-html="description"></p>

		<div
			class="z-30 absolute top-0 right-0 left-0 bottom-0 [&>div]:hover:opacity-100 [&>div]:hover:right-[20px] !ease-umbraco-ease duration-100">
			<div
				class="icon bg-um-white absolute text-um-blue right-[40px] bottom-[20px] flex justify-center items-center h-8 w-8 rounded-full opacity-0 hover:opacity-100 !ease-umbraco-ease duration-100">
				<Icon class="![%>path]:fill-white" name="fa:arrow-right" />
			</div>
		</div>
	</NuxtLink>
</template>

<script setup>
const props = defineProps({
	headline: {
		type: String,
		default: '',
	},
	url: {
		type: String,
		default: '',
	},
	target: {
		type: String,
		default: '',
	},
	description: {
		type: String,
		default: '',
	},
	image: {
		type: String,
		default: '',
	},
	icon: {
		type: String,
		default: '',
	},
	style: {
		type: String,
		validator(value) {
			return ['dark', 'light'].includes(value)
		},
		default: '',
	},
})

const containerStyling = () => {
	let containerColor = ''

	switch (props.style) {
		case 'dark':
			containerColor =
				'bg-[url(@/assets/image/Dark_Blue_Corner.png)] bg-cover text-um-white'
			break
		case 'light':
			containerColor =
				'bg-[url(@/assets/image/Pink_Corner.png)]  bg-cover text-um-blue '
			break
		default:
			containerColor = ' text-um-palepink'
			break
	}

	return `${containerColor}`
}
</script>
