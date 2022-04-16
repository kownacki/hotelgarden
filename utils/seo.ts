import {ClientConfigSeo, Events, EventUid} from './types';
import {isEventPath, getEventUid, PageUid, pagesStaticData, StaticPath, staticPathToPageUid} from './urlStructure';

export const getDefaultTitle = (uid: PageUid) => {
  return pagesStaticData[uid].name;
}

export const appendSuffixToTitle = (title: string, seoConfig: ClientConfigSeo) => {
  return `${title} ${seoConfig.titleSeparator} ${seoConfig.titleSuffix}`;
}

export const getPageTitle = (pageUid: PageUid, seoConfig: ClientConfigSeo) => {
  const defaultTitle = getDefaultTitle(pageUid);
  const seoTitle = pageUid === '404' ? null : seoConfig.urls?.[pagesStaticData[pageUid].path as StaticPath]?.title;
  return seoTitle || defaultTitle;
}

export const getEventTitle = (eventUid: EventUid, events: Events) => {
  //todo block events without title
  return events[eventUid].title || 'Wydarzenie bez tytułu';
}

// path to page or event must be valid
const getPageOrEventTitle = (path: string, seoConfig: ClientConfigSeo, events: Events) => {
  let title: string;
  //todo co z 'Nie znaleziono wydarzenia'?
  if (isEventPath(path)) {
    const eventUid = getEventUid(path);
    title = getEventTitle(eventUid, events);
  } else {
    const pageUid = staticPathToPageUid[path as StaticPath];
    title = getPageTitle(pageUid, seoConfig);
  }
  return title;
}

export const createFullPageTitle = (pageUid: PageUid, seoConfig: ClientConfigSeo) => {
  const pageTitle = getPageTitle(pageUid, seoConfig);
  return appendSuffixToTitle(pageTitle, seoConfig);
}

export const createFullEventTitle = (eventUid: EventUid, seoConfig: ClientConfigSeo, events: Events) => {
  const eventTitle = getEventTitle(eventUid, events);
  return appendSuffixToTitle(eventTitle, seoConfig);
}

export const createFullValidPageOrEventTitle = (path: StaticPath, seoConfig: ClientConfigSeo, events: Events) => {
  const pageTitle = getPageOrEventTitle(path, seoConfig, events);
  return appendSuffixToTitle(pageTitle, seoConfig);
}

export const createFull404PageTitle = (seoConfig: ClientConfigSeo) => {
  return appendSuffixToTitle(getDefaultTitle('404'), seoConfig);
}
