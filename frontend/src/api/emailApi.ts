import type { EmailInfo } from '@/interfaces/email.interface'
import httpHelper from '@/utils/httpHelper'

export const callTestApi = async () => {
  try {
    const response = await httpHelper.get('/email/type')
    console.log(response)
  } catch (error) {
    console.error(error)
  }
}

export const sendEmail = async (info: EmailInfo) => {
  try {
    const formData = new FormData()

    formData.append('to', info.to.join(','))
    formData.append('subject', info.subject ?? '')
    formData.append('body', info.body)
    if (info.attachment) {
      formData.append('attachment', info.attachment)
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
