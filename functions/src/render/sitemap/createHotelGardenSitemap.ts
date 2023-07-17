import {EventsList} from '../../../utils/types';
import {createSitemap} from './createSitemap';
import {getAllNonHiddenUrls} from './getAllNonHiddenUrls';

export const createHotelGardenSitemap = (eventsList: EventsList) => {
  const urls = getAllNonHiddenUrls(eventsList).sort();
  return createSitemap(urls);
};
