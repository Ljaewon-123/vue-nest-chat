<template>
  <component :is="dynamicComponent"></component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import IconCommunity from './IconCommunity.vue';
import IconDocumentation from './IconDocumentation.vue';
import IconEcosystem from './IconEcosystem.vue';
import IconSupport from './IconSupport.vue';
import IconTooling from './IconTooling.vue';

const props = defineProps({
  name:{
    type:String,
    required: true
  }
})

const dynamicComponent = computed(() => {
  switch(props.name){
    case 'community' : return IconCommunity
    case 'document' : return IconDocumentation
    case 'ecosystem' : return IconEcosystem
    case 'support' : return IconSupport
    case 'tooling' : return IconTooling
    default : return IconCommunity
  }
})


</script>