<template>
  <div class="chat-container">
    <header class="header" >
      오픈채팅 방
    </header>
    <div class="chat-area scroll">
      <OpenchatRoom />
      <!-- <Rooms /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import OpenchatRoom from '@/components/OpenchatRoom.vue';
import Rooms from '@/components/Rooms.vue';
import { useRequestStore } from '@/stores/request';

const { joinRoom } = useRequestStore()

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

  font-weight: 600;
  font-size: large;
}
.chat-area{
  margin-top: 10px;
  min-height: 480px;
  max-height: 600px;
  overflow-y: auto;
}


</style>