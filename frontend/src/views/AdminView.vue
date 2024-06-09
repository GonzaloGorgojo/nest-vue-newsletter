<script setup lang="ts">
import EmailComposer from '@/components/EmailComposer.vue'
import EmailType from '@/components/EmailType.vue'
import NotificationSnack from '@/components/NotificationSnack.vue'
import RecipientsList from '@/components/RecipientsList.vue'
import router from '@/router'
import { userStore } from '@/store/user.store'

const handleLogin = () => {
  userStore.setActive(false)
  router.replace('/login')
}
</script>

<template>
  <v-app>
    <v-container fluid id="admin-container">
      <v-app-bar elevation="2" class="px-3" density="compact" flat id="admin-bar">
        <v-app-bar-title class="text-teal-accent-3">Stori Newsletter </v-app-bar-title>

        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
              color="teal-accent-3"
              v-bind="props"
              prepend-icon="mdi-account"
              class="text-center"
              >ADMIN</v-btn
            >
          </template>
          <v-list>
            <v-list-item>
              <v-btn color="teal-accent-3" block @click="handleLogin"> Log Out </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>

      <v-main class="mt-2">
        <v-row>
          <v-col cols="12" md="2">
            <EmailType />
          </v-col>

          <v-col cols="12" md="7">
            <EmailComposer />
          </v-col>

          <v-col cols="12" md="3">
            <RecipientsList />
          </v-col>
        </v-row>
      </v-main>
      <NotificationSnack />
    </v-container>
  </v-app>
</template>
