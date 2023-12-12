import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSystemStore = defineStore('system', () => {

  const show = ref(false)
  const mess = ref('')

  const joinRoom = ref(false)

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
    joinRoom
  }

})
