<template>
  <div class="chat-container">
    <header class="header" >
      <RouterLink :to="'/main'">
        <svgComponent class="svg" :name="'left'"></svgComponent>
      </RouterLink>
      <div class="title">{{ route.params.roomName }}</div>
    </header>
    <div class="chat-area scroll">
      <Room />
    </div>
  </div>
  
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Room from '@/components/Room.vue';
import svgComponent from '@/components/svgs/index.vue'
import { useRoute } from 'vue-router';

const route = useRoute()
console.log(route.params)

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
  overflow-y: auto;
}
.title{
  font-weight: 600;
  font-size: large;
}
</style>