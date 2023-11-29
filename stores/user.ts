import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    let Bearer_token = ref("");

    let userInfo = ref("");

    const RedirectUser = () => {
        if (!localStorage.getItem("Bearer_token")) {
            window.location.href = "/login";
        }
    }

    const logout = async () => {
        Bearer_token.value = "";
        window.localStorage.setItem(
            "Bearer_token", ""
        )
        await navigateTo('/login')
    }

    let loading = ref(false);

    return { Bearer_token, userInfo, logout, RedirectUser, loading }
})
