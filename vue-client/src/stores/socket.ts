import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { io, Manager } from 'socket.io-client';

export const useSocketStore = defineStore('socket', () => {

  // 처음 사용되야지만 연결.. 나쁘지 않네
  const manager = new Manager(`${import.meta.env.VITE_SOCKET_URL}`)

  // const socket = manager.socket('/')
  const chat = manager.socket('/chat',{
    auth: {
      token: "Token" // auth확인용 access: Token
    }
  })


  const connect = () => {
    console.log('connect socket')

    chat.emit('message','connect to server')
    
  }

  chat.on('response', (data: any) => {
    console.log('서버로부터의 응답: chat', data); // 서버로부터 받은 응답 데이터 처리
  });


  return {
    connect,
    chat
  }
})
