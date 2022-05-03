import {omit} from 'lodash'
import {DynamicPathPageEvent, EventsList, EventsListItem, EventUid} from './types';

// to do don't use global moment
// @ts-ignore
const moment = window.moment;

export const createNewEvent = (title: string, date: string, path: string): DynamicPathPageEvent => {
  return {
    title,
    date,
    path,
    public: false,
  };
};

export const isEventToday = (event: EventsListItem) => {
  return moment().isSame(event.date, 'day');
};

export const isEventUpcoming = (event: EventsListItem) => {
  return moment().isBefore(event.date, 'day');
};

export const isEventTodayOrUpcoming = (event: EventsListItem) => {
  return isEventToday(event) || isEventUpcoming(event);
};

export const isEventPast = (event: EventsListItem) => {
 return !isEventTodayOrUpcoming(event);
};

export const getWhenEventHappens = (event: EventsListItem) => {
  return isEventUpcoming(event)
    ? 'Odbędzie się'
    : isEventToday(event)
      ? 'Dzisiaj'
      : 'Odbyło się';
}

export const getEventFormattedDate = (event: EventsListItem) => {
  return event.date.split('-').reverse().join(' / ');
}

export const getPromotedEventData = (promotedEventUid: EventUid | null, eventsList: EventsList) => {
  const promotedEvent = promotedEventUid && eventsList[promotedEventUid];
  return promotedEvent && isEventTodayOrUpcoming(promotedEvent)
    ? {
      uid: promotedEventUid as EventUid,
      event: promotedEvent,
    }
    : undefined;
};

export const convertDynamicPathPagesToEventsList = (dynamicPathPages: DynamicPathPageEvent[]) => {
  const eventsList: EventsList = {};
  dynamicPathPages.forEach((dynamicPathPage) => {
    eventsList[dynamicPathPage.path] = omit(dynamicPathPage, 'path');
  });
  return eventsList;
}
