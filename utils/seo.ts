import {DynamicPathPageType} from './events';
import {ClientConfigSeo, DynamicPathPageEvent, DynamicPathPageNews, EventsList, EventsListItem, EventUid} from './types';
import {isDynamicPath, getDynamicPathPagePermalink, PageUid, pagesStaticData, StaticPath, staticPathToPageUid} from './urlStructure';

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

export const getEventTitle = (event: EventsListItem) => {
  //todo block events without title
  return event.title || 'Wydarzenie bez tytułu';
}

// path to page or event must be valid
const getPageOrEventTitle = (path: string, seoConfig: ClientConfigSeo, eventsList: EventsList) => {
  let title: string;
  if (isDynamicPath(path)) {
    const eventUid = getDynamicPathPagePermalink(path);
    const event = eventsList[eventUid];
    title = getEventTitle(event);
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
  const event = eventsList[eventUid];
  const eventTitle = getEventTitle(event);
  return appendSuffixToTitle(eventTitle, seoConfig);
}

export const createFullValidPageOrEventTitle = (path: StaticPath, seoConfig: ClientConfigSeo, eventsList: EventsList) => {
  const pageTitle = getPageOrEventTitle(path, seoConfig, eventsList);
  return appendSuffixToTitle(pageTitle, seoConfig);
}

export const createFull404PageTitle = (seoConfig: ClientConfigSeo) => {
  return appendSuffixToTitle(getDefaultTitle('404'), seoConfig);
}

export const createEventJsonLd = (event: DynamicPathPageEvent) => {
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
    startDate: event.startDate,
    endDate: event.endDate,
  });
}

export const createNewsJsonLd = (news: DynamicPathPageNews) => {
  return JSON.stringify({
    '@context': 'http://schema.org',
    '@type': 'Article',
    headline: news.title,
    image: news.image?.url,
    datePublished: news.publishDate,
    author: {
      '@type': 'Organization',
      name: 'Hotel Garden',
      logo: '/resources/images/original/logo.png',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Hotel Garden',
      logo: '/resources/images/original/logo.png',
    }
  });
}

export const createDynamicPathPageJsonLd = (dynamicPathPage: DynamicPathPageEvent | DynamicPathPageNews) => {
  return dynamicPathPage.type === DynamicPathPageType.EVENT
    ? createEventJsonLd(dynamicPathPage as DynamicPathPageEvent)
    : createNewsJsonLd(dynamicPathPage as DynamicPathPageNews);
}
