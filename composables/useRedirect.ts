import { useUserStore } from '../stores/user'
export function useRedirect() {
	const userData = useUserStore()
	onMounted(() => {
		userData.RedirectUser()
	})
	return {}
}
