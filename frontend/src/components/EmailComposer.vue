<script setup>
import { ref } from 'vue'

const emailContent = ref('')
const attachment = ref(null)
const attachmentName = ref('')
const showDialog = ref(false)

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  attachment.value = file
  attachmentName.value = file.name
}
</script>

<template>
  <v-container class="d-flex flex-column bg-white rounded-lg">
    <v-textarea
      clearable
      v-model="emailContent"
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
      <v-dialog v-model="showDialog" max-width="400" persistent>
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn color="grey-lighten-2" density="default" v-bind="activatorProps">
            Finish Editing
          </v-btn>
        </template>

        <v-card append-icon="mdi-hand-pointing-down" title="Your email will look like this">
          <v-card-subtitle>To:</v-card-subtitle>
          <v-card-subtitle>Subject:</v-card-subtitle>

          <v-card-subtitle>Content: {{ emailContent }}</v-card-subtitle>
          <v-card-subtitle>Attachment: {{ attachmentName }}</v-card-subtitle>

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
