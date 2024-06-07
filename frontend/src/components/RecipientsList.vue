<script setup lang="ts">
import { ref } from 'vue'

const newRecipient = ref('')
const recipients = ref<string[]>([])

const addRecipient = () => {
  if (newRecipient.value) {
    recipients.value.push(newRecipient.value)
    newRecipient.value = ''
  }
}

const deleteRecipient = (index: number) => {
  recipients.value.splice(index, 1)
}
</script>

<template>
  <v-container class="d-flex flex-column border-thin justify-center bg-white rounded-lg">
    <h2 class="text-center mb-2">Recipients List</h2>
    <v-text-field
      hide-details
      density="compact"
      placeholder="Email address"
      append-icon="mdi-plus"
      variant="outlined"
      v-model="newRecipient"
      @click:append="addRecipient"
      type="email"
    ></v-text-field>
    <div class="pl-1">
      <v-list v-for="(recipient, index) in recipients" :key="index">
        {{ recipient }}
        <v-btn @click="deleteRecipient(index)" icon="mdi-delete" density="compact">
          <template v-slot>
            <v-icon color="warning"></v-icon>
          </template>
        </v-btn>
      </v-list>
    </div>
  </v-container>
</template>
