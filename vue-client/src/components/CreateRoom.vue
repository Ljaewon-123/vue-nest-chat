<template>
  <Transition >
    <div v-if="props.show" class="modal-container">
      <div class="modal">
        <header>
          <div style="flex:1; text-align: center;">create room</div>
          <svgComponent class="svg" :name="'xmark'" @click="close()"></svgComponent>
        </header>
        <div class="flex input">
          <div class="text"></div>
          <input @keyup.enter="[craeteRoom(), close()]" v-model="roomName" type="text" placeholder="Room Name" required>
          <button class="btn" @click="[craeteRoom(), close()]">create</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import svgComponent from '@/components/svgs/index.vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close', 'addRoom'])

const roomName = ref('')

const craeteRoom = () => {
  if(roomName.value == '') return // alert
  emit('addRoom', roomName.value)
  roomName.value = ''

  // roomName 보내서 방 join  // alert
}

const close = () => {
  emit('close', false )
}

</script>

<style scoped>
.svg{
  cursor: pointer;
}
.modal{
  border: 3px solid var(--vt-c-modal);
  border-radius: 12px;
}
.modal header{
  background-color: var(--vt-c-modal);
  padding: 5px 5px;

  display: flex;
  align-items: center;
  justify-content: space-between;
}
input{
  margin: 16px;
}
.btn{
  margin: 16px;
  padding: 2px 25px;
  background-color: var(--vt-c-modal);
  border-color: var(--vt-c-modal);;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>