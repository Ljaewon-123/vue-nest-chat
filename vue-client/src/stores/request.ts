import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useRequestStore = defineStore('request', () => {

  const joinRoom = (roomName: string) => {
    console.log('join')
    try {
      axios.post('http://localhost:3000/chat/join',{ roomName })
    } catch (error) {
      console.log(error, axios)
    }

  }

  return {
    joinRoom
  }
})
