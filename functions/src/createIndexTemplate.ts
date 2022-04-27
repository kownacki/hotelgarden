import {CreateIndexDataParam, CreateIndexSeoParam} from './types';
import {serializeData} from './utils';

export const createIndex = (
  {title, metaDescription, jsonLd}: CreateIndexSeoParam,
  {eventsList, promotedEventUid, banner}: CreateIndexDataParam,
) => {
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
  return ``;
};
