<template>
	<div class="container-row">
		<div
			class="lg:col-span-4 lg:col-start-4 col-span-full flex flex-col gap-3">
			<h1 class="text-2xl font-bold text-um-blue mb-5">User settings</h1>

			<p class="text-base">Edit your user settings</p>

			<div
				class="flex lg:flex-row justify-between flex-col lg:gap-0 gap-2">
				<span class="flex items-center text-um-blue text-sm"
					>Name:</span
				>
				<input
					v-if="user?.name"
					v-model="updatedUser.name"
					class="py-2 px-2 border-2 border-um-blue rounded-xs outline-none w-full max-w-[300px]"
					type="text"
					:placeholder="user?.name" />
			</div>

			<div
				class="flex lg:flex-row justify-between flex-col lg:gap-0 gap-2">
				<span class="flex items-center text-um-blue text-sm"
					>Member type:</span
				>
				<input
					v-if="user?.memberTypeAlias"
					class="py-2 px-2 border-2 border-um-blue rounded-xs outline-none w-full max-w-[300px]"
					type="text"
					:placeholder="user.memberTypeAlias" />
			</div>

			<div
				class="flex lg:flex-row justify-between flex-col lg:gap-0 gap-2">
				<span class="flex items-center text-um-blue text-sm"
					>Email:</span
				>
				<input
					v-if="user?.email"
					v-model="updatedUser.email"
					class="py-2 px-2 border-2 border-um-blue rounded-xs outline-none w-full max-w-[300px]"
					type="text"
					:placeholder="user?.email" />
			</div>

			<ModalBlock v-if="modal === true">
				<h2 class="text-2xl text-um-blue">Are you sure</h2>
				<span class="mb-3 text-um-blue"
					>You are about to update your user informations.</span
				>

				<div class="flex gap-2 justify-between mt-9">
					<Button
						class="!w-full"
						:buttonText="'No cancel'"
						:style="'neutral'"
						@click="toggleModal" />
					<Button
						class="!w-full"
						:buttonText="'Update user'"
						:style="'dark'"
						@click="updateUserInfo" />
				</div>
			</ModalBlock>
			<Button
				:buttonText="'Update'"
				:style="'dark'"
				class="mt-6"
				@click="toggleModal" />
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const user = ref(null)
const updatedUser = ref({
	name: '',
	email: '',
	memberTypeAlias: 'Member',
	username: '',
})

const modal = ref(false)

const toggleModal = () => {
	modal.value = !modal.value
	console.log(modal.value)
}

onMounted(() => {
	const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
	if (userInfo) {
		user.value = userInfo
		updatedUser.value = { ...userInfo }
	}
})

const updateUserInfo = async () => {
	if (!user.value?.username) {
		console.error('Username is undefined')
		return
	}

	try {
		console.log('Updating user with:', updatedUser.value)
		const response = await fetch(
			`https://api.umbraco.io/member/${user.value.username}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'Accept-Language': 'en-US',
					'umb-project-alias': 'pba-webdev',
					Authorization: 'Basic ZlJkeFdoSkI1Sk82T1BvUllGREQ6',
				},
				body: JSON.stringify(updatedUser.value),
			},
		)

		if (!response.ok) {
			const errorData = await response.json()
			console.error('Server responded with:', errorData)
			throw new Error(`HTTP error! status: ${response.status}`)
		}

		const data = await response.json()
		console.log('User info updated:', data)
		console.log('window.localStorage.clear()')
		window.localStorage.clear()
		window.location.replace('/login')
	} catch (error) {
		console.error('Error updating user info:', error)
	}
}
</script>
