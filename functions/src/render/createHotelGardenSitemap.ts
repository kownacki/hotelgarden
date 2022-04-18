import {createSitemap} from './createSitemap';
import {getAllPublicUrls} from './getAllPublicUrls';
import {EventsList} from '../../../utils/types';

export const createHotelGardenSitemap = async (eventsList: EventsList) => {
  const urls = getAllPublicUrls(eventsList).sort();
  return createSitemap(urls);
}
