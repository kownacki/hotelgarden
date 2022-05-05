import {omit} from 'lodash'
import {DynamicPathPageEvent, DynamicPathPageEventWithUid, EventsList, EventsListItem, EventUid} from './types';
import {isDatePast, isDateToday, isDateTodayOrUpcoming, isDateUpcoming} from './general';

export const createNewEvent = (title: string, date: string, permalink: string): DynamicPathPageEvent => {
  return {
    title,
    date,
    permalink,
    public: false,
  };
};

export const isEventToday = (event: EventsListItem) => {
  return isDateToday(event.date);
};

export const isEventUpcoming = (event: EventsListItem) => {
  return isDateUpcoming(event.date);
};

export const isEventTodayOrUpcoming = (event: EventsListItem) => {
  return isDateTodayOrUpcoming(event.date);
};

export const isEventPast = (event: EventsListItem) => {
 return isDatePast(event.date);
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
  const promotedEvent = promotedEventUid && Object.values(eventsList).find((eventListItem) => {
    return eventListItem.uid === promotedEventUid;
  });
  return promotedEvent && isEventTodayOrUpcoming(promotedEvent)
    ? {
      uid: promotedEventUid as EventUid,
      event: promotedEvent,
    }
    : undefined;
};

export const convertDynamicPathPagesToEventsList = (dynamicPathPagesWithUids: DynamicPathPageEventWithUid[]) => {
  const eventsList: EventsList = {};
  dynamicPathPagesWithUids.forEach((dynamicPathPage) => {
    eventsList[dynamicPathPage.permalink] = omit(dynamicPathPage, 'permalink');
  });
  return eventsList;
}
