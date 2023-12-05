import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
	const bearerToken = ref('')

	const userInfo = ref('')

	const RedirectUser = () => {
		if (!localStorage.getItem('bearerToken')) {
			window.location.href = '/login'
		}
	}

	const logout = async () => {
		bearerToken.value = ''
		window.localStorage.setItem('bearerToken', '')
		await navigateTo('/login')
	}

	const loading = ref(false)

	return { bearerToken, userInfo, logout, RedirectUser, loading }
})
