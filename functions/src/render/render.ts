import {Request, Response} from 'firebase-functions';
import {createFull404PageTitle, createFullPageTitle, createFullEventTitle, createEventJsonLd} from '../../../utils/seo';
import {getEventUid, isValidStaticPath, isValidEventPath, StaticPath, staticPathToPageUid} from '../../../utils/urlStructure';
import {createIndex} from '../createIndex';
import {getClientConfig} from './config';
import {getEventDbData} from './eventsData';
import {getEventsList} from './eventsList';
import {getPageDbData} from './pagesData';

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
    const jsonLd = createEventJsonLd(eventsList[eventUid]);
    const index = createIndex(fullTitle, description, jsonLd);
    res.status(200).send(index);
  } else {
    const fullTitle = createFull404PageTitle(seoConfig);
    const index = createIndex(fullTitle);
    res.status(404).send(index);
  }
};
