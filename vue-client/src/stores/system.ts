import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSystemStore = defineStore('system', () => {

  const joinRoom = ref(false)


  return {
    joinRoom
  }

})
