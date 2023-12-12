<template>
  <div class="chat-container">
    <header class="header" >
      <div class="title">오픈채팅 방</div>

      <button @click="createRoom" class="create-btn">create room</button>
    </header>
    <div class="chat-area scroll">
      <RoomList :rooms="roomLst" />
      <!-- <Room v-else /> -->
    </div>
  </div>
  
  <CreateRoom :show="show" @close="close" @addRoom="addRoom" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import RoomList from '@/components/RoomList.vue';
import Room from '@/components/Room.vue';
import CreateRoom from '@/components/CreateRoom.vue';
import type { roomSocket } from '@/types/index'
import { useSystemStore } from '@/stores/system';
import { storeToRefs } from 'pinia';

const system = useSystemStore()
// const { joinRoom } = storeToRefs(system)

const show = ref(false)
const roomLst = ref([] as roomSocket[])

const close = (cls: boolean) => {
  show.value = cls
}

const createRoom = () => {
  show.value = !show.value
}

const addRoom = (roomName: string) => {

  const duplicationName = roomLst.value.find(x => x.roomName == roomName)

  if(duplicationName) return // alert

  roomLst.value.push({ roomName })
}

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
  justify-content: space-between;
}
.title{
  font-weight: 600;
  font-size: large;
}
.create-btn{
  background-color: var(--vt-c-main-2);
  border-color: var(--vt-c-main-2);
  border-radius: 12px;
  padding: 0 10px;
  margin: 0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.chat-area{
  margin-top: 10px;
  min-height: 480px;
  max-height: 600px;
  overflow-y: auto;
}


</style>