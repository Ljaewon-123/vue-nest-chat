<template>
  <div class="chat-container">
    <header class="header" >
      <RouterLink :to="'/main'">
        <svgComponent class="svg" :name="'left'"></svgComponent>
      </RouterLink>
      <div class="title">{{ route.params.roomName }}</div>
    </header>
    <div class="chat-area">
      <Room />
    </div>
  </div>
  
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Room from '@/components/Room.vue';
import svgComponent from '@/components/svgs/index.vue'
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import { useSocketStore } from '@/stores/socket';

const route = useRoute()
const { chat } = useSocketStore()

const joinRoom = () => {
  chat.emit('joinRoom', { roomName: route.params.roomName, name: localStorage.getItem('userName')})
}
joinRoom()

onBeforeRouteLeave(() => {
  
  chat.emit('leaveRoom', { roomName: route.params.roomName, name: localStorage.getItem('userName')})

  console.log(';;;;;;;;;;;;;;;;')
  console.log('컴포넌트 정상 종료.')
  console.log(';;;;;;;;;;;;;;;;')
})

</script>

<style scoped>
.chat-container{
  border: 5px solid var(--vt-c-main);
  border-radius: 12px;
}
.header{
  width: 400px;
  padding: 20px 20px;
  background-color: var(--vt-c-main);
  border-radius: 0 0 12px 12px;
  color: #f0f0f0;

  display: flex;
  align-items: center;
  justify-content: start;
  gap: 20px;
}
.chat-area{
  margin-top: 10px;
  min-height: 480px;
  max-height: 600px;
  /* overflow-y: auto; */
}
.title{
  font-weight: 600;
  font-size: large;
}
</style>