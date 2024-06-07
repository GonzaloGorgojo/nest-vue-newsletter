<script setup lang="ts">
import { ref } from 'vue'
import { userStore } from '@/store/user.store'
import router from '@/router'

const visible = ref(false)

const handleLogin = () => {
  userStore.setActive(true)
  router.replace('/')
}
</script>

<template>
  <v-app id="main-bg">
    <div class="my-10">
      <v-img class="mx-auto my-6" max-width="228" src="@/assets/storil.png"> </v-img>

      <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
        <div class="text-subtitle-1 text-medium-emphasis">Account</div>

        <v-text-field
          density="compact"
          placeholder="Email address"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          Password

          <a class="text-caption text-decoration-none text-blue" href=""> Forgot login password?</a>
        </div>

        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <v-btn class="mb-8" color="black" size="large" block @click="handleLogin"> Log In </v-btn>
      </v-card>
    </div>
  </v-app>
</template>
