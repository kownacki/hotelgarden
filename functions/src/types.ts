import {Request} from 'firebase-functions';
import {EventsList, EventUid, Banner} from '../../utils/types';

export interface CreateIndexSeoParam {
  title: string,
  metaDescription?: string,
  jsonLd?: string,
}

export interface CreateIndexDataParam {
  eventsList: EventsList,
  promotedEventUid: EventUid | null,
  banner?: Banner,
}

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
