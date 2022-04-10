import {Request, Response} from 'firebase-functions';
import {createFullPageTitle, createFull404PageTitle} from '../../utils/seo';
import {isValidPath, Path} from '../../utils/urlStructure';
import {getClientConfig} from './config';
import {createIndex} from './createIndex';
import {getEvents} from './events';

const seoConfigPromise = getClientConfig().then((config) => config.seo);
const eventsPromise = getEvents();

export const render = async (req: Request, res: Response) => {
  const path = req.path as Path;
  const seoConfig = await seoConfigPromise;
  const events = await eventsPromise;

  if (isValidPath(path, events)) {
    const fullTitle = createFullPageTitle(path, seoConfig, events);
    const index = createIndex(fullTitle);
    res.status(200).send(index);
  } else {
    const fullTitle = createFull404PageTitle(seoConfig);
    const index = createIndex(fullTitle);
    res.status(404).send(index);
  }
};
