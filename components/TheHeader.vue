<template>
	<header class="container pb-10 pt-7">
		<nav class="container-row items-center">
			<NuxtLink
				class="col-span-2 mr-auto text-white font-semibold"
				to="/">
				<img src="@/assets/icons/logo.svg" alt="" />
			</NuxtLink>

			<div class="lg:col-span-10 flex justify-end gap-8 items-center">
				<NuxtLink
					class="text-um-blue font-bold m-0 hover:underline"
					to="/documentation"
					>Documentation</NuxtLink
				>
				<NuxtLink
					class="text-um-blue font-bold m-0 hover:underline"
					to="/tools"
					>Tools</NuxtLink
				>
				<NuxtLink
					class="text-um-blue font-bold m-0 hover:underline"
					to="/insights"
					>Insights</NuxtLink
				>
				<NuxtLink
					class="text-um-blue font-bold m-0 hover:underline"
					to="/workshop"
					>Workshop</NuxtLink
				>

				<div class="relative">
					<profilePicture
						class="cursor-pointer"
						:src="image"
						@click="toggleDropdown()" />
					<div
						v-if="isDropdownVisible"
						class="absolute right-0 mt-2 w-48 bg-white border-um-blue border-2 rounded-sm shadow-xl overflow-hidden">
						<NuxtLink
							class="block px-4 py-2 px-7 text-sm text-gray-700 hover:bg-gray-100 hover:bg-um-palepink overflow-hidden"
							to="/user"
							>User</NuxtLink
						>
						<a
							class="block px-4 py-2 px-7 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer hover:bg-um-palepink overflow-hidden"
							@click="userData.logout()"
							>Logout</a
						>
					</div>
				</div>
			</div>
		</nav>
	</header>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'

const userData = useUserStore()
const image =
	'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'

const isDropdownVisible = ref(false)

const toggleDropdown = () => {
	isDropdownVisible.value = !isDropdownVisible.value
}
</script>
