import { reactive } from 'vue'

export const notificationStore = reactive({
  newNotification: '',
  setNotification(message: string) {
    notificationStore.newNotification = message
    setTimeout(() => {
      notificationStore.newNotification = ''
    }, 2000)
  },
  clearNotification() {
    notificationStore.newNotification = ''
  }
})
