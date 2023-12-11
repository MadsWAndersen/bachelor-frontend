// store.ts
import { defineStore } from 'pinia'

export const usePageStore = defineStore('pageStore', {
	state: () => ({
		id: '',
	}),
	actions: {
		setID(data: string) {
			this.id = data
		},
	},
})
