import {Request} from 'firebase-functions';
import {Path} from '../../utils/urlStructure';

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
  urls: Record<Path, {title?: string}>,
}

export interface ClientConfig {
  seo: ClientConfigSeo,
}
