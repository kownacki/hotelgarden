import {Request} from 'firebase-functions';

export interface RequestWithBody<ReqBody> extends Request {
  body: ReqBody,
}

export interface AdminConfigSendMessage {
  mailOptions: {
    subject: string,
    to: {
      gastro: string | string[],
      hotel: string | string[],
    },
  },
  mailTransport: {
    auth: {
      pass: string,
      user: string,
    },
    service: string,
  },
}

export interface AdminConfig {
  sendMessage: AdminConfigSendMessage,
}

export interface ClientConfigSeo {
  titleSeparator: string,
  titleSuffix: string,
  // paths!
  urls: Record<string, {title?: string}>,
}

export interface ClientConfig {
  seo: ClientConfigSeo,
}
