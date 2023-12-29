<template>
<Transition :name="'bounce'">
  <div v-if="show" class="alert">
    <div class="text">
      {{ mess }}
    </div>
  </div>
</Transition>
</template>

<script setup lang="ts">
import { useSystemStore } from '@/stores/system';
import { storeToRefs } from 'pinia';

const system = useSystemStore()
const { show, mess } = storeToRefs(system)
const { onAlert, offAlert } = useSystemStore()

</script>

<style scoped>
.text{
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--vt-c-modal);
  border-radius: 12px;
  width: 150px;
  height: 60px;
  border-radius: 12px;
}
.alert{
  
  position: fixed;
  top: 30px;
  left: 45%;
  color: #ffffff;
  /* background-color: var(--vt-c-main); */

  z-index: 10;
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>