<template>
	<button
		:style="style"
		:class="buttonStyling()"
		class="p5 md:max-w-[220px] max-h-[44px] border rounded-sm font-bold">
		{{ buttonText }}
	</button>
</template>

<script setup lang="ts">
const props = defineProps({
	buttonText: {
		type: String,
		required: true,
	},
	style: {
		type: String,
		validator(value) {
			return ['dark', 'light', 'neutral'].includes(value)
		},
		default: '',
	},
})

const buttonStyling = () => {
	let bgColor = ''

	switch (props.style) {
		case 'dark':
			bgColor =
				'bg-um-blue text-um-palepink border-um-blue hover:bg-um-white hover:text-um-blue'
			break
		case 'light':
			bgColor = 'bg-um-palepink text-um-blue  border-um-palepink '
			break
		case 'neutral':
			bgColor =
				'bg-transparent text-um-blue border-um-blue  hover:text-um-palepink hover:bg-um-blue border-um-blue'
			break
		case 'login':
			bgColor =
				'bg-um-blue hover:bg-um-palepink text-um-palepink hover:text-um-blue hover:border-um-palepink border-um-blue text-center w-full'
			break
		default:
			bgColor =
				'bg-um-blue text-um-palepink border-um-blue hover:bg-um-white  '
			break
	}

	return `rounded-sm px-6 py-2 border-2 ${bgColor} font-bold`
}
</script>
