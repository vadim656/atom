import { ref } from '@nuxtjs/composition-api'
import { defineStore } from 'pinia'

export const useSity = defineStore('sity', {
  state: () => ({
    sity: 'Москва',
    id: 1
    // ...
  }),
  getters: {
    getSityName: state => state.sity,
    getSityId: state => state.id
  },
  actions: {
    SetSityData (item) {
      this.sity = item.attributes.Name
      this.id = item.id
    }
  }
})
