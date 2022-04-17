import {Request, Response} from 'firebase-functions';
import {createFull404PageTitle, createFullPageTitle, createFullEventTitle} from '../../../utils/seo';
import {EventsListItem} from '../../../utils/types';
import {getEventUid, isValidStaticPath, isValidEventPath, StaticPath, staticPathToPageUid} from '../../../utils/urlStructure';
import {createIndex} from '../createIndex';
import {getClientConfig} from './config';
import {getEventDbData} from './eventsData';
import {getEventsList} from './eventsList';
import {getPageDbData} from './pagesData';

const getEventJsonLd = (eventListItem: EventsListItem) => {
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
    name: eventListItem.title,
    startDate: eventListItem.date,
  });
}

export const render = async (req: Request, res: Response) => {
  const path = req.path;
  const seoConfig = await getClientConfig().then((config) => config.seo);
  const eventsList = await getEventsList();

  if (isValidStaticPath(path)) {
    const staticPath = path as StaticPath;
    const pageUid = staticPathToPageUid[staticPath];
    const fullTitle = createFullPageTitle(pageUid, seoConfig);
    const pageDbData = await getPageDbData(pageUid);
    const description = pageDbData.seo?.description;
    const index = createIndex(fullTitle, description);
    res.status(200).send(index);
  } else if (isValidEventPath(path, eventsList)) {
    const eventUid = getEventUid(path);
    const fullTitle = createFullEventTitle(eventUid, seoConfig, eventsList);
    const eventDbData = await getEventDbData(eventUid);
    const description = eventDbData.seo?.description;
    const jsonLd = getEventJsonLd(eventsList[eventUid]);
    const index = createIndex(fullTitle, description, jsonLd);
    res.status(200).send(index);
  } else {
    const fullTitle = createFull404PageTitle(seoConfig);
    const index = createIndex(fullTitle);
    res.status(404).send(index);
  }
};
