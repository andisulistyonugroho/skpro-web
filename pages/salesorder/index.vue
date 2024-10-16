<script setup lang="ts">
const tab = ref(1)
</script>
<template>
  <v-tabs v-model="tab" align-tabs="start" color="primary" class="mt-0 mb-3">
    <v-tab :value="1" to="/salesorder">List</v-tab>
    <v-tab :value="2" to="/salesorder/add">Add</v-tab>
  </v-tabs>
  <v-container fluid>

  </v-container>
</template>