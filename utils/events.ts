import {omit} from 'lodash'
import {DynamicPathPageEvent, DynamicPathPageEventWithUid, EventsList, EventsListItem, EventUid} from './types';

export const createNewEvent = (title: string, date: string, path: string): DynamicPathPageEvent => {
  return {
    title,
    date,
    path,
    public: false,
  };
};

export const isEventToday = (event: EventsListItem) => {
  // to do don't use global moment
  // @ts-ignore
  const moment = window.moment;
  return moment().isSame(event.date, 'day');
};

export const isEventUpcoming = (event: EventsListItem) => {
  // to do don't use global moment
  // @ts-ignore
  const moment = window.moment;
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
    eventsList[dynamicPathPage.path] = omit(dynamicPathPage, 'path');
  });
  return eventsList;
}
