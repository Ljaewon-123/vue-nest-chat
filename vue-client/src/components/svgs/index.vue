<template>
  <component :is="dynamicComponent"></component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import leftArrow from './left-arrow.vue';
import rightArrow from './right-arrow.vue';
import xmark from './xmark.vue';
import reload from './reload.vue'

const props = defineProps({
  name:{
    type:String,
    required: true
  }
})

const dynamicComponent = computed(() => {
  switch(props.name){
    case 'left' : return leftArrow
    case 'right' : return rightArrow
    case 'xmark' : return xmark
    case 'reload' : return reload
    default : return xmark
  }
})


</script>