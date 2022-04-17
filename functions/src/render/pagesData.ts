import {mapValues} from 'lodash';
import {PageDbData} from '../../../utils/types';
import {PageUid, pagesStaticData} from '../../../utils/urlStructure';
import {listenToDb} from '../database';

const pagesDbListeners = mapValues(pagesStaticData, (pageStaticData, pageUid) => {
  const [dataReady, getDataUnsafe] = listenToDb<PageDbData | undefined>(`pages/${pageUid}`);
  return {dataReady, getDataUnsafe};
})

export const getPageDbData = async (pageUid: PageUid) => {
  const pageDbListener = pagesDbListeners[pageUid];
  await pageDbListener.dataReady;
  return pageDbListener.getDataUnsafe() || {};
}
