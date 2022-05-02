import {omit} from 'lodash';
import {EventGeneralData, EventsList} from '../../../utils/types';
import {listenToCollection} from '../database';

const [eventsGeneralDataReady, getEventsGeneralDataUnsafe] = listenToCollection<EventGeneralData>('eventsAndNews');

export const getEventsList = async () => {
  await eventsGeneralDataReady;
  const eventsGeneralData = getEventsGeneralDataUnsafe();
  const eventsList: EventsList = {}
  eventsGeneralData.forEach((eventGeneralData) => {
    eventsList[eventGeneralData.path] = omit(eventGeneralData, 'path');
  });
  return eventsList;
}
