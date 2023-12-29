import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { roomSocket } from '@/types'

export const useSystemStore = defineStore('system', () => {

  const roomLst = ref([] as roomSocket[])

  const show = ref(false)
  const mess = ref('')

  function onAlert(message:string){
    show.value = true
    mess.value = message

    setTimeout(() => {
      show.value = false
      mess.value = ''
    },3000)
  }

  function offAlert(){
    show.value = false
  }



  return {
    onAlert,
    offAlert,
    show,
    mess,
    roomLst
  }

})
