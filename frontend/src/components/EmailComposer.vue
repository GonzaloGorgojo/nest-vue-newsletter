<script setup lang="ts">
import { ref, computed } from 'vue'
import { emailStore } from '@/store/email.store'
import { sendEmail } from '@/api/emailApi'
import { notificationStore } from '@/store/notification.store'

const showDialog = ref(false)
const loading = ref(false)

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    emailStore.setAttachment(target.files[0])
  }
}

const showButton = computed(() => {
  return !(emailStore.to.length && emailStore.subject && emailStore.body && emailStore.type)
})

const handleSend = async () => {
  const result = await sendEmail()
  if (result?.code === 201) {
    emailStore.clear()
    showDialog.value = false
    notificationStore.setNotificationColor(true)
    notificationStore.setNotification('Email sent successfully')
  } else {
    showDialog.value = false
    notificationStore.setNotificationColor(false)
    notificationStore.setNotification('Failed to send email')
  }
  loading.value = false
}
</script>

<template>
  <v-container class="d-flex flex-column bg-white rounded-lg">
    <v-text-field
      v-model="emailStore.subject"
      placeholder="Email Subject"
      variant="solo-filled"
      bg-color="grey-lighten-2"
      clearable
    />
    <v-textarea
      clearable
      v-model="emailStore.body"
      placeholder="Compose your email"
      variant="solo-filled"
      bg-color="grey-lighten-2"
      rows="15"
    ></v-textarea>
    <v-file-input
      v-model="emailStore.attachment"
      density="compact"
      accept="image/jpeg, image/png, application/pdf"
      type="file"
      @change="handleFileUpload"
    />
    <div class="text-center pa-4">
      <v-btn :disabled="showButton" @click="showDialog = true"> Finish Editing </v-btn>

      <v-dialog v-model="showDialog" width="auto" persistent>
        <v-card append-icon="mdi-hand-pointing-down" title="Your email will look like this">
          <v-card-subtitle>To: {{ emailStore.to.join(', ') }}</v-card-subtitle>
          <v-card-subtitle>Subject: {{ emailStore.subject }}</v-card-subtitle>

          <v-card-subtitle>Content: {{ emailStore.body }}</v-card-subtitle>
          <v-card-subtitle>Attachment: {{ emailStore.attachment?.name ?? '' }}</v-card-subtitle>

          <template v-slot:actions>
            <v-spacer></v-spacer>

            <v-btn color="warning" @click="showDialog = false"> Cancel </v-btn>

            <v-btn :loading="loading" color="success" @click="handleSend(), (loading = !loading)">
              Send
            </v-btn>
          </template>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>
