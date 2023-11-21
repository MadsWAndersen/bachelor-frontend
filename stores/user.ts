import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    let Bearer_token = ref("")

    const logout = () => {
        Bearer_token.value = "";
    }

    return { Bearer_token, logout }
})
