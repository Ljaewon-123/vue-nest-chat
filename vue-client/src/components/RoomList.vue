<template>
<TransitionGroup name="list">
  <div v-for="item, index in rooms" :key="index" @click="enterRoom($event, item.roomName)" class="flex room" >

    <div v-if="!roomModify" >{{ item.roomName }}</div>
    <div v-else><input class="input" v-model="item.roomName" type="text" maxlength="19"> </div>

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
import { useRouter } from 'vue-router';
import router from '@/router';
import { useSocketStore } from '@/stores/socket';


const props = defineProps({
  rooms: Array<roomSocket>
  })

const system = useSystemStore()
const { onAlert, offAlert } = useSystemStore()
const { chat } = useSocketStore()

const roomModify = ref(false)



const enterRoom = (event: any, roomName:string) => {
  // console.log(event.target.classList)
  const clcickBtn = event.target.classList.value.includes('btn')
  const clickInput = event.target.classList.value.includes('input')

  if(clcickBtn || clickInput) return 

  onAlert('enter the room')

  router.push({ path: `room/${roomName}` })

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