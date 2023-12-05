import { ref } from 'vue'
import { d as defineStore } from '../server.mjs'

const useUserStore = defineStore('user', () => {
	let Bearer_token = ref('')
	let userInfo = ref('')
	const RedirectUser = () => {
		if (!localStorage.getItem('Bearer_token')) {
			window.location.href = '/login'
		}
	}
	const logout = () => {
		Bearer_token.value = ''
		window.localStorage.setItem('Bearer_token', '')
	}
	let loading = ref(false)
	return { Bearer_token, userInfo, logout, RedirectUser, loading }
})

export { useUserStore as u }
//# sourceMappingURL=user-ae9c2965.mjs.map
