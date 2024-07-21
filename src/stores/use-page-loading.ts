import { defineStore } from 'pinia'

export const usePageLoadingStore = defineStore('pageLoading', {
  state: () => ({
    loading: false as boolean
  }),

  actions: {
    showLoading() {
      this.loading = true
    },
    hideLoading() {
      this.loading = false
    }
  }
})
