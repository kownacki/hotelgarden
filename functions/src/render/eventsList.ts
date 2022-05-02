import {omit} from 'lodash';
import {DynamicPathPage, EventsList} from '../../../utils/types';
import {listenToCollection} from '../database';

const [dynamicPathPagesReady, getDynamicPathPagesUnsafe] = listenToCollection<DynamicPathPage>('dynamicPathPages');

export const getEventsList = async () => {
  await dynamicPathPagesReady;
  const dynamicPathPage = getDynamicPathPagesUnsafe();
  const eventsList: EventsList = {};
  dynamicPathPage.forEach((dynamicPathPage) => {
    eventsList[dynamicPathPage.path] = omit(dynamicPathPage, 'path');
  });
  return eventsList;
}
