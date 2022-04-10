import {ClientConfigSeo, Events} from './types';
import {isEventPath, getEventUid, PageUid, pages, Path, pathToUid} from './urlStructure';

export const getDefaultTitle = (uid: PageUid) => {
  return pages[uid].name;
}

export const appendSuffixToTitle = (title: string, seoConfig: ClientConfigSeo) => {
  return `${title} ${seoConfig.titleSeparator} ${seoConfig.titleSuffix}`;
}

// path must be valid
const getPageTitle = (path: Path, seoConfig: ClientConfigSeo, events: Events) => {
  let title: string;
  if (isEventPath(path)) {
    const eventUid = getEventUid(path);
    title = events[eventUid].title;
  } else {
    const pageUid = pathToUid[path];
    const defaultTitle = getDefaultTitle(pageUid);
    const seoTitle = seoConfig.urls?.[path]?.title;
    title = seoTitle || defaultTitle;
  }
  return title;
}

export const createFullPageTitle = (path: Path, seoConfig: ClientConfigSeo, events: Events) => {
  const pageTitle = getPageTitle(path, seoConfig, events);
  return appendSuffixToTitle(pageTitle, seoConfig);
}

export const createFull404PageTitle = (seoConfig: ClientConfigSeo) => {
  return appendSuffixToTitle(getDefaultTitle('404'), seoConfig);
}
