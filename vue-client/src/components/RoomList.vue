<template>
<TransitionGroup name="list">
  <div v-for="item, index in rooms" :key="index" @click="test" class="flex room" >

    <div v-if="!roomModify" >{{ item.roomName }}</div>
    <div v-else><input v-model="item.roomName" type="text"> </div>

    <div class="btn-area">
      <button class="btn" @click="modifyRoomName(index)" >modefy</button>
      <button class="btn" @click="deleteRoom(index)" >Delete</button>
    </div>
  </div>
</TransitionGroup>
</template>

<script setup lang="ts">
import type { roomSocket } from '@/types';
import { ref } from 'vue';
import { useSystemStore } from '@/stores/system'
import { storeToRefs } from 'pinia';

const system = useSystemStore()
const { joinRoom } = storeToRefs(system)

const props = defineProps({
  rooms: Array<roomSocket>
})

const roomModify = ref(false)

const test = (event: any) => {
  // console.log(event.target.classList)
  const clcickBtn = event.target.classList.value.includes('btn')
  // console.log(clcickBtn)

  if(clcickBtn) return 

  joinRoom.value = true
}

const deleteRoom = (index: number) => {
  props.rooms?.splice(index, 1)
}

const modifyRoomName = (index: number) =>{
  roomModify.value = !roomModify.value
}

</script>

<style scoped>
.room{
  border: 3px solid var(--vt-c-main-2);
  border-radius: 8px;
  
  padding: 8px;
  
  cursor: pointer;
  
  justify-content: space-between;
}
.room-list{
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.btn-area{
  display: flex;
  gap: 10px;
}
.btn{
  margin: 0;
  padding: 0;
}
.list-leave-active {
  transition: all 0.5s ease;
}

.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-enter-active{
  transition: transform 0.5s;
}
.list-enter-from{
  transform: translateY(100%);
}
input{
  margin: 0;
}
</style>