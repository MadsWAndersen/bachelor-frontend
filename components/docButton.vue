<template>
	<div
		:btnStyle="btnStyle"
		:class="flexOrientation()"
		class="flex cursor-pointer bg-um-white justify-between items-center border-2 p-4 rounded-sm max-h-9">
		<div class="flex flex-col pl-3" :class="textOrientation()">
			<span class="text-xs font-medium"> {{ spanText }}</span>
			<NuxtLink
				:to="url"
				:target="target"
				class="text-lg capitalize line-clamp-1"
				>{{ title }}
			</NuxtLink>
		</div>
		<img
			:class="iconOrientation()"
			class="h-[20px] w-[20px]"
			src="../assets/icons/docButtonArrow.svg"
			alt="arrow" />
	</div>
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
