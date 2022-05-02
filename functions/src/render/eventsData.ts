import {EventUid, EventDbData, EventsList} from '../../../utils/types';
import {listenToDoc, DataReady, GetData, Unsubscribe} from '../database';

const eventsDbListeners: Record<EventUid, {dataReady: DataReady, getDataUnsafe: GetData<EventDbData | undefined>, unsubscribe: Unsubscribe}> = {};

const removeOldDbListeners = (newEvents: EventsList) => {
  Object.keys(eventsDbListeners).forEach((eventUid) => {
    if (!newEvents[eventUid]) {
      eventsDbListeners[eventUid].unsubscribe();
      delete eventsDbListeners[eventUid];
    }
  });
};

const addNewDbListeners = (newEvents: EventsList) => {
  Object.keys(newEvents).forEach((eventUid) => {
    if (!eventsDbListeners[eventUid]) {
      const [dataReady, getDataUnsafe, unsubscribe] = listenToDoc<EventDbData | undefined>(`eventsData/${eventUid}`);
      eventsDbListeners[eventUid] = {dataReady, getDataUnsafe, unsubscribe};
    }
  });
};

listenToDoc<EventsList | undefined>('events/events', (events = {}) => {
  removeOldDbListeners(events);
  addNewDbListeners(events);
});

export const getEventDbData = async (eventUid: EventUid) => {
  const eventDbListener = eventsDbListeners[eventUid];
  await eventDbListener.dataReady;
  return eventDbListener.getDataUnsafe() || {};
}
