import {EventsList} from '../../../utils/types';
import {listenToDb} from '../database';

const [eventsListReady, getEventsListUnsafe] = listenToDb<EventsList | undefined>('events/events');

export const getEventsList = async () => {
  await eventsListReady;
  return getEventsListUnsafe() || {};
}
