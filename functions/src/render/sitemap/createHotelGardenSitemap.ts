import {EventsList} from '../../../../utils/types';
import {createSitemap} from './createSitemap';
import {getAllPublicUrls} from './getAllPublicUrls';

export const createHotelGardenSitemap = (eventsList: EventsList) => {
  const urls = getAllPublicUrls(eventsList).sort();
  return createSitemap(urls);
}
