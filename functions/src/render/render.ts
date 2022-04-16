import {Request, Response} from 'firebase-functions';
import {createFull404PageTitle, createFullPageTitle, createFullEventTitle} from '../../../utils/seo';
import {getEventUid, isValidStaticPath, isValidEventPath, StaticPath, staticPathToPageUid} from '../../../utils/urlStructure';
import {createIndex} from '../createIndex';
import {getClientConfig} from './config';
import {getEvents} from './events';
import {getPageDbData} from './pages';

const seoConfigPromise = getClientConfig().then((config) => config.seo);
const eventsPromise = getEvents();

export const render = async (req: Request, res: Response) => {
  const path = req.path;
  const seoConfig = await seoConfigPromise;
  const events = await eventsPromise;

  if (isValidStaticPath(path)) {
    const staticPath = path as StaticPath;
    const pageUid = staticPathToPageUid[staticPath];
    const fullTitle = createFullPageTitle(pageUid, seoConfig);
    const pageDbData = await getPageDbData(pageUid);
    const description = pageDbData.seo.description;
    const index = createIndex(fullTitle, description);
    res.status(200).send(index);
  } else if (isValidEventPath(path, events)) {
    const eventUid = getEventUid(path);
    const fullTitle = createFullEventTitle(eventUid, seoConfig, events);
    //todo description
    const index = createIndex(fullTitle, '');
    res.status(200).send(index);
  } else {
    const fullTitle = createFull404PageTitle(seoConfig);
    //todo description
    const index = createIndex(fullTitle, '');
    res.status(404).send(index);
  }
};
