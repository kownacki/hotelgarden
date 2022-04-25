// @ts-ignore see https://github.com/microsoft/TypeScript/issues/33079
import {Image} from 'mk-firebase-utils/web';
import {StaticPath, PageUid} from './urlStructure';

export interface ClientConfigSeo {
  titleSeparator: string,
  titleSuffix: string,
  urls: Record<StaticPath, {title?: string}>,
}

export interface ClientConfig {
  seo: ClientConfigSeo,
}

export interface PageDbData {
  seo?: {
    description?: string,
  }
}

export type PagesDbData = Record<PageUid, PageDbData>;

export type EventUid = string;

export interface EventsListItem {
  date: string,
  image?: Image,
  public: boolean,
  title: string,
}

export type EventsList = Record<EventUid, EventsListItem>;

export interface EventData {
  uid: EventUid,
  event?: EventsListItem,
}

export interface EventDbData {
  seo?: {
    description?: string,
  }
}

export type EventsDbData = Record<EventUid, EventDbData>;
