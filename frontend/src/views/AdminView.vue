<script setup lang="ts">
import RecipientsList from '@/components/RecipientsList.vue'
import router from '@/router'
import { userStore } from '@/store/user.store'

const links = ['Emails', 'Dashboard']

const handleLogin = () => {
  userStore.setActive(false)
  router.replace('/login')
}
</script>

<template>
  <v-app id="main-bg">
    <v-app-bar class="px-3" density="compact" flat>
      <v-spacer></v-spacer>

      <v-tabs color="grey-darken-2" centered>
        <v-tab v-for="link in links" :key="link" :text="link"></v-tab>
      </v-tabs>
      <v-spacer></v-spacer>

      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn color="primary" v-bind="props" prepend-icon="mdi-account" class="text-center"
            >ADMIN</v-btn
          >
        </template>
        <v-list>
          <v-list-item>
            <v-btn color="red" block @click="handleLogin"> Log Out </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-row>
          <v-col cols="12" md="2">
            <v-sheet min-height="268" rounded="lg">
              <!--  -->
            </v-sheet>
          </v-col>

          <v-col cols="12" md="8">
            <v-sheet min-height="70vh" rounded="lg">
              <!--  -->
            </v-sheet>
          </v-col>

          <v-col cols="12" md="2">
            <RecipientsList />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
