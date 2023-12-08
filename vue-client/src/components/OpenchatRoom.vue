<template>
  <div class="chat">
    <!-- 똑같은 라우터로 여러개 어케만들지?? -->
    <!-- 일단 컴포넌트로 만들고 라우터로 옮기든지 하자 -->
    <!-- 채팅방 이름이나 넘버 보여주고 클릭하면 채팅방열어줌  -->
    <!-- 모든 채팅방 목록을 가져오게 되겠네?? -->
    <div class="room-name" >Room name</div>
  </div>
</template>

<script setup lang="ts">

//  props면 array로 받아야하고 아니면 props가 아님

</script>

<style scoped>
.chat{
  border: 1px solid var(--vt-c-main-2);
  border-radius: 8px;
  cursor: pointer;
}
</style>