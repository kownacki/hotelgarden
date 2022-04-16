import {mapValues} from 'lodash';
import {PageDbData} from '../../../utils/types';
import {PageUid, pagesStaticData} from '../../../utils/urlStructure';
import {listenToDb} from '../database';

const pagesDbData = mapValues(pagesStaticData, (pageStaticData, pageUid) => {
  const [getDataUnsafe, ready] = listenToDb<PageDbData>(`pages/${pageUid}`);
  return {getDataUnsafe, ready};
})

export const getPageDbData = async (pageUid: PageUid) => {
  const pageDbData = pagesDbData[pageUid];
  await pageDbData.ready;
  return pageDbData.getDataUnsafe();
}
