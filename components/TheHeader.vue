<template>
	<header
		class="container py-7 fixed bg-um-white top-0 left-1/2 -translate-x-1/2 shadow-sm w-full z-20">
		<nav class="container-row items-center">
			<NuxtLink
				class="col-span-2 mr-auto text-white font-semibold"
				to="/">
				<img src="@/assets/icons/logo.svg" alt="" />
			</NuxtLink>

			<div class="lg:hidden col-span-2 flex justify-end">
				<button class="text-um-blue z-20" @click="toggleMobileMenu">
					<!-- Use a conditional rendering for the icon -->
					<svg
						v-if="!isMobileMenuOpen"
						class="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16m-7 6h7"></path>
					</svg>

					<svg
						v-else
						class="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"></path>
					</svg>
				</button>
			</div>

			<div
				class="container pb-10 pt-10 fixed top-0 right-0 h-screen w-full md:w-1/2 bg-um-white shadow-lg transform transition-transform ease-umbraco-ease duration-300 flex flex-col items-end gap-5 z-10"
				:class="{
					'translate-x-0': isMobile && isMobileMenuOpen,
					'translate-x-full': !isMobileMenuOpen,
				}">
				<NuxtLink
					class="text-um-blue font-bold m-0 hover:underlin"
					to="/documentation"
					@click="toggleMobileMenu">
					Documentation
				</NuxtLink>
				<NuxtLink
					class="text-um-blue font-bold m-0 hover:underline"
					to="/tools"
					@click="toggleMobileMenu">
					Tools
				</NuxtLink>
				<NuxtLink
					class="text-um-blue font-bold m-0 hover:underline"
					to="/insights"
					@click="toggleMobileMenu">
					Insights
				</NuxtLink>
				<NuxtLink
					class="text-um-blue font-bold m-0 hover:underline"
					to="/submission"
					@click="toggleMobileMenu">
					Submission
				</NuxtLink>
				<NuxtLink
					class="text-um-blue font-bold m-0 hover:underline"
					to="/workshop"
					@click="toggleMobileMenu">
					Workshop
				</NuxtLink>
				<NuxtLink
					class="text-um-blue font-bold m-0 hover:underline"
					to="/user"
					@click="toggleMobileMenu"
					>User</NuxtLink
				>
				<a
					class="text-um-blue font-bold m-0 hover:underline"
					@click="userData.logout() && toggleMobileMenu"
					>Log out</a
				>
			</div>

			<div
				class="lg:col-span-10 justify-end gap-8 items-center lg:flex hidden">
				<NuxtLink
					class="text-um-blue font-bold m-0 hover:underline"
					to="/documentation">
					Documentation
				</NuxtLink>
				<NuxtLink
					class="text-um-blue font-bold m-0 hover:underline"
					to="/tools">
					Tools
				</NuxtLink>
				<NuxtLink
					class="text-um-blue font-bold m-0 hover:underline"
					to="/insights">
					Insights
				</NuxtLink>
				<NuxtLink
					class="text-um-blue font-bold m-0 hover:underline"
					to="/submission">
					Submission
				</NuxtLink>
				<NuxtLink
					class="text-um-blue font-bold m-0 hover:underline"
					to="/workshop">
					Workshop
				</NuxtLink>

				<div class="relative">
					<profilePicture
						class="cursor-pointer"
						:src="image"
						@click.stop="toggleDropdown()" />
					<div
						v-if="isDropdownVisible"
						class="absolute right-0 mt-2 w-48 bg-white border-um-blue border-2 rounded-sm shadow-xl overflow-hidden">
						<NuxtLink
							class="block py-2 px-7 text-sm text-gray-700 hover:bg-gray-100 hover:bg-um-palepink overflow-hidden"
							to="/user"
							>User</NuxtLink
						>
						<a
							class="block py-2 px-7 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer hover:bg-um-palepink overflow-hidden"
							@click="userData.logout()"
							>Log out</a
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
const isDropdownVisible = ref(false)
const isMobileMenuOpen = ref(false)

const userData = useUserStore()
const image =
	'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'

const toggleDropdown = () => {
	isDropdownVisible.value = !isDropdownVisible.value
}
const toggleMobileMenu = () => {
	isMobileMenuOpen.value = !isMobileMenuOpen.value
	// Close the profile dropdown when opening the mobile menu
	isDropdownVisible.value = false
}

watch(isDropdownVisible, (newValue) => {
	const body = document.querySelector('body')
	if (newValue === true) {
		body.addEventListener('click', closeDropdown)
	} else {
		body.removeEventListener('click', closeDropdown)
	}
})

function closeDropdown() {
	isDropdownVisible.value = false
}

onMounted(() => {
	if (isDropdownVisible.value === true) {
		const body = document.querySelector('body')
		body.addEventListener('click', closeDropdown)
	}
})

onUnmounted(() => {
	const body = document.querySelector('body')
	body.removeEventListener('click', closeDropdown)
})
</script>
