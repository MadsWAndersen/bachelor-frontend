import { defineStore } from 'pinia';

export const useDataStore = defineStore('dataStore', {
  state: () => ({
    data: []
  }),
  actions: {
    setData(newData) {
      this.data = newData;
    }
  }
});