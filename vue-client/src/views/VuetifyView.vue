<template>
  <v-navigation-drawer color="grey-darken-2" permanent></v-navigation-drawer>

  <v-app-bar
    :order="order"
    color="grey-lighten-2"
    flat
    title="Application bar"
  >
    <template v-slot:append>
      <v-switch
        v-model="order"
        hide-details
        inset
        label="Toggle order"
        true-value="-1"
        false-value="0"
      ></v-switch>
    </template>
  </v-app-bar>

  <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
    Main Content
      <v-main>
        agfaesg
      </v-main>
  </v-main>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const order = ref(0)

</script>

<style scoped>

</style>