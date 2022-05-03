import {DynamicPathPageEvent} from '../../../utils/types';
import {listenToCollection} from '../database';
import {convertDynamicPathPagesToEventsList} from '../../../utils/events';

const [dynamicPathPagesReady, getDynamicPathPagesUnsafe] = listenToCollection<DynamicPathPageEvent>('dynamicPathPages');

export const getEventsList = async () => {
  await dynamicPathPagesReady;
  const dynamicPathPages = getDynamicPathPagesUnsafe();
  return convertDynamicPathPagesToEventsList(dynamicPathPages);
}
