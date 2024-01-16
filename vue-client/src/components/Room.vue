<template>
  <div class="room-container">
    
    <div class="message scroll">
      <div class="message-area" v-for="item in messArr">
        <div v-if="userName == item.name" class="mine">
          {{ compare(item.name, item.mess) }}
        </div>
        <div v-else-if="item.name == 'goodbye' || item.name=='Welcome'" class="welcome">
          {{ welcomeText(item.name, item.mess) }}
        </div>
        <div v-else class="other">
          {{ compare(item.name, item.mess) }}
        </div>
      </div>
    </div>

    <form class="form-send">
      <div class="flex">
        <input v-model="input" type="text" class="input" placeholder="Send Message" required>
        <button @click.prevent="submit()" class="btn">전송</button>
      </div>
    </form>

  </div>
  <v-snackbar color="error" location="top" v-model="snackbar" :timeout="2000">
    {{ socketErrText }}
  </v-snackbar>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import axios from 'axios'
import { useSocketStore } from '@/stores/socket';
import { storeToRefs } from 'pinia';

const { chat } = useSocketStore()

const input = ref()
const messArr = ref([] as any[])

const userName = ref(localStorage.getItem('userName'))

const socketErrText = ref('')
const snackbar = ref(false)

const exceptionSocket = () => {
  chat.on('exception', (error) => {
    socketErrText.value = error.message

    snackbar.value = true
  })
}
exceptionSocket()

chat.on('response', (mess: {value:string, userName:string}) => {

  const { value, userName } = mess
  
  messArr.value.push({ mess: value, name: userName })
})

chat.on('welcome', (mess:{value:string, userName:string}) => {
  const { value, userName } = mess

  console.log(userName)
  
  messArr.value.push({ mess: value, name: userName })
})

const submit = () => {
  chat.emit('message', { userName: userName.value, value: input.value})
  input.value = ''
}

const compare = (name:string, mess:string) => {
  if(name == userName.value) return `me: ${mess}`

  if(!name) return `???: ${mess}`

  return `${name}: ${mess}`
}

const welcomeText = (name:string, mess:string) => {
  return `${name.toUpperCase()} ${mess}`
}


</script>

<style scoped>
.message{
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 480px;
  overflow-y: auto;
}
.message > div{
  color: #fff;
}
.message-area{
  display: grid;
  grid-template-columns: auto auto auto; 
  /* grid-template-rows: auto auto; 두 개의 행 생성 */
  /* width: 100%;
  height: 100%; */
  /* border: 1px solid #000; 네모 안에 테두리를 보기 위한 스타일 */
}
.mine{
  grid-column: 1;
  grid-row: 1; 
  background-color: hsla(160, 70%, 60%, 1);
  border-radius: 12px;
  padding: 15px;
}
.welcome{
  grid-column: 2;
  grid-row: 1; 
  background-color: rgb(54, 59, 58);
  border-radius: 12px;
  padding: 15px;
}
.other{
  grid-column: 3;
  grid-row: 1; 
  background-color: hsla(160, 100%, 27%, 1);
  border-radius: 12px;
  padding: 15px;
}
.room-container{
  width: 100%;
  height: 100%;
  
  /* 길이조절 하셈 */
  display: grid;
  grid-template-rows: 5fr 1fr;
}
.input{
  margin: 0;
  width: 70%;
  border: 1px solid var(--vt-c-main);
}
.btn{
  margin: 0;
  padding: 8px 24px;
  background-color: var(--vt-c-main);
}
.flex{
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-send{
  width: 100%;
  max-width: 100%;
}

</style>