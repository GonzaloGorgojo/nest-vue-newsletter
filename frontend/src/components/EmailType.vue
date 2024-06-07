<script setup lang="ts">
const emailTypes = ['Stori Cuenta', 'Stori Card', 'Stori Black', 'Stori News', 'Stori Prestamo']
</script>

<template>
  <v-select
    :items="emailTypes"
    class="bg-white rounded-lg pb-1"
    label="Email Type"
    hint="Pick email subject"
    persistent-hint
    clearable
    bg-color="grey-lighten-2"
  >
  </v-select>
</template>
