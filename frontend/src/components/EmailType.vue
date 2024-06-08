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
const selected = ref(null)
</script>

<template>
  <v-select
    :items="emailTypes"
    v-model="selected"
    class="bg-white rounded-lg pb-1"
    label="Email Type"
    hint="Pick email subject"
    persistent-hint
    clearable
    bg-color="grey-lighten-2"
    @update:modelValue="emailStore.setSubject(selected)"
  />
</template>
