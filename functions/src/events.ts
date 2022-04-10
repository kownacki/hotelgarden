import {Events} from '../../utils/types';
import {listenToDb} from './database';

const [getEventsUnsafe, eventsReady] = listenToDb<Events>('events/events');

export const getEvents = async () => {
  await eventsReady;
  return getEventsUnsafe();
}
