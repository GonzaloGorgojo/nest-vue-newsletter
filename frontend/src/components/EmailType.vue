<script setup>
import { ref } from 'vue'
import { emailStore } from '@/store/email.store'

const emailTypes = ref([
  'Stori Cuenta',
  'Stori Card',
  'Stori Black',
  'Stori News',
  'Stori Prestamo'
])
</script>

<template>
  <v-select
    :items="emailTypes"
    v-model="emailStore.type"
    class="bg-white rounded-lg pb-1"
    label="Email Type"
    hint="Pick email type for internal tracking only."
    persistent-hint
    clearable
    bg-color="grey-lighten-2"
    @update:modelValue="emailStore.setType(emailStore.type)"
  />
</template>
