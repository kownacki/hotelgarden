import {EventUid, EventDbData, DynamicPathPageEvent} from '../../../utils/types';
import {listenToDoc, DataReady, GetData, Unsubscribe, listenToCollection} from '../database';

const eventsDbListeners: Record<EventUid, {dataReady: DataReady, getDataUnsafe: GetData<EventDbData | undefined>, unsubscribe: Unsubscribe}> = {};

const removeOldDbListeners = (newDynamicPathPagesUids: EventUid[]) => {
  Object.keys(eventsDbListeners).forEach((eventUid) => {
    if (!newDynamicPathPagesUids.includes(eventUid)) {
      eventsDbListeners[eventUid].unsubscribe();
      delete eventsDbListeners[eventUid];
    }
  });
};

const addNewDbListeners = (dynamicPathPagesUids: EventUid[]) => {
  dynamicPathPagesUids.forEach((eventUid) => {
    if (!eventsDbListeners[eventUid]) {
      const [dataReady, getDataUnsafe, unsubscribe] = listenToDoc<EventDbData | undefined>(`dynamicPathPages/${eventUid}/data/seo`);
      eventsDbListeners[eventUid] = {dataReady, getDataUnsafe, unsubscribe};
    }
  });
};

listenToCollection<DynamicPathPageEvent>('dynamicPathPages', (dynamicPathPages) => {
  const dynamicPathPagesUids = dynamicPathPages.map((dynamicPathPage) => dynamicPathPage.id)
  removeOldDbListeners(dynamicPathPagesUids);
  addNewDbListeners(dynamicPathPagesUids);
});

export const getEventSeoData = async (eventUid: EventUid) => {
  const eventDbListener = eventsDbListeners[eventUid];
  await eventDbListener.dataReady;
  return eventDbListener.getDataUnsafe() || {};
}
