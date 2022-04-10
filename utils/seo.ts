import {ClientConfigSeo} from './types';
import {PageUid, pages} from './urlStructure';

export const getDefaultTitle = (uid: PageUid) => {
  return pages[uid].name;
}

export const createDocumentTitle = (title: string, seoConfig: ClientConfigSeo) => {
  return `${title} ${seoConfig.titleSeparator} ${seoConfig.titleSuffix}`;
}
