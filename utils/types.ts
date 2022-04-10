import {Path} from './urlStructure';

export interface ClientConfigSeo {
  titleSeparator: string,
  titleSuffix: string,
  urls: Record<Path, {title?: string}>,
}

export interface ClientConfig {
  seo: ClientConfigSeo,
}
