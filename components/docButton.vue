<template>
	<NuxtLink
		:to="url"
		:target="target"
		:btnStyle="btnStyle"
		:class="flexOrientation()"
		class="group flex cursor-pointer bg-um-white justify-between items-center border-2 p-4 rounded-sm relative overflow-hidden">
		<div class="flex flex-col pl-0 z-10" :class="textOrientation()">
			<span
				class="text-xs group-hover:text-um-white uppercase font-bold group-hover:duration-1000 duration-1000">
				{{ spanText }}</span
			>
			<div
				class="group-hover:text-um-white group-hover:duration-1000 duration-1000">
				{{ title }}
			</div>
		</div>
		<div
			class="absolute w-[600px] h-[600px] -z-0 bg-um-blue left-1/2 -translate-x-1/2 right-0 bottom-0 translate-y-full group-hover:translate-y-[100px] duration-500 group-hover:!ease-umbraco-ease rounded-full"></div>

		<Icon
			:class="iconOrientation()"
			class="h-[20px] w-[20px] group-hover:[&>path]:!fill-um-white z-10 group-hover:duration-1000 duration-1000"
			name="material-symbols:arrow-left-alt"
			alt="arrow" />
	</NuxtLink>
</template>

<script setup>
const props = defineProps({
	url: {
		type: String,
		default: '',
	},
	title: {
		type: String,
		default: '',
	},
	spanText: {
		type: String,
		default: '',
	},
	target: {
		type: String,
		default: '',
	},
	btnStyle: {
		type: String,
		validator(value) {
			return ['next', 'prev'].includes(value)
		},
		default: '',
	},
})

const flexOrientation = () => {
	let flexOrientation = ''

	if (props.btnStyle === 'prev') {
		flexOrientation = 'flex-row-reverse'
	} else {
		flexOrientation = 'flex-row'
	}

	return ` ${flexOrientation}`
}

const iconOrientation = () => {
	let iconOrientation = ''

	if (props.btnStyle === 'next') {
		iconOrientation = 'rotate-180'
	} else {
		iconOrientation = ''
	}

	return ` ${iconOrientation}`
}

const textOrientation = () => {
	let textOrientation = ''

	if (props.btnStyle === 'next') {
		textOrientation = 'items-start'
	} else {
		textOrientation = 'items-end'
	}

	return ` ${textOrientation}`
}
</script>
