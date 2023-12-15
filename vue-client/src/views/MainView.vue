<template>
  <div class="chat-container">
    <header class="header" >
      <div class="title">오픈채팅 방</div>
      
      <div>
        <button class="btn" @click="reloadRooms">
          <svgComponent :name="'reload'"/>
        </button>
        <button @click="createRoom" class="create-btn">create room</button>
      </div>
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
import svgComponent from '@/components/svgs/index.vue'
import CreateRoom from '@/components/CreateRoom.vue';
import { useSystemStore } from '@/stores/system';
import { storeToRefs } from 'pinia';
import { useSocketStore } from '@/stores/socket';
import { httpChat } from '@/api/AxiosSetup'
import { onBeforeRouteLeave, useRouter } from 'vue-router';

const system = useSystemStore()
const { roomLst } = storeToRefs(system)
const { chat } = useSocketStore()
const { onAlert, offAlert } = useSystemStore()

const router = useRouter()

const show = ref(false)

const close = (cls: boolean) => {
  show.value = cls
}

const createRoom = () => {
  show.value = !show.value
}

const addRoom = (roomName: string) => {
  // 비어있는 방목록 표시는 의미가 없다 판단 만들면 바로 방join

  const duplicationName = roomLst.value.find(x => x.roomName == roomName)
  
  if(duplicationName) return onAlert('이미있는 방이름')

  // roomLst.value.push({ roomName })
  router.push({ path: `room/${roomName}` })
}

const reloadRooms = async() => {
  // ***** http로 방목록 요청하기 클릭시 요청 하는 형태 ******
  // 둘다있어도 괜찮을듯 딜레이가 좀 있어서
  const rooms = await httpChat.get('rooms')
  roomLst.value = rooms.data
}

const autoReloadRooms = () => {
  // ****** 자동으로 reload *****
  chat.on('allRooms', (rooms) => {
    roomLst.value = rooms
  })
}
autoReloadRooms()

onBeforeRouteLeave(() => {
  chat.off('allRooms')
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
.btn{
  padding: 0 10px;
  margin: 0;
}


</style>@/api