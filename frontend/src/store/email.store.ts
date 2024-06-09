import type { EmailInfoStore } from '@/interfaces/email.interface'
import { reactive } from 'vue'

export const emailStore = reactive<EmailInfoStore>({
  to: [],
  subject: '',
  body: '',
  attachment: null,
  type: null,
  setTo(to: string) {
    emailStore.to.push(to)
  },
  setSubject(subject: string) {
    emailStore.subject = subject
  },
  setBody(body: string) {
    emailStore.body = body
  },
  setAttachment(attachment: File) {
    emailStore.attachment = attachment
  },
  removeTo(mail: string) {
    emailStore.to = emailStore.to.filter((to) => to !== mail)
  },
  setType(type: string) {
    emailStore.type = type
  },
  clear() {
    emailStore.to = []
    emailStore.subject = ''
    emailStore.body = ''
    emailStore.attachment = null
    emailStore.type = null
  }
})
