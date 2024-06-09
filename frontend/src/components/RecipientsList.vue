<script setup lang="ts">
import { ref } from 'vue'
import { emailStore } from '@/store/email.store'
import { isEmailValid } from '@/utils/validationHelper'

const newRecipient = ref(null)

const addRecipient = () => {
  if (newRecipient.value && isEmailValid(newRecipient.value)) {
    emailStore.setTo(newRecipient.value)
    newRecipient.value = null
  }
}

const deleteRecipient = (recipient: string) => {
  emailStore.removeTo(recipient)
}

const emailRules = [
  (v: string) => !!v || 'Email is required',
  (v: string) => isEmailValid(v) || 'Email must be valid'
]
</script>

<template>
  <v-container class="d-flex flex-column border-thin justify-center bg-white rounded-lg">
    <h2 class="text-center mb-2">Recipients List</h2>
    <v-text-field
      type="email"
      hide-details
      density="compact"
      placeholder="Email address"
      append-icon="mdi-plus"
      variant="outlined"
      v-model="newRecipient"
      :rules="emailRules"
      @click:append="addRecipient"
      @keydown.enter="addRecipient"
    ></v-text-field>
    <div class="pl-1">
      <v-list v-for="(recipient, index) in emailStore.to" :key="index">
        {{ recipient }}
        <v-btn @click="deleteRecipient(recipient)" icon="mdi-delete" density="compact">
          <template v-slot>
            <v-icon color="warning"></v-icon>
          </template>
        </v-btn>
      </v-list>
    </div>
  </v-container>
</template>
