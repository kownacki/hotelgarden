import {createPreloadLink} from '../../utils/html';
import {CreateIndexDataParam, CreateIndexSeoParam, CreateIndexPreloadsParam} from './types';
import {serializeData} from './utils';

export const createIndex = (
  preloads: CreateIndexPreloadsParam,
  {title, metaDescription, jsonLd}: CreateIndexSeoParam,
  {eventsList, promotedEventUid, banner, introArticle}: CreateIndexDataParam,
) => {
  // @ts-ignore
  preloads = preloads.map((preloadLinkAttrs) => {
    return createPreloadLink(preloadLinkAttrs);
  }).join('');
  // @ts-ignore
  title = title || '';
  // @ts-ignore
  metaDescription = metaDescription || '';
  // @ts-ignore
  jsonLd = jsonLd || '';
  // @ts-ignore
  const eventsListSerialized = serializeData(eventsList);
  // @ts-ignore
  const promotedEventUidSerialized = serializeData(promotedEventUid);
  // @ts-ignore
  const bannerSerialized = serializeData(banner);
  // @ts-ignore
  const introArticleSerialized = serializeData(introArticle);
  return ``;
};
