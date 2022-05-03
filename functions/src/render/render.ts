import {Request, Response} from 'firebase-functions';
import {PreloadLinkAttrs} from '../../../utils/html';
import {createFull404PageTitle, createFullPageTitle, createFullEventTitle, createEventJsonLd} from '../../../utils/seo';
import {
  getEventPermalink,
  isValidStaticPath,
  isValidEventPath,
  StaticPath,
  staticPathToPageUid,
  SITEMAP_PATH,
} from '../../../utils/urlStructure';
import {createIndex} from '../createIndex';
import {getBanner} from './banners';
import {getClientConfig} from './config';
import {getEventDbData} from './eventsData';
import {getEventsList} from './eventsList';
import {getPageDbData} from './pagesData';
import {getPromotedEvent} from './promotedEvent';
import {getSitemap} from './sitemap/hotelGardenSitemap';

export const render = async (req: Request, res: Response) => {
  const path = req.path;
  const seoConfig = (await getClientConfig()).seo;
  const eventsList = await getEventsList();
  const promotedEventUid = (await getPromotedEvent()).uid;

  if (path === SITEMAP_PATH) {
    const sitemap = await getSitemap();
    res.status(200).send(sitemap);
  } else if (isValidStaticPath(path)) {
    const staticPath = path as StaticPath;
    const pageUid = staticPathToPageUid[staticPath];
    const title = createFullPageTitle(pageUid, seoConfig);
    const pageDbData = await getPageDbData(pageUid);
    const banner = await getBanner(pageUid);
    const metaDescription = pageDbData.seo?.description;
    const preloads: PreloadLinkAttrs[] = banner.image ? [{href: banner.image.url, as: 'image'}] : [];
    const index = createIndex(preloads, {title, metaDescription}, {eventsList, promotedEventUid, banner});
    res.status(200).send(index);
  } else if (isValidEventPath(path, eventsList)) {
    const eventUid = getEventPermalink(path);
    const event = eventsList[eventUid];
    const title = createFullEventTitle(eventUid, seoConfig, eventsList);
    const eventDbData = await getEventDbData(eventUid);
    const metaDescription = eventDbData.seo?.description;
    const jsonLd = createEventJsonLd(eventsList[eventUid]);
    const preloads: PreloadLinkAttrs[] = event.image ? [{href: event.image.url, as: 'image'}] : [];
    const index = createIndex(preloads, {title, metaDescription, jsonLd}, {eventsList, promotedEventUid});
    res.status(200).send(index);
  } else {
    const title = createFull404PageTitle(seoConfig);
    const index = createIndex([], {title}, {eventsList, promotedEventUid});
    res.status(404).send(index);
  }
};
