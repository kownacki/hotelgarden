import {EventsList} from '../../../utils/types';
import {listenToDoc} from '../database';

const [eventsListReady, getEventsListUnsafe] = listenToDoc<EventsList | undefined>('events/events');

export const getEventsList = async () => {
  await eventsListReady;
  return getEventsListUnsafe() || {};
}
