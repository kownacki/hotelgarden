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
  startDate: string,
  endDate: string,
  image?: Image,
  public: boolean,
  title: string,
  uid: string,
}

export type EventsList = Record<EventUid, EventsListItem>;

export type DynamicPathPageType = 'event' | 'news';

export interface DynamicPathPageBase {
  type: DynamicPathPageType,
  permalink: string,
  image?: Image,
  title: string,
}

export interface DynamicPathPageEvent extends DynamicPathPageBase {
  startDate: string,
  endDate: string,
  public: boolean,
}

export interface DynamicPathPageNews extends DynamicPathPageBase {
  publishDate: string,
  unpublishDate: string,
}

export interface DynamicPathPageEventWithUid extends DynamicPathPageEvent {
  uid: EventUid,
}

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

export interface PromotedEventDbData {
  uid: EventUid | null,
}

export interface Banner {
  heading?: string,
  image?: Image,
  subheading?: string,
}

export type BannersDbData = Record<PageUid, Banner>;
