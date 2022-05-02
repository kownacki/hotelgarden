import {mapValues} from 'lodash';
import {Banner} from '../../../utils/types';
import {PageUid, pagesStaticData} from '../../../utils/urlStructure';
import {listenToDoc} from '../database';

const bannersListeners = mapValues(pagesStaticData, (pageStaticData, pageUid) => {
  const [dataReady, getDataUnsafe] = listenToDoc<Banner | undefined>(`banners/${pageUid}`);
  return {dataReady, getDataUnsafe};
})

export const getBanner = async (pageUid: PageUid) => {
  const bannerListener = bannersListeners[pageUid];
  await bannerListener.dataReady;
  return bannerListener.getDataUnsafe() || {};
}
