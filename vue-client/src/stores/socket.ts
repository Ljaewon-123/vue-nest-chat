import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { io, Manager } from 'socket.io-client';

export const useSocketStore = defineStore('socket', () => {

  const manager = new Manager(`${import.meta.env.VITE_SOCKET_URL}`)

  // const socket = manager.socket('/')
  const chat = ref(manager.socket('/chat'))


  const connect = () => {
    console.log('?')

    chat.value.emit('message','connect to server')
    
  }

  chat.value.on('response', (data: any) => {
    console.log('서버로부터의 응답: chat', data); // 서버로부터 받은 응답 데이터 처리
  });


  return {
    connect
  }
})
