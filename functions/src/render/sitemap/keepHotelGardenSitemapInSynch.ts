import {DynamicPathPageEvent} from '../../../utils/types';
import {listenToCollection} from '../../listenToDb';
import {pingGoogleAboutSitemapChange} from '../../utils/utils';
import {createHotelGardenSitemap} from './createHotelGardenSitemap';
import {convertDynamicPathPagesToEventsList} from '../../../utils/events';
import {createDbPath, updateInDb} from '../../database';
import {getSitemap} from './getSitemap';

const updateSitemap = async (newSitemap: string) => {
  const currentSitemap = await getSitemap();
  if (newSitemap !== currentSitemap) {
    await updateInDb(createDbPath('sitemap/sitemap', 'sitemap'), newSitemap);
    await pingGoogleAboutSitemapChange();
  }
};

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
