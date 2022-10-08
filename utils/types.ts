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

export interface SitemapDbData {
  sitemap?: string,
}

export interface PageDbData {
  seo?: {
    description?: string,
  }
}

export type PagesDbData = Record<PageUid, PageDbData>;

// todo check where it's actually EventUid and not DynamicPathPageUid
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

export type DynamicPathPageUid = string;

export type DynamicPathPageType = 'event' | 'news';

export type DynamicPathPagePermalink = string;

export interface DynamicPathPageBase {
  type: DynamicPathPageType,
  permalink: DynamicPathPagePermalink,
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
  uid: DynamicPathPageUid,
}

export interface DynamicPathPageNewsWithUid extends DynamicPathPageNews {
  uid: DynamicPathPageUid,
}

export interface EventDbData {
  seo?: {
    description?: string,
  }
}

export type EventsDbData = Record<EventUid, EventDbData>;

export interface PromotedEventDbData {
  uid: DynamicPathPageUid | null,
}

export interface Banner {
  heading?: string,
  image?: Image,
  subheading?: string,
}

export type BannersDbData = Record<PageUid, Banner>;
