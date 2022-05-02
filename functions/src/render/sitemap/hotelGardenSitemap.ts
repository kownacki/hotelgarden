import {PromiseTrigger} from '../../../../utils/general';
import {EventsList} from '../../../../utils/types';
import {listenToDoc} from '../../listenToDb';
import {pingGoogleAboutSitemapChange} from '../../utils';
import {createHotelGardenSitemap} from './createHotelGardenSitemap';

let sitemap: string | undefined;
const sitemapReady = new PromiseTrigger();

const updateSitemap = async (newSitemap: string) => {
  if (newSitemap !== sitemap) {
    sitemap = newSitemap;
    sitemapReady.resolve();
    await pingGoogleAboutSitemapChange();
  }
}

listenToDoc<EventsList | undefined>('events/events', (events = {}) => {
  updateSitemap(createHotelGardenSitemap(events));
});

export const getSitemap = async () => {
  await sitemapReady.promise;
  return sitemap;
}
