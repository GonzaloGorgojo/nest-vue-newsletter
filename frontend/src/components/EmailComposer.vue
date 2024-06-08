<script setup lang="ts">
import { ref, computed } from 'vue'
import { emailStore } from '@/store/email.store'

const showDialog = ref(false)

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  emailStore.setAttachment(file)
}

const showButton = computed(() => {
  return !(emailStore.to.length && emailStore.subject && emailStore.body)
})
</script>

<template>
  <v-container class="d-flex flex-column bg-white rounded-lg">
    <v-textarea
      clearable
      v-model="emailStore.body"
      placeholder="Compose your email"
      variant="solo-filled"
      bg-color="grey-lighten-2"
      rows="15"
    ></v-textarea>
    <v-file-input
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

            <v-btn @click="showDialog = false"> Cancel </v-btn>

            <v-btn @click="showDialog = false"> Send </v-btn>
          </template>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>
