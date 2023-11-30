<template>
	<header class="container pb-7 pt-7">
		<nav class="container-row items-center">
			<NuxtLink class="col-span-2 mr-auto text-white font-semibold" to="/"
				><img src="@/assets/icons/logo.svg" alt="" />
			</NuxtLink>

			<div class="lg:col-span-10 flex justify-end gap-8 items-center">
				<NuxtLink class="text-um-blue font-bold m-0 hover:underline" to="/"
					>Home</NuxtLink
				>
				<NuxtLink
					class="text-um-blue font-bold m-0 hover:underline"
					to="/documentation"
					>Documentation</NuxtLink
				>
				<NuxtLink class="text-um-blue font-bold m-0 hover:underline" to="/form"
					>Form</NuxtLink
				>
				<NuxtLink class="text-um-blue font-bold m-0 hover:underline" to="/login"
					>login</NuxtLink
				>

				<profilePicture
					class="cursor-pointer"
					@click="userData.logout()"
					:image="image" />
			</div>
		</nav>
	</header>
</template>

<script setup>
import { useUserStore } from '../stores/user'
const userData = useUserStore()
const image =
	'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
</script>
