export interface EmailInfo {
  to: Array<string>
  subject: string
  body: string
  attachment: File | null
  type: string | null
}

export interface EmailInfoStore extends EmailInfo {
  setSubject(subject: string): void
  setBody(body: string): void
  setAttachment(attachment: File): void
  setTo(to: string): void
  removeTo(mail: string): void
  setType(type: string): void
  clear(): void
}
