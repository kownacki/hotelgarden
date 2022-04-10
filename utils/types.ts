// @ts-ignore see https://github.com/microsoft/TypeScript/issues/33079
import {Image} from 'mk-firebase-utils/web';
import {Path} from './urlStructure';

export interface ClientConfigSeo {
  titleSeparator: string,
  titleSuffix: string,
  urls: Record<Path, {title?: string}>,
}

export interface ClientConfig {
  seo: ClientConfigSeo,
}

export interface Event {
  date: string,
  image?: Image,
  public: boolean,
  title: string,
}

export type EventUid = string;

export type Events = Record<EventUid, Event>;
