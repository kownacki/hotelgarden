import {Request} from 'firebase-functions';
import {PreloadLinkAttrs} from '../utils/html';
import {EventsList, EventUid, Banner, ArticleDbData} from '../utils/types';

export type CreateIndexPreloadsParam = PreloadLinkAttrs[];

export interface CreateIndexSeoParam {
  title: string,
  metaDescription?: string,
  jsonLd?: string,
}

export interface CreateIndexDataParam {
  eventsList: EventsList,
  promotedEventUid: EventUid | null,
  banner?: Banner,
  introArticle?: ArticleDbData,
}

export interface RequestWithBody<ReqBody> extends Request {
  body: ReqBody,
}

export interface AdminConfigSendMessage {
  mailOptions: {
    from: string,
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
