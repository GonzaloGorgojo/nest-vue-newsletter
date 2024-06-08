export interface EmailInfo {
  to: Array<string>
  subject: string
  body: string
  attachment: File | null

  setSubject(subject: string): void
  setBody(body: string): void
  setAttachment(attachment: File): void
  setTo(to: string): void
  removeTo(mail: string): void
}
