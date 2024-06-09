<script setup lang="ts">
import { computed } from 'vue'
import { notificationStore } from '@/store/notification.store'

const showSnackbar = computed(() => {
  return !!notificationStore.newNotification
})

const snapColor = computed(() => {
  return notificationStore.color
})
</script>

<template>
  <v-snackbar v-model="showSnackbar" :color="snapColor ? 'success' : 'warning'">
    {{ notificationStore.newNotification }}

    <template v-slot:actions>
      <v-btn color="white" variant="text" @click="notificationStore.clearNotification()">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
