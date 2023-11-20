import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const Bearer_token = ref("")


    return { Bearer_token }
})
