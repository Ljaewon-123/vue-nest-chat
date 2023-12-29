<template>
  <div class="chat-container">
    <header class="header" >
      <RouterLink :to="'/main'">
        <svgComponent class="svg" :name="'left'"></svgComponent>
      </RouterLink>
      <div class="title">Redis Stream</div>
    </header>
    <div class="chat-area">
      <!-- Room Redis Stream -->
      <div class="room-container">
    
      <div class="message scroll">
        <div class="message-area" v-for="item in messArr">
          <div class="other">
            {{ item.name }}
          </div>
        </div>
      </div>

      <form>
        <div class="flex">
          <input v-model="input" type="text" class="input" placeholder="Send Message" required>
          <button @click.prevent="submit()" class="btn">전송</button>
        </div>
      </form>

    </div>
    </div>
  </div>
  
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Room from '@/components/Room.vue';
import svgComponent from '@/components/svgs/index.vue'
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import { useSocketStore } from '@/stores/socket';
import { httpApp } from '@/api/AxiosSetup';

const route = useRoute()

const input = ref('')
const messArr = ref([] as any[])

const submit = () => {
  
}

const redisStream = async() => {
  await httpApp.get('message')
}
redisStream()

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
  border: 1px solid #000; /* 네모 안에 테두리를 보기 위한 스타일 */
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
  padding: 2px 25px;
}
.flex{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>