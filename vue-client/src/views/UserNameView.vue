<template>
  <Transition >
    <div class="modal-container">
      <div class="modal">
        <header>
          <div style="flex:1; text-align: center;">create user name</div>
          <!-- <svgComponent class="svg" :name="'xmark'" @click="close()"></svgComponent> -->
        </header>
        <div class="flex input">
          <div class="text"></div>
          <input @keyup.enter="[craeteName(),]" v-model="userName" type="text" maxlength="11" placeholder="Room Name" required>
          <button class="btn" @click="[craeteName(),]">create</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import svgComponent from '@/components/svgs/index.vue'
import { useSystemStore } from '@/stores/system';
import { useRouter } from 'vue-router';

const { onAlert, offAlert } = useSystemStore()

const router = useRouter()

const userName = ref('')

const craeteName = () => {
  if(userName.value == '') return onAlert('write user name')

  localStorage.setItem('userName', userName.value);
  onAlert(`Welcome ${userName.value}`)
  userName.value = ''
  router.push({ path: `main` })
}



</script>

<style scoped>
.modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
}
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