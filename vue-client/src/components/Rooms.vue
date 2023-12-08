<template>
  <div class="room-container">
    
    <div class="message">
      <!-- sdf -->
    </div>

    <form>
      <div class="flex">
        <input v-model="input" type="text" class="input" placeholder="Send Message" required>
        <button @click.prevent="submit()" class="btn">전송</button>
      </div>
    </form>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useSocketStore } from '@/stores/socket';
import { storeToRefs } from 'pinia';

const { chat } = useSocketStore()

const input = ref()
console.log(chat)
const submit = () => {
  chat.emit('message', input.value)
  input.value = ''
}


</script>

<style scoped>
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
  padding: 2px 25px;
}
.flex{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>