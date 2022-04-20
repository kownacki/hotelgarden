export type SendMessageRequestBodySubject = 'hotel' | 'gastro'

export interface SendMessageRequestBody {
  subject: SendMessageRequestBodySubject,
  name: string,
  company: string,
  phone: string,
  email: string,
  text: string,
}
