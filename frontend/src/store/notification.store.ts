import { reactive } from 'vue'

export const notificationStore = reactive({
  newNotification: '',
  color: true,
  setNotification(message: string) {
    notificationStore.newNotification = message
    setTimeout(() => {
      notificationStore.newNotification = ''
    }, 3000)
  },
  clearNotification() {
    notificationStore.newNotification = ''
  },
  setNotificationColor(color: boolean) {
    notificationStore.color = color
  }
})
