import {mapValues} from 'lodash';
import {ArticleDbData} from '../../../utils/types';
import {PageUid, pagesStaticData} from '../../../utils/urlStructure';
import {listenToDoc} from '../database';

const articlesListeners = mapValues(pagesStaticData, (pageStaticData, pageUid) => {
  const [dataReady, getDataUnsafe] = listenToDoc<ArticleDbData | undefined>(`articles/${pageUid}`);
  return {dataReady, getDataUnsafe};
})

export const getArticle = async (pageUid: PageUid) => {
  const articleListener = articlesListeners[pageUid];
  await articleListener.dataReady;
  return articleListener.getDataUnsafe() || {};
}
