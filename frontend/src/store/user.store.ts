import type { UserSession } from '@/interfaces/user.interface'
import { reactive } from 'vue'

export const userStore = reactive<UserSession>({
  active: true,
  setActive(active: boolean) {
    userStore.active = active
  }
})
