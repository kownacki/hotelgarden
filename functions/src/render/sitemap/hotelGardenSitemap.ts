import {PromiseTrigger} from '../../../../utils/general';
import {DynamicPathPageEvent} from '../../../../utils/types';
import {listenToCollection} from '../../listenToDb';
import {pingGoogleAboutSitemapChange} from '../../utils';
import {createHotelGardenSitemap} from './createHotelGardenSitemap';
import {convertDynamicPathPagesToEventsList} from '../../../../utils/events';

let sitemap: string | undefined;
const sitemapReady = new PromiseTrigger();

const updateSitemap = async (newSitemap: string) => {
  if (newSitemap !== sitemap) {
    sitemap = newSitemap;
    sitemapReady.resolve();
    await pingGoogleAboutSitemapChange();
  }
}

listenToCollection<DynamicPathPageEvent>('dynamicPathPages', (dynamicPathPages) => {
  const dynamicPathPagesWithUids = dynamicPathPages.map((documentSnapshot) => {
    return {
      ...documentSnapshot.data,
      uid: documentSnapshot.id,
    };
  })
  const eventsList = convertDynamicPathPagesToEventsList(dynamicPathPagesWithUids);
  updateSitemap(createHotelGardenSitemap(eventsList));
});

export const getSitemap = async () => {
  await sitemapReady.promise;
  return sitemap;
}
