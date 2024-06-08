import type { EmailInfo } from '@/interfaces/email.interface'
import { reactive } from 'vue'

export const emailStore = reactive<EmailInfo>({
  to: [],
  subject: '',
  body: '',
  attachment: null,
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
  }
})
