import { emailStore } from '@/store/email.store'
import httpHelper from '@/utils/httpHelper'

export const sendEmail = async () => {
  try {
    const formData = new FormData()

    formData.append('to', emailStore.to.join(','))
    formData.append('subject', emailStore.subject)
    formData.append('body', emailStore.body)
    formData.append('type', emailStore.type ?? '')
    if (emailStore.attachment) {
      formData.append('attachment', emailStore.attachment)
    }

    const response = await httpHelper.post('/email/send', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    return Promise.resolve(response)
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}
