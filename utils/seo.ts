import {ClientConfigSeo, EventsList, EventsListItem, EventUid} from './types';
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

export const getEventTitle = (eventUid: EventUid, eventsList: EventsList) => {
  //todo block events without title
  return eventsList[eventUid].title || 'Wydarzenie bez tytułu';
}

// path to page or event must be valid
const getPageOrEventTitle = (path: string, seoConfig: ClientConfigSeo, eventsList: EventsList) => {
  let title: string;
  //todo co z 'Nie znaleziono wydarzenia'?
  if (isEventPath(path)) {
    const eventUid = getEventUid(path);
    title = getEventTitle(eventUid, eventsList);
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

export const createFullEventTitle = (eventUid: EventUid, seoConfig: ClientConfigSeo, eventsList: EventsList) => {
  const eventTitle = getEventTitle(eventUid, eventsList);
  return appendSuffixToTitle(eventTitle, seoConfig);
}

export const createFullValidPageOrEventTitle = (path: StaticPath, seoConfig: ClientConfigSeo, eventsList: EventsList) => {
  const pageTitle = getPageOrEventTitle(path, seoConfig, eventsList);
  return appendSuffixToTitle(pageTitle, seoConfig);
}

export const createFull404PageTitle = (seoConfig: ClientConfigSeo) => {
  return appendSuffixToTitle(getDefaultTitle('404'), seoConfig);
}

export const createEventJsonLd = (event: EventsListItem) => {
  return JSON.stringify({
    '@context': 'http://schema.org/',
    '@type': 'Event',
    location: {
      '@type': 'Place',
      name: 'Hotel Garden',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'ul. Podchorążych 2A',
        addressLocality: 'Oleśnica',
        postalCode: '56-400',
        addressRegion: 'Dolnośląskie',
        addressCountry: 'PL',
      },
    },
    name: event.title,
    startDate: event.date,
  });
}
