<script setup lang="ts">
import { computed } from 'vue'
import { notificationStore } from '@/store/notification.store'

const showSnackbar = computed(() => {
  return !!notificationStore.newNotification
})

const props = defineProps({
  color: {
    type: String,
    default: 'success'
  }
})
</script>

<template>
  <v-snackbar v-model="showSnackbar" :color="props.color">
    {{ notificationStore.newNotification }}

    <template v-slot:actions>
      <v-btn color="white" variant="text" @click="notificationStore.clearNotification()">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
