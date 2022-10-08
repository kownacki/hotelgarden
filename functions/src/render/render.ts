import {Request, Response} from 'firebase-functions';
import {PreloadLinkAttrs} from '../../../utils/html';
import {createFull404PageTitle, createFullPageTitle, createFullEventTitle, createDynamicPathPageJsonLd} from '../../../utils/seo';
import {
  getDynamicPathPagePermalink,
  isValidStaticPath,
  isValidDynamicPath,
  StaticPath,
  staticPathToPageUid,
  SITEMAP_PATH,
} from '../../../utils/urlStructure';
import {createIndex} from '../createIndex';
import {getBanner} from './banners';
import {getClientConfig} from './config';
import {getEventSeoData} from './eventsDataSeo';
import {getEventsList} from './eventsList';
import {getPageDbData} from './pagesData';
import {getPromotedEvent} from './promotedEvent';
import {getSitemap} from './sitemap/getSitemap';

import './sitemap/keepHotelGardenSitemapInSynch';

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
  } else if (isValidDynamicPath(path, eventsList)) {
    const permalink = getDynamicPathPagePermalink(path);
    const dynamicPathPage = eventsList[permalink];
    const dynamicPathPageUid = dynamicPathPage.uid;
    const title = createFullEventTitle(permalink, seoConfig, eventsList);
    const dynamicPathPageSeoData = (await getEventSeoData(dynamicPathPageUid)).seo;
    const metaDescription = dynamicPathPageSeoData?.description;
    // @ts-ignore
    const jsonLd = createDynamicPathPageJsonLd(dynamicPathPage);
    const preloads: PreloadLinkAttrs[] = dynamicPathPage.image ? [{href: dynamicPathPage.image.url, as: 'image'}] : [];
    const index = createIndex(preloads, {title, metaDescription, jsonLd}, {eventsList, promotedEventUid});
    res.status(200).send(index);
  } else {
    const title = createFull404PageTitle(seoConfig);
    const index = createIndex([], {title}, {eventsList, promotedEventUid});
    res.status(404).send(index);
  }
};
